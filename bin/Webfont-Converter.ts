#!/usr/bin/env node
import {parse} from "yargs";
import {WebfontConverter} from "../src";

const argv = parse();

if (argv.p) {
    new WebfontConverter(argv.p);
}

if (argv.path) {
    new WebfontConverter(argv.path);
}
