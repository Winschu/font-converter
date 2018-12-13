#!/usr/bin/env node
const argv = require('yargs').parse();

import {WebfontConverter} from "../src";

if (argv.p) {
    new WebfontConverter(argv.p);
}

if (argv.path) {
    new WebfontConverter(argv.path);
}
