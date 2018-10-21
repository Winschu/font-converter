const fs = require('fs');

const colors = require("colors");
const camelCase = require("camelcase");
const isCamelCase = require("iscamelcase");
const slash = require('super-trailing-slash');

const ttf2eot = require('ttf2eot');
const ttf2svg = require('ttf2svg');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');

function webfontConverter(path) {

    //appends trailing slash to path if needed
    const fontPath = slash.add(path); //Example: ./fonts/fontFamily/

    //clears all other files or old other font files from the directory
    clearFiles(fontPath).then(() => {
        //checks if there are still files that can be converted
        if (fs.readdirSync(fontPath).length !== 0) {
            //Iterates trough each remaining file
            convertFiles(fontPath).then((err) => {
                //converts remaining files to camelCase
                renameFiles(fontPath).then(() => {
                    if (err) {
                        throw err;
                    }
                });
            });
        }
        else {
            console.error("There are no files in this directory");
        }
    });
}

async function clearFiles(fontPath) {
    //clears all other files or old other font files from the directory
    fs.readdir(fontPath, (err, files) => {
        if (!err) {
            files.forEach(file => {
                if (file.includes((".otf"))) {
                    throw new Error(colors.red("This converter can only convert the TTF file format"));
                }
                if (!file.includes(".ttf")) {
                    fs.unlink(fontPath + file, (err) => {
                        if (!err) {
                            console.warn(colors.yellow(`${file} removed from chosen directory`));
                        }
                        else {
                            throw err;
                        }
                    });
                }
                else {
                    if (file.includes(" ")) {
                        console.log(file + " has whitespaces");
                        const oldPath = fontPath + file;
                        const newPath = `${fontPath + camelCase(file.replace(/\.[0-9a-z]+$/i, ""))}.ttf`;
                        fs.rename(oldPath, newPath, (err) => {
                            if (!err) {
                                console.log(colors.trap(`Renamed ${oldPath} into ${newPath}`));
                            }
                            else {
                                throw err;
                            }
                        });
                    }
                }
            });
        }
        else {
            throw err;
        }
    });
}

async function renameFiles(fontPath) {
    fs.readdir(fontPath, (err, files) => {
        if (!err) {
            files.forEach(file => {
                if (!isCamelCase.checkFile(fontPath + file)) {
                    fs.renameSync(fontPath + file, fontPath + camelCase(file.replace(".ttf", "")) + ".ttf");
                }
            });
        }
    });
}

async function convertFiles(fontPath) {
    fs.readdir(fontPath, (err, files) => {
        if (!err) {
            files.forEach(file => {
                const input = fs.readFileSync(fontPath + file);

                const fontFilePath = fontPath + camelCase(file.replace(/\.[0-9a-z]+$/i, ""));

                fs.writeFile(`${fontFilePath}.eot`, ttf2eot(input), (err) => writeFontFileCallback(err, `${fontFilePath}.eot`));
                fs.writeFile(`${fontFilePath}.svg`, ttf2svg(input), (err) => writeFontFileCallback(err, `${fontFilePath}.svg`));
                fs.writeFile(`${fontFilePath}.woff`, ttf2woff(input), (err) => writeFontFileCallback(err, `${fontFilePath}.woff`));
                fs.writeFile(`${fontFilePath}.woff2`, ttf2woff2(input), (err) => writeFontFileCallback(err, `${fontFilePath}.woff2`));

                function writeFontFileCallback(err, file) {
                    if (!err) {
                        console.log(colors.green(`Created: ${file}`));
                    }
                    else {
                        throw err;
                    }
                }
            });
        }
        else {
            throw err;
        }
    });
}

module.exports = webfontConverter;