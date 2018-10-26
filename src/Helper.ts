import {
    blue as blueColor,
    green as greenColor,
    rainbow as rainbowColor,
    red as redColor,
    yellow as yellowColor
} from "colors";

export function consoleError(text: string): void {
    console.error(redColor(text));
}

export function consoleWarning(text: string): void {
    console.warn(yellowColor(text));
}

export function consoleSuccess(text: string): void {
    console.log(greenColor(text));
}

export function consoleInfo(text: string): void {
    console.log(blueColor(text));
}

export function consoleSpecial(text: string): void {
    console.log(rainbowColor(text));
}
