import {ByteBuffer} from "microbuffer";

declare module "ttf2woff2" {
    export function ttf2woff2(input: Buffer): ByteBuffer
}