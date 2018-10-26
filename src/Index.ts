import {readdir, readFile, rename, unlink, writeFile} from "fs";
import {consoleError, consoleInfo, consoleSpecial, consoleSuccess, consoleWarning} from "./Helper";

import {ByteBuffer} from "microbuffer";
import {checkFile} from "iscamelcase";
import {FontFormat} from "./Types";

const ttf2eot = require("ttf2eot");
const ttf2svg = require("ttf2svg");
const ttf2woff = require("ttf2woff");
const ttf2woff2 = require("ttf2woff2");

const fileExtension = require("file-extension");
const slash = require("super-trailing-slash");

const camelCase = require("camelcase");

export class WebfontConverter {
    constructor(path: string, file?: string) {
        path = slash.add(path);
        if (!file) {
            this.clearFiles(path).then((): void => {
                this.convertFiles(path).then((): void => {
                    this.renameFiles(path).catch((err: NodeJS.ErrnoException): void => {
                        throw err;
                    }).finally((): void => {
                        consoleInfo("Completed renaming files!");
                    });
                }).catch((err: NodeJS.ErrnoException): void => {
                    throw err;
                }).finally((): void => {
                    consoleInfo("Completed converting files!");
                });
            }).catch((err: NodeJS.ErrnoException): void => {
                throw err;
            }).finally((): void => {
                consoleInfo("Completed deletion of files!");
            });
        }
        else {
            //TODO: functions for single files
        }
    }

    private async clearFiles(path: string, file?: string) {
        await readdir(path, (err, files) => {
            if (!err) {
                files.forEach(dirFile => {
                    if (fileExtension(dirFile) !== "otf") {
                        if (fileExtension(dirFile) !== "ttf") {
                            if (!file) {
                                unlink(path + dirFile, (err) => {
                                    if (!err) {
                                        consoleWarning(`Removed ${path + dirFile}`);
                                    }
                                    else {
                                        consoleError(`An error happened: ${err.code}`);
                                    }
                                });
                            }
                            else {
                                //TODO: Unlink single file
                            }
                        }
                    }
                    else {
                        consoleError("This converter can only convert the TTF file format");
                        throw new Error("Process aborted!");
                    }
                });
            }
            else {
                consoleError(`An error happened: ${err.code}`);
                throw err;
            }
        });
    }

    private async renameFiles(path: string, file?: string) {
        if (!file) {
            await readdir(path, (err: NodeJS.ErrnoException, files: string[]): void => {
                if (!err) {
                    files.forEach(file => {
                        if (!checkFile(path + file)) {
                            const oldPath: string = path + file;
                            const newPath: string = path + camelCase(file.replace(/\.[0-9a-z]+$/i, "")) + ".ttf";
                            rename(oldPath, newPath, (err: NodeJS.ErrnoException): void => {
                                if (!err) {
                                    consoleSuccess(`Renamed ${oldPath} to ${newPath}`);
                                }
                                else {
                                    throw err;
                                }
                            });
                        }
                    });
                }
                else {
                    consoleError(`Error while reading from directory: ${err.code}`);
                }
            });
        }
    }

    private async convertFiles(path: string, file?: string): Promise<boolean> {
        if (!file) {
            await readdir(path, (err: NodeJS.ErrnoException, files: string[]): void => {
                if (!err) {
                    consoleSpecial(`Start converting ${files.length} files`);
                    files.forEach(file => {
                        consoleInfo(`Found: ${file}`);
                        readFile((path + file), (err: NodeJS.ErrnoException, input: Buffer): void => {
                            if (!err) {
                                const completePath: string = path + camelCase(file.replace(/\.[0-9a-z]+$/i, ""));
                                createFile(completePath, ttf2eot(input), "eot").then((success: boolean): void => {
                                    if (success) {
                                        createFile(completePath, ttf2svg(input), "svg").then((success: boolean): void => {
                                            if (success) {
                                                createFile(completePath, ttf2woff(input), "woff").then((): void => {
                                                    createFile(completePath, ttf2woff2(input), "woff2").then((success: boolean): void => {
                                                        if (success) {
                                                            consoleInfo(`Converting of ${completePath} started!`);
                                                        }
                                                    });
                                                })
                                            }
                                        });
                                    }
                                    else {
                                        consoleError("Converting was not successful!");
                                    }
                                }).catch((err): void => {
                                    throw err;
                                }).finally((): void => {

                                });

                                async function createFile(path: string, data: ByteBuffer, type: FontFormat): Promise<boolean> {
                                    writeFile(`${path}.${type}`, data, (err: NodeJS.ErrnoException): void =>
                                        writeFontFileCallback(err, `${path}.${type}`));
                                    return true;

                                    function writeFontFileCallback(err: NodeJS.ErrnoException, file: string): void {
                                        if (!err) {
                                            consoleSuccess(`Created: ${file}`);
                                        }
                                        else {
                                            consoleError("Error while converting file");
                                            throw err;
                                        }
                                    }
                                }
                            }
                            else {
                                throw err;
                            }
                        })
                    });
                }
                else {
                    throw err;
                }
            });
            return true;
        }
    }
}