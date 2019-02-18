import * as path from "path";

export const swapFileExtension = (filePath: string, newFileExt: string): string => `${path.parse(path.basename(filePath)).name}.${newFileExt.toLowerCase()}`;
