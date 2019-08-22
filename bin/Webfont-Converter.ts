#!/usr/bin/env node
import {parse} from "yargs";
import {WebfontConverter} from "../src";

const argv = parse();

const command = Object.keys(argv)[1];

if (argv[command] && argv[command].length > 0) {
    console.log(argv[command]);
    if(argv[command].toString().length > 0) {
        new WebfontConverter(argv[command].toString());
    }
    else {
        console.error("Wrong path!");
    }
}
else {
    console.log("Path has to be a string!");
}
