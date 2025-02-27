// ErrorCorrectLevel
import { ErrorCorrectLevel } from "./definitions";

export interface QRRSBlock {
  totalCount: number;
  dataCount: number;
}

interface RSBlock {
  c: number;
  tc: number;
  dc: number;
}

interface BlockTableEntry {
  version: number;
  loww: RSBlock[];
  medi: RSBlock[];
  quar: RSBlock[];
  high: RSBlock[];
}

const RS_BLOCK_TABLE: BlockTableEntry[] = [
  {
    version: 1,
    loww: [{ c: 1, tc: 26, dc: 19 }],
    medi: [{ c: 1, tc: 26, dc: 16 }],
    quar: [{ c: 1, tc: 26, dc: 13 }],
    high: [{ c: 1, tc: 26, dc: 9 }],
  },
  {
    version: 2,
    loww: [{ c: 1, tc: 44, dc: 34 }],
    medi: [{ c: 1, tc: 44, dc: 28 }],
    quar: [{ c: 1, tc: 44, dc: 22 }],
    high: [{ c: 1, tc: 44, dc: 16 }],
  },
  {
    version: 3,
    loww: [{ c: 1, tc: 70, dc: 55 }],
    medi: [{ c: 1, tc: 70, dc: 44 }],
    quar: [{ c: 2, tc: 35, dc: 17 }],
    high: [{ c: 2, tc: 35, dc: 13 }],
  },
  {
    version: 4,
    loww: [{ c: 1, tc: 100, dc: 80 }],
    medi: [{ c: 2, tc: 50, dc: 32 }],
    quar: [{ c: 2, tc: 50, dc: 24 }],
    high: [{ c: 4, tc: 25, dc: 9 }],
  },
  {
    version: 5,
    loww: [{ c: 1, tc: 134, dc: 108 }],
    medi: [{ c: 2, tc: 67, dc: 43 }],
    quar: [
      { c: 2, tc: 33, dc: 15 },
      { c: 2, tc: 34, dc: 16 },
    ],
    high: [
      { c: 2, tc: 33, dc: 11 },
      { c: 2, tc: 34, dc: 12 },
    ],
  },
  {
    version: 6,
    loww: [{ c: 2, tc: 86, dc: 68 }],
    medi: [{ c: 4, tc: 43, dc: 27 }],
    quar: [{ c: 4, tc: 43, dc: 19 }],
    high: [{ c: 4, tc: 43, dc: 15 }],
  },
  {
    version: 7,
    loww: [{ c: 2, tc: 98, dc: 78 }],
    medi: [{ c: 4, tc: 49, dc: 31 }],
    quar: [
      { c: 2, tc: 32, dc: 14 },
      { c: 4, tc: 33, dc: 15 },
    ],
    high: [
      { c: 4, tc: 39, dc: 13 },
      { c: 1, tc: 40, dc: 14 },
    ],
  },
  {
    version: 8,
    loww: [{ c: 2, tc: 121, dc: 97 }],
    medi: [
      { c: 2, tc: 60, dc: 38 },
      { c: 2, tc: 61, dc: 39 },
    ],
    quar: [
      { c: 4, tc: 40, dc: 18 },
      { c: 2, tc: 41, dc: 19 },
    ],
    high: [
      { c: 4, tc: 40, dc: 14 },
      { c: 2, tc: 41, dc: 15 },
    ],
  },
  {
    version: 9,
    loww: [{ c: 2, tc: 146, dc: 116 }],
    medi: [
      { c: 3, tc: 58, dc: 36 },
      { c: 2, tc: 59, dc: 37 },
    ],
    quar: [
      { c: 4, tc: 36, dc: 16 },
      { c: 4, tc: 37, dc: 17 },
    ],
    high: [
      { c: 4, tc: 36, dc: 12 },
      { c: 4, tc: 37, dc: 13 },
    ],
  },
  {
    version: 10,
    loww: [
      { c: 2, tc: 86, dc: 68 },
      { c: 2, tc: 87, dc: 69 },
    ],
    medi: [
      { c: 4, tc: 69, dc: 43 },
      { c: 1, tc: 70, dc: 44 },
    ],
    quar: [
      { c: 6, tc: 43, dc: 19 },
      { c: 2, tc: 44, dc: 20 },
    ],
    high: [
      { c: 6, tc: 43, dc: 15 },
      { c: 2, tc: 44, dc: 16 },
    ],
  },
  {
    version: 11,
    loww: [{ c: 4, tc: 101, dc: 81 }],
    medi: [
      { c: 1, tc: 80, dc: 50 },
      { c: 4, tc: 81, dc: 51 },
    ],
    quar: [
      { c: 4, tc: 50, dc: 22 },
      { c: 4, tc: 51, dc: 23 },
    ],
    high: [
      { c: 3, tc: 36, dc: 12 },
      { c: 8, tc: 37, dc: 13 },
    ],
  },
  {
    version: 12,
    loww: [
      { c: 2, tc: 116, dc: 92 },
      { c: 2, tc: 117, dc: 93 },
    ],
    medi: [
      { c: 6, tc: 58, dc: 36 },
      { c: 2, tc: 59, dc: 37 },
    ],
    quar: [
      { c: 4, tc: 46, dc: 20 },
      { c: 6, tc: 47, dc: 21 },
    ],
    high: [
      { c: 7, tc: 42, dc: 14 },
      { c: 4, tc: 43, dc: 15 },
    ],
  },
  {
    version: 13,
    loww: [{ c: 4, tc: 133, dc: 107 }],
    medi: [
      { c: 8, tc: 59, dc: 37 },
      { c: 1, tc: 60, dc: 38 },
    ],
    quar: [
      { c: 8, tc: 44, dc: 20 },
      { c: 4, tc: 45, dc: 21 },
    ],
    high: [
      { c: 12, tc: 33, dc: 11 },
      { c: 4, tc: 34, dc: 12 },
    ],
  },
  {
    version: 14,
    loww: [
      { c: 3, tc: 145, dc: 115 },
      { c: 1, tc: 146, dc: 116 },
    ],
    medi: [
      { c: 4, tc: 64, dc: 40 },
      { c: 5, tc: 65, dc: 41 },
    ],
    quar: [
      { c: 11, tc: 36, dc: 16 },
      { c: 5, tc: 37, dc: 17 },
    ],
    high: [
      { c: 11, tc: 36, dc: 12 },
      { c: 5, tc: 37, dc: 13 },
    ],
  },
  {
    version: 15,
    loww: [
      { c: 5, tc: 109, dc: 87 },
      { c: 1, tc: 110, dc: 88 },
    ],
    medi: [
      { c: 5, tc: 65, dc: 41 },
      { c: 5, tc: 66, dc: 42 },
    ],
    quar: [
      { c: 5, tc: 54, dc: 24 },
      { c: 7, tc: 55, dc: 25 },
    ],
    high: [{ c: 11, tc: 36, dc: 12 }],
  },
  {
    version: 16,
    loww: [
      { c: 5, tc: 122, dc: 98 },
      { c: 1, tc: 123, dc: 99 },
    ],
    medi: [
      { c: 7, tc: 73, dc: 45 },
      { c: 3, tc: 74, dc: 46 },
    ],
    quar: [
      { c: 15, tc: 43, dc: 19 },
      { c: 2, tc: 44, dc: 20 },
    ],
    high: [
      { c: 3, tc: 45, dc: 15 },
      { c: 13, tc: 46, dc: 16 },
    ],
  },
  {
    version: 17,
    loww: [
      { c: 1, tc: 135, dc: 107 },
      { c: 5, tc: 136, dc: 108 },
    ],
    medi: [
      { c: 10, tc: 74, dc: 46 },
      { c: 1, tc: 75, dc: 47 },
    ],
    quar: [
      { c: 1, tc: 50, dc: 22 },
      { c: 15, tc: 51, dc: 23 },
    ],
    high: [
      { c: 2, tc: 42, dc: 14 },
      { c: 17, tc: 43, dc: 15 },
    ],
  },
  {
    version: 18,
    loww: [
      { c: 5, tc: 150, dc: 120 },
      { c: 1, tc: 151, dc: 121 },
    ],
    medi: [
      { c: 9, tc: 69, dc: 43 },
      { c: 4, tc: 70, dc: 44 },
    ],
    quar: [
      { c: 17, tc: 50, dc: 22 },
      { c: 1, tc: 51, dc: 23 },
    ],
    high: [
      { c: 2, tc: 42, dc: 14 },
      { c: 19, tc: 43, dc: 15 },
    ],
  },
  {
    version: 19,
    loww: [
      { c: 3, tc: 141, dc: 113 },
      { c: 4, tc: 142, dc: 114 },
    ],
    medi: [
      { c: 3, tc: 70, dc: 44 },
      { c: 11, tc: 71, dc: 45 },
    ],
    quar: [
      { c: 17, tc: 47, dc: 21 },
      { c: 4, tc: 48, dc: 22 },
    ],
    high: [
      { c: 9, tc: 39, dc: 13 },
      { c: 16, tc: 40, dc: 14 },
    ],
  },
  {
    version: 20,
    loww: [
      { c: 3, tc: 135, dc: 107 },
      { c: 5, tc: 136, dc: 108 },
    ],
    medi: [
      { c: 3, tc: 67, dc: 41 },
      { c: 13, tc: 68, dc: 42 },
    ],
    quar: [
      { c: 15, tc: 54, dc: 24 },
      { c: 5, tc: 55, dc: 25 },
    ],
    high: [
      { c: 15, tc: 43, dc: 15 },
      { c: 10, tc: 44, dc: 16 },
    ],
  },
  {
    version: 21,
    loww: [
      { c: 4, tc: 144, dc: 116 },
      { c: 4, tc: 145, dc: 117 },
    ],
    medi: [{ c: 17, tc: 68, dc: 42 }],
    quar: [
      { c: 17, tc: 50, dc: 22 },
      { c: 6, tc: 51, dc: 23 },
    ],
    high: [
      { c: 19, tc: 46, dc: 16 },
      { c: 6, tc: 47, dc: 17 },
    ],
  },
  {
    version: 22,
    loww: [
      { c: 2, tc: 139, dc: 111 },
      { c: 7, tc: 140, dc: 112 },
    ],
    medi: [{ c: 17, tc: 74, dc: 46 }],
    quar: [
      { c: 7, tc: 54, dc: 24 },
      { c: 16, tc: 55, dc: 25 },
    ],
    high: [{ c: 34, tc: 37, dc: 13 }],
  },
  {
    version: 23,
    loww: [
      { c: 4, tc: 151, dc: 121 },
      { c: 5, tc: 152, dc: 122 },
    ],
    medi: [
      { c: 4, tc: 75, dc: 47 },
      { c: 14, tc: 76, dc: 48 },
    ],
    quar: [
      { c: 11, tc: 54, dc: 24 },
      { c: 14, tc: 55, dc: 25 },
    ],
    high: [
      { c: 16, tc: 45, dc: 15 },
      { c: 14, tc: 46, dc: 16 },
    ],
  },
  {
    version: 24,
    loww: [
      { c: 6, tc: 147, dc: 117 },
      { c: 4, tc: 148, dc: 118 },
    ],
    medi: [
      { c: 6, tc: 73, dc: 45 },
      { c: 14, tc: 74, dc: 46 },
    ],
    quar: [
      { c: 11, tc: 54, dc: 24 },
      { c: 16, tc: 55, dc: 25 },
    ],
    high: [
      { c: 30, tc: 46, dc: 16 },
      { c: 2, tc: 47, dc: 17 },
    ],
  },
  {
    version: 25,
    loww: [
      { c: 8, tc: 132, dc: 106 },
      { c: 4, tc: 133, dc: 107 },
    ],
    medi: [
      { c: 8, tc: 75, dc: 47 },
      { c: 13, tc: 76, dc: 48 },
    ],
    quar: [
      { c: 7, tc: 54, dc: 24 },
      { c: 22, tc: 55, dc: 25 },
    ],
    high: [
      { c: 22, tc: 45, dc: 15 },
      { c: 13, tc: 46, dc: 16 },
    ],
  },
  {
    version: 26,
    loww: [
      { c: 10, tc: 142, dc: 114 },
      { c: 2, tc: 143, dc: 115 },
    ],
    medi: [
      { c: 19, tc: 74, dc: 46 },
      { c: 4, tc: 75, dc: 47 },
    ],
    quar: [
      { c: 28, tc: 50, dc: 22 },
      { c: 6, tc: 51, dc: 23 },
    ],
    high: [
      { c: 33, tc: 46, dc: 16 },
      { c: 4, tc: 47, dc: 17 },
    ],
  },
  {
    version: 27,
    loww: [
      { c: 8, tc: 152, dc: 122 },
      { c: 4, tc: 153, dc: 123 },
    ],
    medi: [
      { c: 22, tc: 73, dc: 45 },
      { c: 3, tc: 74, dc: 46 },
    ],
    quar: [
      { c: 8, tc: 53, dc: 23 },
      { c: 26, tc: 54, dc: 24 },
    ],
    high: [
      { c: 12, tc: 45, dc: 15 },
      { c: 28, tc: 46, dc: 16 },
    ],
  },
  {
    version: 28,
    loww: [
      { c: 3, tc: 147, dc: 117 },
      { c: 10, tc: 148, dc: 118 },
    ],
    medi: [
      { c: 3, tc: 73, dc: 45 },
      { c: 23, tc: 74, dc: 46 },
    ],
    quar: [
      { c: 4, tc: 54, dc: 24 },
      { c: 31, tc: 55, dc: 25 },
    ],
    high: [
      { c: 11, tc: 45, dc: 15 },
      { c: 31, tc: 46, dc: 16 },
    ],
  },
  {
    version: 29,
    loww: [
      { c: 7, tc: 146, dc: 116 },
      { c: 7, tc: 147, dc: 117 },
    ],
    medi: [
      { c: 21, tc: 73, dc: 45 },
      { c: 7, tc: 74, dc: 46 },
    ],
    quar: [
      { c: 1, tc: 53, dc: 23 },
      { c: 37, tc: 54, dc: 24 },
    ],
    high: [
      { c: 19, tc: 45, dc: 15 },
      { c: 26, tc: 46, dc: 16 },
    ],
  },
  {
    version: 30,
    loww: [
      { c: 5, tc: 145, dc: 115 },
      { c: 10, tc: 146, dc: 116 },
    ],
    medi: [
      { c: 19, tc: 75, dc: 47 },
      { c: 10, tc: 76, dc: 48 },
    ],
    quar: [
      { c: 15, tc: 54, dc: 24 },
      { c: 25, tc: 55, dc: 25 },
    ],
    high: [
      { c: 23, tc: 45, dc: 15 },
      { c: 25, tc: 46, dc: 16 },
    ],
  },
  {
    version: 31,
    loww: [
      { c: 13, tc: 145, dc: 115 },
      { c: 3, tc: 146, dc: 116 },
    ],
    medi: [
      { c: 2, tc: 74, dc: 46 },
      { c: 29, tc: 75, dc: 47 },
    ],
    quar: [
      { c: 42, tc: 54, dc: 24 },
      { c: 1, tc: 55, dc: 25 },
    ],
    high: [
      { c: 23, tc: 45, dc: 15 },
      { c: 28, tc: 46, dc: 16 },
    ],
  },
  {
    version: 32,
    loww: [{ c: 17, tc: 145, dc: 115 }],
    medi: [
      { c: 10, tc: 74, dc: 46 },
      { c: 23, tc: 75, dc: 47 },
    ],
    quar: [
      { c: 10, tc: 54, dc: 24 },
      { c: 35, tc: 55, dc: 25 },
    ],
    high: [
      { c: 19, tc: 45, dc: 15 },
      { c: 35, tc: 46, dc: 16 },
    ],
  },
  {
    version: 33,
    loww: [
      { c: 17, tc: 145, dc: 115 },
      { c: 1, tc: 146, dc: 116 },
    ],
    medi: [
      { c: 14, tc: 74, dc: 46 },
      { c: 21, tc: 75, dc: 47 },
    ],
    quar: [
      { c: 29, tc: 54, dc: 24 },
      { c: 19, tc: 55, dc: 25 },
    ],
    high: [
      { c: 11, tc: 45, dc: 15 },
      { c: 46, tc: 46, dc: 16 },
    ],
  },
  {
    version: 34,
    loww: [
      { c: 13, tc: 145, dc: 115 },
      { c: 6, tc: 146, dc: 116 },
    ],
    medi: [
      { c: 14, tc: 74, dc: 46 },
      { c: 23, tc: 75, dc: 47 },
    ],
    quar: [
      { c: 44, tc: 54, dc: 24 },
      { c: 7, tc: 55, dc: 25 },
    ],
    high: [
      { c: 59, tc: 46, dc: 16 },
      { c: 1, tc: 47, dc: 17 },
    ],
  },
  {
    version: 35,
    loww: [
      { c: 12, tc: 151, dc: 121 },
      { c: 7, tc: 152, dc: 122 },
    ],
    medi: [
      { c: 12, tc: 75, dc: 47 },
      { c: 26, tc: 76, dc: 48 },
    ],
    quar: [
      { c: 39, tc: 54, dc: 24 },
      { c: 14, tc: 55, dc: 25 },
    ],
    high: [
      { c: 22, tc: 45, dc: 15 },
      { c: 41, tc: 46, dc: 16 },
    ],
  },
  {
    version: 36,
    loww: [
      { c: 6, tc: 151, dc: 121 },
      { c: 14, tc: 152, dc: 122 },
    ],
    medi: [
      { c: 6, tc: 75, dc: 47 },
      { c: 34, tc: 76, dc: 48 },
    ],
    quar: [
      { c: 46, tc: 54, dc: 24 },
      { c: 10, tc: 55, dc: 25 },
    ],
    high: [
      { c: 2, tc: 45, dc: 15 },
      { c: 64, tc: 46, dc: 16 },
    ],
  },
  {
    version: 37,
    loww: [
      { c: 17, tc: 152, dc: 122 },
      { c: 4, tc: 153, dc: 123 },
    ],
    medi: [
      { c: 29, tc: 74, dc: 46 },
      { c: 14, tc: 75, dc: 47 },
    ],
    quar: [
      { c: 49, tc: 54, dc: 24 },
      { c: 10, tc: 55, dc: 25 },
    ],
    high: [
      { c: 24, tc: 45, dc: 15 },
      { c: 46, tc: 46, dc: 16 },
    ],
  },
  {
    version: 38,
    loww: [
      { c: 4, tc: 152, dc: 122 },
      { c: 18, tc: 153, dc: 123 },
    ],
    medi: [
      { c: 13, tc: 74, dc: 46 },
      { c: 32, tc: 75, dc: 47 },
    ],
    quar: [
      { c: 48, tc: 54, dc: 24 },
      { c: 14, tc: 55, dc: 25 },
    ],
    high: [
      { c: 42, tc: 45, dc: 15 },
      { c: 32, tc: 46, dc: 16 },
    ],
  },
  {
    version: 39,
    loww: [
      { c: 20, tc: 147, dc: 117 },
      { c: 4, tc: 148, dc: 118 },
    ],
    medi: [
      { c: 40, tc: 75, dc: 47 },
      { c: 7, tc: 76, dc: 48 },
    ],
    quar: [
      { c: 43, tc: 54, dc: 24 },
      { c: 22, tc: 55, dc: 25 },
    ],
    high: [
      { c: 10, tc: 45, dc: 15 },
      { c: 67, tc: 46, dc: 16 },
    ],
  },
  {
    version: 40,
    loww: [
      { c: 19, tc: 148, dc: 118 },
      { c: 6, tc: 149, dc: 119 },
    ],
    medi: [
      { c: 18, tc: 75, dc: 47 },
      { c: 31, tc: 76, dc: 48 },
    ],
    quar: [
      { c: 34, tc: 54, dc: 24 },
      { c: 34, tc: 55, dc: 25 },
    ],
    high: [
      { c: 20, tc: 45, dc: 15 },
      { c: 61, tc: 46, dc: 16 },
    ],
  },
];

export function getRSBlocks(
  version: number,
  errorCorrectLevel: ErrorCorrectLevel
) {
  const blocks = getRsBlockTable(version, errorCorrectLevel);

  if (blocks === undefined) {
    throw new Error(
      `bad rs block @ version:${version}/errorCorrectLevel:${errorCorrectLevel}`
    );
  }

  const rsBlocks: QRRSBlock[] = [];

  for (const block of blocks) {
    for (let i = 0; i < block.c; i++) {
      rsBlocks.push({ totalCount: block.tc, dataCount: block.dc });
    }
  }

  return rsBlocks;
}

export function getRsBlockTable(
  version: number,
  errorCorrectLevel: ErrorCorrectLevel
) {
  const entry = RS_BLOCK_TABLE[version - 1];
  if (entry === undefined || entry.version !== version) {
    return;
  }
  switch (errorCorrectLevel) {
    case ErrorCorrectLevel.Low:
      return entry.loww;
    case ErrorCorrectLevel.Medium:
      return entry.medi;
    case ErrorCorrectLevel.Quartile:
      return entry.quar;
    case ErrorCorrectLevel.High:
      return entry.high;
  }
}
