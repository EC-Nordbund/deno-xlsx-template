import XlsxTemplate from "./dist/xlsx.js";

type primitive = boolean | Date | number | string;
type primitiveObject = Record<string, primitive>;

type arrayable = primitive | primitiveObject;
type data = Record<string, primitive | arrayable[]>;

export default (
  file: ArrayBufferLike | Blob | Uint8Array,
  sheetNumber: number,
  data: data
): Uint8Array => {
  const template = new XlsxTemplate(file);

  template.substitute(sheetNumber, data);

  return template.generate({ type: "uint8array" });
};
