import {
    blue as blueColor,
    green as greenColor,
    rainbow as rainbowColor,
    red as redColor,
    yellow as yellowColor
} from "colors";

interface ConsoleOutput extends Function {
    (text: string): void
}

export const consoleError: ConsoleOutput = (text: string): void => {
    console.error(redColor(text));
};

export const consoleErrorCode = (err: NodeJS.ErrnoException) => {
    consoleError(`An error happened: ${err.code}`);
};

export const consoleWarning: ConsoleOutput = (text: string): void => {
    console.warn(yellowColor(text));
};

export const consoleSuccess: ConsoleOutput = (text: string): void => {
    console.log(greenColor(text));
};

export const consoleInfo: ConsoleOutput = (text: string): void => {
    console.log(blueColor(text));
};

export const consoleSpecial: ConsoleOutput = (text: string): void => {
    console.log(rainbowColor(text));
};

export const checkOnError = (err: NodeJS.ErrnoException): boolean => {
    if (!err) {
        return true;
    }
    consoleError(`An error happened: ${err.code}`);
    throw err;
};
