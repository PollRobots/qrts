import { ErrorCorrectLevel } from "./ErrorCorrectLevel";
import { QRCode } from "./QRCode";

export function Hello() {
  return "Hello, World!";
}

type QrCodeOptions = {
  typeNumber: number;
  errorCorrectLevel: 0 | 1 | 2 | 3;
};

const DEFAULT_OPTIONS: QrCodeOptions = {
  typeNumber: -1,
  errorCorrectLevel: ErrorCorrectLevel.H,
};

export function qrcode(data: string, options?: Partial<QrCodeOptions>) {
  const concreteOptions = options
    ? { ...DEFAULT_OPTIONS, ...options }
    : DEFAULT_OPTIONS;

  const qr = new QRCode(
    concreteOptions.typeNumber,
    concreteOptions.errorCorrectLevel
  );
  qr.addData(data);
  qr.make();

  return qr;
}
