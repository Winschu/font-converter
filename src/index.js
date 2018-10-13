const fs = require('fs');

const camelCase = require("camelcase");

const ttf2eot = require('ttf2eot');
const ttf2svg = require('ttf2svg');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');

function webfontConverter(path) {

    const fontPath = path; //Example: ./fonts/productSans/

    //clears all other files or old other font files from the directory
    fs.readdirSync(fontPath).forEach(file => {
        if(file.includes((".otf"))) {
            console.error("This converter can only convert the TTF file format");
        }
        if(!file.includes(".ttf")) {
            fs.unlink(fontPath + file, (err) => {
                if(!err) {
                    console.warn(`${file} removed from chosen directory`);
                }
                else {
                    throw err;
                }
            });
        }
    });

    if(fs.readdirSync(fontPath).length !== 0) {
        fs.readdirSync(fontPath).forEach(file => {
            const input = fs.readFileSync(fontPath + file);

            const fontFilePath = fontPath + camelCase(file.replace(/\.[0-9a-z]+$/i, ""));

            fs.writeFile(`${fontFilePath}.eot`, ttf2eot(input), (err) => writeFontFileCallback(err, `${fontFilePath}.eot`));
            fs.writeFile(`${fontFilePath}.svg`, ttf2svg(input), (err) => writeFontFileCallback(err, `${fontFilePath}.svg`));
            fs.writeFile(`${fontFilePath}.woff`, ttf2woff(input), (err) => writeFontFileCallback(err, `${fontFilePath}.woff`));
            fs.writeFile(`${fontFilePath}.woff2`, ttf2woff2(input), (err) => writeFontFileCallback(err, `${fontFilePath}.woff2`));

            function writeFontFileCallback(err, file) {
                if(!err) {
                    console.log(`Created: ${file}`);
                }
                else {
                    throw err;
                }
            }
        });
    }
    else {
        console.error("There are no files in this directory");
    }
}

module.exports = webfontConverter;