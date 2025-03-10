import { DataBlock } from "./datablock";
import { getRSBlocks, QRRSBlock } from "./rsblock";
import { QRBitBuffer as BitBuffer } from "./bitbuffer";
import { Polynomial as Polynomial } from "./polynomial";
import {
  getBCHTypeInfo,
  getBCHVersion,
  getErrorCorrectPolynomial,
  getLengthInBits,
  getLostPoint,
  getMask,
  getPatternPosition,
} from "./util";
import { ErrorCorrectLevel } from "./definitions";

export class QRCodeBuilder {
  private version: number;
  private readonly errorCorrectLevel: ErrorCorrectLevel;
  private readonly modules = new Map<number, boolean>();
  private dataCache: number[] | null = null;
  private dataList: DataBlock[] = [];

  constructor(version: number, errorCorrectLevel: ErrorCorrectLevel) {
    this.version = version;
    this.errorCorrectLevel = errorCorrectLevel;
  }

  get moduleCount() {
    return 4 * this.version + 17;
  }

  addData(data: string) {
    const newData = new DataBlock(data);
    this.dataList.push(newData);
    this.dataCache = null;
  }

  isDark(row: number, col: number): boolean {
    if (
      row < 0 ||
      this.moduleCount <= row ||
      col < 0 ||
      this.moduleCount <= col
    ) {
      throw new Error(`${row},${col}`);
    }
    const key = (row << 16) | col;
    return this.modules.get(key) === true;
  }

  isDarkSafe(row: number, col: number): boolean {
    if (
      row < 0 ||
      this.moduleCount <= row ||
      col < 0 ||
      this.moduleCount <= col
    ) {
      return false;
    }
    const key = (row << 16) | col;
    return this.modules.get(key) === true;
  }

  private isPositionProbeModule(row: number, col: number) {
    if (row < 7) {
      if (col < 7 || col >= this.moduleCount - 7) {
        return true;
      }
    } else if (row >= this.moduleCount - 7 && col < 7) {
      return true;
    }
    return false;
  }

