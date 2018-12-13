import {ByteBuffer} from "microbuffer";

declare module "ttf2eot" {
    function ttf2eot(input: Buffer): ByteBuffer
}