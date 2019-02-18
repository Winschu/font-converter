#!/usr/bin/env node
import {parse} from "yargs";
import {WebfontConverter} from "../src";

const argv = parse();

if (argv.p && argv.p.length > 0) {
    if(argv.p.toString().length > 0) {
        new WebfontConverter(argv.p.toString());
    }
    else {
        console.error("Wrong path!");
    }
}
else {
    console.log("Path has to be a string!");
}
