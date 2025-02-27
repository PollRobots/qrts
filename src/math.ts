export function glog(n: number): number {
  if (n < 1) {
    throw new Error(`glog(${n})`);
  }

  return LOG_TABLE[n] ?? 0;
}

export function gexp(n: number): number {
  while (n < 0) {
    n += 255;
  }

  while (n >= 256) {
    n -= 255;
  }

  return EXP_TABLE[n] ?? 0;
}

const [EXP_TABLE, LOG_TABLE] = makeTables();

function makeTables(): [number[], number[]] {
  const expTable = new Array<number>(256);
  for (let i = 0; i < 8; i++) {
    expTable[i] = 1 << i;
  }
  for (let i = 8; i < 256; i++) {
    expTable[i] =
      // These are all clearly set according to the logic of this function
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expTable[i - 4]! ^ expTable[i - 5]! ^ expTable[i - 6]! ^ expTable[i - 8]!;
  }

  const logTable = new Array<number>(256);
  for (let i = 0; i < 255; i++) {
    // These are all clearly set according to the logic of this function
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    logTable[expTable[i]!] = i;
  }
  return [expTable, logTable];
}
