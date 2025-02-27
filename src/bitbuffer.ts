export class QRBitBuffer {
  private readonly blocks: Uint8Array[] = [];
  private length = 0;

  get lengthInBits(): number {
    return this.length;
  }

  put(num: number, length: number) {
    for (let mask = 1 << (length - 1); mask !== 0; mask >>>= 1) {
      this.putBit((num & mask) !== 0);
    }
  }

  putBit(bit: boolean) {
    const blockIndex = this.length >>> 11;

    if (blockIndex >= this.blocks.length) {
      this.blocks.push(new Uint8Array(256));
    }

    if (bit) {
      const bitIndex = this.length & 0x7;
      const byteIndex = (this.length >>> 3) & 0xff;

      const block = this.blocks[blockIndex] ?? [];
      block[byteIndex] = (block[byteIndex] || 0) | (0x80 >>> bitIndex);
    }

    this.length++;
  }

  getByte(index: number): number {
    if (index < 0 || index << 3 >= this.length) {
      throw new Error(`Index(${index << 3}) out of range [0-${this.length})`);
    }
    const byteIndex = index & 0xff;
    const blockIndex = index >>> 8;

    return (this.blocks[blockIndex] ?? [])[byteIndex] ?? 0;
  }
}
