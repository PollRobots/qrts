import { QRBitBuffer } from "./BitBuffer";
import { Mode } from "./mode";

export class QR8bitByte {
  readonly mode: number;
  private readonly data: string;

  constructor(data: string) {
    this.mode = Mode.MODE_8BIT_BYTE;
    this.data = data;
  }

  getLength() {
    return this.data.length;
  }

  write(buffer: QRBitBuffer) {
    for (let i = 0; i < this.data.length; i++) {
      // not JIS ...
      buffer.put(this.data.charCodeAt(i), 8);
    }
  }
}
