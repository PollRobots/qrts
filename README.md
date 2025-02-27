# qrts

QR Code&trade; encoding in TypeScript with no additional dependencies.

```typescript
import { generate } from "qrts";

const qrcode = generate("foo bar baz");
```

# API

## generate

```typescript
generate(data: string|string[], options?: Partial<GenerateOptions>): QRCode
```

### params

- **data** text to be encoded in the QR Code.

  If an array of strings is passed, then they will be encoded in turn.

  For each string that is encoded, either the `ALPHA_NUMERIC` or `8BIT_BYTE` mode will be used to encode it. The `NUMERIC` and `KANJI` modes are not supported. If the contents can be encoded using `ALHPA_NUMERIC`, then that will be used, otherwise the string will be encoded as `UTF-8` and the `8BIT_BYTE` mode will be used.

- **options** (optionally) configures the QR Code generation.
  ```typescript
  interface GenerateOptions {
    version: number;
    errorCorrectionLevel: ErrorCorrectionLevel;
  }
  ```
  - **version** a number between 1 and 40 that specifies how large the QR Code should be. The size of the generated code will be 4 × version + 17. If this is not specified, or set to `-1`, then the smallest size capable of containing the data will be used.
  - **errorCorretionLevel** &mdash; This is one of `Low`, `Medium`, `Quartile`, or `High`, representing increasing levels of redundancy in the QR Code. This will default to `High`.

### returns

This returns a `QRCode` object which has the following interface

```typescript
interface QRCode {
  size: number;
  isDark: (row: number, col: number) => boolean;
  isPatternModule: (row: number, col: number) => boolean;
}
```

- **size** the size of the QR Code in modules. The code will always be square.
- **isDark** Indicates whether a specific module is dark.
- **isPatternModule** Indicates whether a specific module is one of the corner blocks used by readers to locate and orient the QR Code

# Credits

This library is a fork of the [qr.js](https://npmjs.org/package/qr.js) package which appears to have been orphaned. See [LICENSE-qrjs](./LICENSE-qrjs) for the license from that project.

That package has been forked, converted to TypeScript, and modernized. In addition, support has been added for the `ALPHA_NUM` mode allowing smaller codes in some circumstances.

**qr.js** is itself a fork of [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) by [Kazuhiko Arase](https://github.com/kazuhikoarase). See [LICENSE-qrcode](./LICENSE-qrcode) for the license from that project.

QR Code&trade; is a registered trademark of DENSO WAVE INCORPORATED
