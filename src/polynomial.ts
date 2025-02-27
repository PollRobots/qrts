import { glog, gexp } from "./math";

export class Polynomial {
  private readonly num: number[];

  constructor(num: number[], shift: number) {
    let offset = 0;

    while (offset < num.length && num[offset] == 0) {
      offset++;
    }

    this.num = new Array(num.length - offset + shift).fill(0);
    for (let i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset] ?? 0;
    }
  }

  get(index: number): number {
    return this.num[index] ?? 0;
  }

  get length() {
    return this.num.length;
  }

  multiply(e: Polynomial) {
    const num: number[] = new Array(this.length + e.length - 1);

    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < e.length; j++) {
        num[i + j] =
          (num[i + j] ?? 0) ^ gexp(glog(this.get(i)) + glog(e.get(j)));
      }
    }

    return new Polynomial(num, 0);
  }

  mod(e: Polynomial): Polynomial {
    if (this.length < e.length) {
      return this;
    }

    const ratio = glog(this.get(0)) - glog(e.get(0));

    const num: number[] = this.num.map((el, i) =>
      i < e.length ? el ^ gexp(glog(e.get(i)) + ratio) : el
    );

    // recursive call
    return new Polynomial(num, 0).mod(e);
  }
}
