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
const filePath = "C:/CodingProjects/AdventOfCode2022/04/input.txt";
const input = fs.readFileSync(filePath, "utf8").split("\r\n");
class Assignment {
    constructor(str) {
        let assign = str.split("-");
        let start = parseInt(assign[0]);
        let end = parseInt(assign[1]);
        let sect = [];
        for (let x = start; x <= end; x++) {
            sect.push(x);
        }
        this.sections = sect;
    }
}
class Pair {
    constructor(str) {
        let pair = str.split(',');
        this.elf1 = new Assignment(pair[0]);
        this.elf2 = new Assignment(pair[1]);
    }
    findOverlap() {
        let overlap = [];
        for (let x in this.elf1.sections) {
            if (this.elf2.sections.find((val1) => val1 === this.elf1.sections[x]) !== undefined) {
                overlap.push(this.elf1.sections[x]);
            }
        }
        return overlap;
    }
    isRedundant() {
        let overlap = this.findOverlap();
        if (overlap.length === this.elf1.sections.length ||
            overlap.length === this.elf2.sections.length) {
            return true;
        }
        else {
            return false;
        }
    }
}
//Part1
let full = 0;
let partial = 0;
for (let x in input) {
    let pair = new Pair(input[x]);
    let overlap = pair.findOverlap();
    if (pair.isRedundant()) {
        full++;
    }
    if (overlap.length > 0) {
        partial++;
    }
}
console.log("Pairs with full redundancy:", full);
console.log("Pairs with partial redundancy:", partial);
//# sourceMappingURL=04.js.map