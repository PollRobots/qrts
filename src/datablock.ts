import { QRBitBuffer } from "./bitbuffer";
import { Mode } from "./definitions";

const ALPHA_NUM_CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";

const ALPHA_NUM_CHARACTER_ENCODING = new Map(
  Array.from(ALPHA_NUM_CHARACTERS).map((ch, i) => [ch, i])
);

export class DataBlock {
  readonly mode: number;
  private readonly data: Uint8Array;

  constructor(data: string) {
    if (isAlphaNumString(data)) {
      this.mode = Mode.MODE_ALPHA_NUM;
      this.data = new Uint8Array(
        Array.from(data).map((ch) => ALPHA_NUM_CHARACTER_ENCODING.get(ch) || 0)
      );
    } else {
      const utf8 = new TextEncoder().encode(data);
      this.mode = Mode.MODE_8BIT_BYTE;
      this.data = utf8;
    }
  }

  getLength() {
    return this.data.length;
  }

  write(buffer: QRBitBuffer) {
    switch (this.mode) {
      case Mode.MODE_8BIT_BYTE:
        this.data.forEach((byte) => buffer.put(byte, 8));
        break;
      case Mode.MODE_ALPHA_NUM:
        for (let i = 0; i < this.data.length - 1; i += 2) {
          buffer.put(45 * (this.data[i] ?? 0) + (this.data[i + 1] ?? 0), 11);
        }
        if ((this.data.length & 1) === 1) {
          buffer.put(this.data[this.data.length - 1] ?? 0, 6);
        }
        break;
      case Mode.MODE_NUMBER:
        throw new Error("Numeric mode is not implemented");
      case Mode.MODE_KANJI:
        throw new Error("Kanji mode is not implemented");
      default:
        throw new Error(`Unknown mode ${this.mode}`);
    }
  }
}

function isAlphaNumString(data: string): boolean {
  return Array.from(data).every((ch) => ALPHA_NUM_CHARACTER_ENCODING.has(ch));
}
