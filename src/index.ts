import { ErrorCorrectLevel, ValidVersion } from "./definitions";
import { QRCodeBuilder } from "./qrcodebuilder";

export { ErrorCorrectLevel } from "./definitions";

interface GenerateOptions {
  /** The QR code type number.
   *
   * This indicates how large the qr code should be. If this is `-1`, or not provided, then the minimum required size will be used.
   */
  version: -1 | ValidVersion;
  /**
   * The error correction level. The error correction levels are defined in {@link ErrorCorrectLevel}.
   */
  errorCorrectLevel: ErrorCorrectLevel;
}

const DEFAULT_OPTIONS: GenerateOptions = {
  version: -1,
  errorCorrectLevel: ErrorCorrectLevel.High,
};

/** A generated QR code */
export interface QRCode {
  /** The width and height of the QR code */
  size: number;
  /** Indicates whether the specified module is dark */
  isDark: (row: number, col: number) => boolean;
  /** Indicates whether the specified module is one of the patterns used to located the code */
  isPatternModule: (row: number, col: number) => boolean;
}

/**
 * Generates a QR code.
 *
 * @param data The data to be encoded.
 * @param options optionally specify settings for the QR code.
 * @returns A {@link QRCode} object containing the qr code definition.
 */
export function generate(
  data: string | string[],
  options?: Partial<GenerateOptions>
): QRCode {
  const concreteOptions = options
    ? { ...DEFAULT_OPTIONS, ...options }
    : DEFAULT_OPTIONS;

  const qr = new QRCodeBuilder(
    concreteOptions.version,
    concreteOptions.errorCorrectLevel
  );
  if (Array.isArray(data)) {
    for (const item in data) {
      qr.addData(item);
    }
  } else {
    qr.addData(data);
  }

  return qr.make();
}
