import {ByteBuffer} from "microbuffer";

declare module "ttf2woff" {
    export function ttf2woff(input: Buffer): ByteBuffer
}