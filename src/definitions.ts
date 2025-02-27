/** The error correction level to be used when generating the QR code */
export enum ErrorCorrectLevel {
  /** Allows correcting up to 7% */
  Low,
  /** Allows correcting up to 15% */
  Medium,
  /** Allows correcting up to 25% */
  Quartile,
  /** Allows correcting up to 30% */
  High,
}

export type ValidVersion =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40;

type ModePart =
  | "MODE_NUMBER"
  | "MODE_ALPHA_NUM"
  | "MODE_8BIT_BYTE"
  | "MODE_KANJI";

export const Mode: Record<ModePart, number> = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3,
};