  isPatternModule(row: number, col: number) {
    if (this.isPositionProbeModule(row, col)) {
      return true;
    }

    const patternPositions = getPatternPosition(this.version);
    for (const pattern_row of patternPositions) {
      if (Math.abs(row - pattern_row) <= 2) {
        for (const pattern_col of patternPositions) {
          if (
            !this.isPositionProbeModule(pattern_row, pattern_col) &&
            Math.abs(col - pattern_col) <= 2
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  make() {
    // Calculate automatically version if provided is < 1
    if (this.version < 1) {
      let candidateVersion = 1;
      for (candidateVersion = 1; candidateVersion < 40; candidateVersion++) {
        const rsBlocks = getRSBlocks(candidateVersion, this.errorCorrectLevel);

        const buffer = new BitBuffer();
        const totalDataCount = rsBlocks.reduce(
          (accum, rsBlock) => accum + rsBlock.dataCount,
          0
        );

        for (const data of this.dataList) {
          buffer.put(data.mode, 4);
          buffer.put(
            data.getLength(),
            getLengthInBits(data.mode, candidateVersion)
          );
          data.write(buffer);
        }
        if (buffer.lengthInBits <= totalDataCount * 8) {
          break;
        }
      }
      this.version = candidateVersion;
    }

    return this.makeImpl(false, this.getBestMaskPattern());
  }

  private clearModules() {
    this.modules.clear();
  }

  private makeImpl(test: boolean, maskPattern: number) {
    if (this.version <= 0) {
      throw new Error(`Invalid version:${this.version}`);
    }
    this.clearModules();
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(test, maskPattern);

    if (this.version >= 7) {
      this.setupVersion(test);
    }

    if (this.dataCache === null) {
      this.dataCache = createData(
        this.version,
        this.errorCorrectLevel,
        this.dataList
      );
    }

    this.mapData(this.dataCache, maskPattern);

    return {
      size: this.moduleCount,
      isDark: (row: number, col: number) => this.isDark(row, col),
      isDarkSafe: (row: number, col: number) => this.isDarkSafe(row, col),
      isPatternModule: (row: number, col: number) =>
        this.isPatternModule(row, col),
    };
  }

  private setupPositionProbePattern(row: number, col: number) {
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;

      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;

        this.setModule(
          row + r,
          col + c,
          (0 <= r && r <= 6 && (c == 0 || c == 6)) ||
            (0 <= c && c <= 6 && (r == 0 || r == 6)) ||
            (2 <= r && r <= 4 && 2 <= c && c <= 4)
        );
      }
    }
  }

  private getBestMaskPattern() {
    let minLostPoint = Infinity;
    let pattern = 0;

    for (let i = 0; i < 8; i++) {
      this.makeImpl(true, i);

      const lostPoint = getLostPoint(this);

      if (minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }

    return pattern;
  }

  private setupTimingPattern() {
    for (let r = 8; r < this.moduleCount - 8; r++) {
      if (this.moduleIsUnset(r, 6)) {
        this.setModule(r, 6, r % 2 === 0);
      }
    }

    for (let c = 8; c < this.moduleCount - 8; c++) {
      if (this.moduleIsUnset(6, c)) {
        this.setModule(6, c, c % 2 === 0);
      }
    }
  }

  private setModule(row: number, col: number, value: boolean) {
    const key = (row << 16) | col;
    this.modules.set(key, value);
  }

  private moduleIsUnset(row: number, col: number): boolean {
    if (
      row < 0 ||
      col < 0 ||
      row >= this.moduleCount ||
      col >= this.moduleCount
    ) {
      throw new Error(`${row},${col}`);
    }
    const key = (row << 16) | col;
    return !this.modules.has(key);
  }

  private setupPositionAdjustPattern() {
    const pos = getPatternPosition(this.version);

    for (const row of pos) {
      if (row < 0 || row >= this.moduleCount) {
        continue;
      }
      for (const col of pos) {
        if (col < 0 || col >= this.moduleCount) {
          continue;
        }
        if (!this.moduleIsUnset(row, col)) {
          continue;
        }

        for (let r = -2; r <= 2; r++) {
          const r2 = r * r;
          for (let c = -2; c <= 2; c++) {
            const c2 = c * c;
            this.setModule(row + r, col + c, (r2 + c2 + 1) >> 1 != 1);
          }
        }
      }
    }
  }

  private setupVersion(test: boolean) {
    const bits = getBCHVersion(this.version);

    for (let i = 0; i < 18; i++) {
      const mod = !test && ((bits >> i) & 1) == 1;
      this.setModule(
        Math.trunc(i / 3),
        (i % 3) + this.moduleCount - 8 - 3,
        mod
      );
    }

    for (let i = 0; i < 18; i++) {
      const mod = !test && ((bits >> i) & 1) == 1;
      this.setModule(
        (i % 3) + this.moduleCount - 8 - 3,
        Math.trunc(i / 3),
        mod
      );
    }
  }

  private setupTypeInfo(test: boolean, maskPattern: number) {
    const data = (this.errorCorrectLevel << 3) | maskPattern;
    const bits = getBCHTypeInfo(data);

    // vertical
    for (let i = 0; i < 15; i++) {
      const mod = !test && ((bits >> i) & 1) == 1;

      if (i < 6) {
        this.setModule(i, 8, mod);
      } else if (i < 8) {
        this.setModule(i + 1, 8, mod);
      } else {
        this.setModule(this.moduleCount - 15 + i, 8, mod);
      }
    }

    // horizontal
    for (let i = 0; i < 15; i++) {
      const mod = !test && ((bits >> i) & 1) == 1;

      if (i < 8) {
        this.setModule(8, this.moduleCount - i - 1, mod);
      } else if (i < 9) {
        this.setModule(8, 15 - i - 1 + 1, mod);
      } else {
        this.setModule(8, 15 - i - 1, mod);
      }
    }

    // fixed module
    this.setModule(this.moduleCount - 8, 8, !test);
  }

  private mapData(data: number[], maskPattern: number) {
    let inc = -1;
    let row = this.moduleCount - 1;
    let bitIndex = 7;
    let byteIndex = 0;

    for (let col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;

      while (true) {
        for (let c = 0; c < 2; c++) {
          if (this.moduleIsUnset(row, col - c)) {
            let dark =
              byteIndex < data.length &&
              (((data[byteIndex] ?? 0) >>> bitIndex) & 1) === 1;

            const mask = getMask(maskPattern, row, col - c);

            if (mask) {
              dark = !dark;
            }

            this.setModule(row, col - c, dark);
            bitIndex--;

            if (bitIndex < 0) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }

        row += inc;

        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }
}

const PAD0 = 0xec;
const PAD1 = 0x11;

function createData(
  version: number,
  errorCorrectLevel: ErrorCorrectLevel,
  dataList: DataBlock[]
): number[] {
  const rsBlocks = getRSBlocks(version, errorCorrectLevel);

  const buffer = new BitBuffer();

  for (const data of dataList) {
    buffer.put(data.mode, 4);
    buffer.put(data.getLength(), getLengthInBits(data.mode, version));
    data.write(buffer);
  }

  // calc num max data.
  const totalDataCount = rsBlocks.reduce(
    (accum, el) => accum + el.dataCount,
    0
  );

  if (buffer.lengthInBits > totalDataCount * 8) {
    throw new Error(
      `code length overflow. (${buffer.lengthInBits} > ${totalDataCount * 8})`
    );
  }

  // end code
  if (buffer.lengthInBits + 4 <= totalDataCount * 8) {
    buffer.put(0, 4);
  }

  // padding
  while (buffer.lengthInBits % 8 != 0) {
    buffer.putBit(false);
  }

  // padding
  while (true) {
    if (buffer.lengthInBits >= totalDataCount * 8) {
      break;
    }
    buffer.put(PAD0, 8);

    if (buffer.lengthInBits >= totalDataCount * 8) {
      break;
    }
    buffer.put(PAD1, 8);
  }

  return createBytes(buffer, rsBlocks);
}

function createBytes(buffer: BitBuffer, rsBlocks: QRRSBlock[]): number[] {
  let offset = 0;

  const { maxDcCount, maxEcCount } = rsBlocks.reduce(
    (accum, rsBlock) => ({
      maxDcCount: Math.max(accum.maxDcCount, rsBlock.dataCount),
      maxEcCount: Math.max(accum.maxEcCount, rsBlock.ecCount),
    }),
    { maxDcCount: 0, maxEcCount: 0 }
  );

  const dcdata: number[][] = [];
  const ecdata: number[][] = [];

  for (const rsBlock of rsBlocks) {
    const dcCount = rsBlock.dataCount;
    const ecCount = rsBlock.ecCount;

    const dc: number[] = [];
    for (let i = 0; i < dcCount; i++) {
      dc.push(buffer.getByte(i + offset));
    }
    dcdata.push(dc);
    offset += dcCount;

    const rsPoly = getErrorCorrectPolynomial(ecCount);
    const rawPoly = new Polynomial(dc, rsPoly.length - 1);

    const modPoly = rawPoly.mod(rsPoly);
    const ec: number[] = [];
    const ecLength = rsPoly.length - 1;
    for (let i = 0; i < ecLength; i++) {
      const modIndex = i + modPoly.length - ecLength;
      ec.push(modIndex >= 0 ? modPoly.get(modIndex) : 0);
    }
    ecdata.push(ec);
  }

  const data: number[] = [];

  for (let i = 0; i < maxDcCount; i++) {
    for (const dc of dcdata) {
      if (i < dc.length) {
        data.push(dc[i] ?? 0);
      }
    }
  }

  for (let i = 0; i < maxEcCount; i++) {
    for (const ec of ecdata) {
      if (i < ec.length) {
        data.push(ec[i] ?? 0);
      }
    }
  }

  return data;
}
