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
const filePath = "C:/CodingProjects/AdventOfCode2022/03/input.txt";
const input = fs.readFileSync(filePath, "utf8").split("\r\n");
class Rucksack {
    constructor(x) {
        this.allContents = x;
        this.compartment1 = x.slice(0, x.length / 2);
        this.compartment2 = x.slice(x.length / 2, x.length);
    }
    static getPriority(x) {
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return str.indexOf(x) + 1;
    }
    findError() {
        let comp1 = this.compartment1.split("");
        let comp2 = this.compartment2.split("");
        let err = 0;
        comp1.forEach((val1) => {
            if (comp2.some((val2) => val1 === val2)) {
                err = Rucksack.getPriority(val1);
            }
        });
        return err;
    }
    findBadge(ruck2, ruck3) {
        let sack1 = this.allContents.split("");
        let sack2 = ruck2.allContents;
        let sack3 = ruck3.allContents;
        for (let item1 in sack1) {
            let x = sack2.indexOf(sack1[item1]);
            let y = sack3.indexOf(sack1[item1]);
            if (x > -1 && y > -1) {
                return Rucksack.getPriority(sack1[item1]);
            }
        }
        return 0;
    }
}
let total = 0;
/* //Part1
for (let sack in input)
{
    let rucksack = new Rucksack(input[sack])
    let err = rucksack.findError()
    console.log("Errors:", err)
    total += err
}

console.log("Errors total:", total) */
//Part2
let badgeTotal = 0;
for (let x = 0; x < input.length; x = x + 3) {
    let sack1 = new Rucksack(input[x]);
    let sack2 = new Rucksack(input[x + 1]);
    let sack3 = new Rucksack(input[x + 2]);
    let badge = sack1.findBadge(sack2, sack3);
    console.log("Badge:", badge);
    badgeTotal += badge;
}
console.log("Badge Total:", badgeTotal);
//# sourceMappingURL=03.js.map