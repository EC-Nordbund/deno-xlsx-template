import XlsxTemplate from "./dist/xlsx.js";

export type primitive = boolean | Date | number | string;
export type primitiveObject = Record<string, primitive>;

export type arrayable = primitive | primitiveObject;
export type data = Record<string, primitive | arrayable[]>;

export default (
  file: ArrayBufferLike | Blob | Uint8Array,
  sheetNumber: number,
  data: data
): Uint8Array => {
  const template = new XlsxTemplate(file);

  template.substitute(sheetNumber, data);

  return template.generate({ type: "uint8array" });
};
