"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ttf2eot_1 = require("ttf2eot");
const ttf2svg_1 = require("ttf2svg");
const ttf2woff_1 = require("ttf2woff");
const ttf2woff2_1 = require("ttf2woff2");
const file_extension_1 = require("file-extension");
const Helper_1 = require("./Helper");
const camelcase_1 = require("camelcase");
const isCamelCase = require("iscamelcase");
class WebfontConverter {
    constructor(path, file) {
        if (!file) {
            this.clearFiles(path).then(() => {
                this.convertFiles(path).then(() => {
                    this.renameFiles(path).catch((err) => {
                        throw err;
                    }).finally(() => {
                        Helper_1.consoleInfo("Completed renaming files!");
                    });
                }).catch((err) => {
                    throw err;
                }).finally(() => {
                    Helper_1.consoleInfo("Completed converting files!");
                });
            }).catch((err) => {
                throw err;
            }).finally(() => {
                Helper_1.consoleInfo("Completed deletion of files!");
            });
        }
        else {
            //TODO: functions for single files
        }
    }
    async clearFiles(path, file) {
        await fs_1.readdir(path, (err, files) => {
            if (!err) {
                files.forEach(dirFile => {
                    if (file_extension_1.fileExtension(dirFile) !== "otf") {
                        if (file_extension_1.fileExtension(dirFile) !== "ttf") {
                            if (!file) {
                                fs_1.unlink(path + dirFile, (err) => {
                                    if (!err) {
                                        Helper_1.consoleWarning(`Removed ${path + dirFile}`);
                                    }
                                    else {
                                        Helper_1.consoleError(`An error happened: ${err.code}`);
                                    }
                                });
                            }
                            else {
                                //TODO: Unlink single file
                            }
                        }
                        else {
                        }
                    }
                    else {
                        Helper_1.consoleError("This converter can only convert the TTF file format");
                        throw new Error("Process aborted!");
                    }
                });
            }
            else {
                Helper_1.consoleError(`An error happened: ${err.code}`);
                throw err;
            }
        });
    }
    async renameFiles(path, file) {
        if (!file) {
            await fs_1.readdir(path, (err, files) => {
                if (!err) {
                    files.forEach(file => {
                        if (!isCamelCase.checkFile(path + file)) {
                            const oldPath = path + file;
                            const newPath = path + camelcase_1.default(file.replace(/\.[0-9a-z]+$/i, "")) + ".ttf";
                            fs_1.rename(oldPath, newPath, (err) => {
                                if (!err) {
                                    Helper_1.consoleSuccess(`Renamed ${oldPath} to ${newPath}`);
                                }
                                else {
                                    throw err;
                                }
                            });
                        }
                    });
                }
                else {
                    Helper_1.consoleError(`Error while reading from directory: ${err.code}`);
                }
            });
        }
    }
    async convertFiles(path, file) {
        if (!file) {
            await fs_1.readdir(path, (err, files) => {
                if (!err) {
                    Helper_1.consoleSpecial(`Start converting ${files.length} files`);
                    files.forEach(file => {
                        Helper_1.consoleInfo(`Found: ${file}`);
                        fs_1.readFile((path + file), (err, input) => {
                            if (!err) {
                                const completePath = path + camelcase_1.default(file.replace(/\.[0-9a-z]+$/i, ""));
                                createFile(completePath, ttf2eot_1.ttf2eot(input), "eot").then((success) => {
                                    if (success) {
                                        createFile(completePath, ttf2svg_1.ttf2svg(input), "svg").then((success) => {
                                            if (success) {
                                                createFile(completePath, ttf2woff_1.ttf2woff(input), "woff").then(() => {
                                                    createFile(completePath, ttf2woff2_1.ttf2woff2(input), "woff2").then((success) => {
                                                        if (success) {
                                                            Helper_1.consoleSpecial("Converting completed!");
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        Helper_1.consoleError("Converting was not successful!");
                                    }
                                }).catch((err) => {
                                    throw err;
                                }).finally(() => {
                                });
                                async function createFile(path, data, type) {
                                    fs_1.writeFile(`${path}.${type}`, data, (err) => writeFontFileCallback(err, `${path}.${type}`));
                                    return true;
                                    function writeFontFileCallback(err, file) {
                                        if (!err) {
                                            Helper_1.consoleSuccess(`Created: ${file}`);
                                        }
                                        else {
                                            Helper_1.consoleError("Error while converting file");
                                            throw err;
                                        }
                                    }
                                }
                            }
                            else {
                                throw err;
                            }
                        });
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
exports.WebfontConverter = WebfontConverter;
//# sourceMappingURL=Index.js.map