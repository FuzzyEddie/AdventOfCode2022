"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const input = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "./input.txt"), "utf8").split("\r\n");
let signal = [[0, 0]];
input.forEach((val) => {
    let command = val.split(" ");
    const lastSig = signal.at(-1);
    let newSig = [0, 0];
    if (lastSig == undefined) {
        throw new Error("Could not get value of last signal");
    }
    switch (command[0]) {
        case "noop":
            signal.push([lastSig[0] + 1, lastSig[1]]);
            break;
        case "addx":
            signal.push([lastSig[0] + 1, lastSig[1]]);
            signal.push([lastSig[0] + 2, lastSig[1] + parseInt(command[1])]);
            break;
    }
});
//# sourceMappingURL=10.js.map