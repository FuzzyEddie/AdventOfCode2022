"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const filePath = "C:/CodingProjects/AdventOfCode2022/09/testinput.txt";
const input = fs.readFileSync(filePath, "utf8").split("\r\n");
class Rope {
    constructor() {
        this.head = [0, 0];
        this.tail = [0, 0];
        this.visited = new Set("0,0");
    }
    move(command) {
        for (let x = command.dist; x > 0; x--) {
            let oldPos = Array.from(this.head);
            switch (command.dir) {
                case "R":
                    this.head = [this.head[0] + 1, this.head[1]];
                    break;
                case "L":
                    this.head = [this.head[0] - 1, this.head[1]];
                    break;
                case "U":
                    this.head = [this.head[0], this.head[1] + 1];
                    break;
                case "D":
                    this.head = [this.head[0], this.head[1] - 1];
                    break;
                default:
                    throw new Error("Invalid direction");
            }
            if (Math.abs(this.head[0] - this.tail[0]) > 1 || Math.abs(this.head[1] - this.tail[1]) > 1) {
                this.tail = oldPos;
                this.visited.add(oldPos.join());
            }
        }
    }
}
class Command {
    constructor(input) {
        this.dir = input.charAt(0);
        this.dist = parseInt(input.charAt(2));
    }
}
let rope = new Rope();
input.forEach((val) => {
    rope.move(new Command(val));
});
console.log(rope.visited.size);
//# sourceMappingURL=09.js.map