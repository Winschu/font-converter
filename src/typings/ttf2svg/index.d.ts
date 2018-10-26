import {ByteBuffer} from "microbuffer";

declare module "ttf2svg" {
    export function ttf2svg(input: Buffer): ByteBuffer
}