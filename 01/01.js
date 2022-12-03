"use strict";
//Take all elves, add their calories and add them to a map
//Sort the map by highest to lowest
//return the elf carrying highest calories
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
//or
//Take all elves, add their calories and add them to an array
//Loop through the array to find the index of the highest calorie elf
//or
//Go through the list counting elves as you go
//Add the elf's calories. If it's the highest you've seen, log that count
//Logged count at the end is the highest calorie elf
const fs = __importStar(require("fs"));
const filePath = "C:/CodingProjects/AdventOfCode2022/01/input.txt";
function getGreedyElf(file) {
    const input = fs.readFileSync(file, "utf8");
    const greediestElf = {
        index: 0,
        calories: 0
    };
    let index = 0;
    let elfIndex = 1;
    let calCount = [];
    do {
        let numStart = index;
        let numEnd = input.indexOf("\n", index);
        let num = parseInt(input.slice(numStart, numEnd));
        if (!isNaN(num)) {
            calCount.push(parseInt(input.slice(numStart, numEnd)));
        }
        else {
            let calTotal = calCount.reduce((val1, val2) => val1 + val2);
            console.log("Elf " + elfIndex + " has " + calTotal + " calories!");
            if (calTotal > greediestElf.calories) {
                greediestElf.index = elfIndex;
                greediestElf.calories = calTotal;
            }
            calCount = [];
            elfIndex++;
        }
        index = numEnd + 1;
    } while (index < input.length);
    return greediestElf;
}
function topThreeElves(file) {
    const input = fs.readFileSync(file, "utf8");
    let topThree = [0, 0, 0];
    let index = 0;
    let elfIndex = 1;
    let calCount = [];
    do {
        let numStart = index;
        let numEnd = input.indexOf("\n", index);
        let num = parseInt(input.slice(numStart, numEnd));
        if (!isNaN(num)) {
            calCount.push(parseInt(input.slice(numStart, numEnd)));
        }
        else {
            let calTotal = calCount.reduce((val1, val2) => val1 + val2);
            console.log("Elf " + elfIndex + " has " + calTotal + " calories!", elfIndex);
            for (let x = 0; x < 3; x++) {
                if (calTotal > topThree[x]) {
                    topThree[x] = calTotal;
                    topThree.sort();
                    break;
                }
            }
            calCount = [];
            elfIndex++;
        }
        index = numEnd + 1;
    } while (index < input.length);
    return topThree;
}
// let greediestElf = getGreedyElf(filePath)
let topThreeTotal = topThreeElves(filePath).reduce((val1, val2) => val1 + val2);
console.log("Top three elves have", topThreeTotal);
//# sourceMappingURL=01.js.map