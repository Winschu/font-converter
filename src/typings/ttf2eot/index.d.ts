import {ByteBuffer} from "microbuffer";

declare module "ttf2eot" {
    export function ttf2eot(input: Buffer): ByteBuffer
}