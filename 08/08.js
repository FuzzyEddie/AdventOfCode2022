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
const filePath = "C:/CodingProjects/AdventOfCode2022/08/input.txt";
const input = fs.readFileSync(filePath, "utf8").split("\r\n");
class Orchard {
    constructor(input) {
        this.trees = input;
    }
    treeVal(coords) {
        return parseInt(this.trees[coords[1]].charAt(coords[0]));
    }
    isVisible(origin, ...dirs) {
        let height = this.treeVal(origin);
        if (dirs[0] === 4 /* Cards.ALL */) {
            dirs = [
                0 /* Cards.NORTH */,
                2 /* Cards.SOUTH */,
                1 /* Cards.EAST */,
                3 /* Cards.WEST */,
            ];
        }
        heightCheck: for (let x in dirs) {
            switch (dirs[x]) {
                case 0 /* Cards.NORTH */:
                    if (origin[1] == 0)
                        return true;
                    for (let y = origin[1] - 1; y >= 0; y--) {
                        if (this.treeVal([origin[0], y]) >= height)
                            continue heightCheck;
                    }
                    return true;
                case 1 /* Cards.EAST */:
                    if (origin[0] == this.trees[0].length - 1)
                        return true;
                    for (let y = origin[0] + 1; y < this.trees[0].length; y++) {
                        if (this.treeVal([y, origin[1]]) >= height)
                            continue heightCheck;
                    }
                    return true;
                case 2 /* Cards.SOUTH */:
                    if (origin[1] == this.trees.length - 1)
                        return true;
                    for (let y = origin[1] + 1; y < this.trees.length; y++) {
                        if (this.treeVal([origin[0], y]) >= height)
                            continue heightCheck;
                    }
                    return true;
                case 3 /* Cards.WEST */:
                    if (origin[0] == 0)
                        return true;
                    for (let y = origin[0] - 1; y >= 0; y--) {
                        if (this.treeVal([y, origin[1]]) >= height)
                            continue heightCheck;
                    }
                    return true;
            }
        }
        return false;
    }
    score(origin, ...dirs) {
        let height = this.treeVal(origin);
        let score = 1;
        let count = 1;
        if (dirs[0] === 4 /* Cards.ALL */) {
            dirs = [
                0 /* Cards.NORTH */,
                2 /* Cards.SOUTH */,
                1 /* Cards.EAST */,
                3 /* Cards.WEST */,
            ];
        }
        heightCheck: for (let x in dirs) {
            switch (dirs[x]) {
                case 0 /* Cards.NORTH */:
                    if (origin[1] == 0)
                        return 0;
                    for (let y = origin[1] - 1; y >= 0; y--) {
                        if (this.treeVal([origin[0], y]) >= height || y == 0) {
                            score *= count;
                            count = 1;
                            continue heightCheck;
                        }
                        count++;
                    }
                case 1 /* Cards.EAST */:
                    if (origin[0] == this.trees[0].length - 1)
                        return 0;
                    for (let y = origin[0] + 1; y < this.trees[0].length; y++) {
                        if (this.treeVal([y, origin[1]]) >= height || y == this.trees[0].length - 1) {
                            score *= count;
                            count = 1;
                            continue heightCheck;
                        }
                        count++;
                    }
                case 2 /* Cards.SOUTH */:
                    if (origin[1] == this.trees.length - 1)
                        return 0;
                    for (let y = origin[1] + 1; y < this.trees.length; y++) {
                        if (this.treeVal([origin[0], y]) >= height || y == this.trees.length - 1) {
                            score *= count;
                            count = 1;
                            continue heightCheck;
                        }
                        count++;
                    }
                case 3 /* Cards.WEST */:
                    if (origin[0] == 0)
                        return 0;
                    for (let y = origin[0] - 1; y >= 0; y--) {
                        if (this.treeVal([y, origin[1]]) >= height || y == 0) {
                            score *= count;
                            count = 1;
                            continue heightCheck;
                        }
                        count++;
                    }
            }
        }
        return score;
    }
}
let orchard = new Orchard(input);
let visible = 0;
for (let x = 0; x < orchard.trees.length; x++) {
    for (let y = 0; y < orchard.trees[x].length; y++) {
        if (orchard.isVisible([x, y], 4 /* Cards.ALL */)) {
            visible++;
        }
    }
}
console.log(visible);
let highScore = 0;
for (let x = 0; x < orchard.trees.length; x++) {
    for (let y = 0; y < orchard.trees[x].length; y++) {
        let score = orchard.score([x, y], 4 /* Cards.ALL */);
        if (score > highScore) {
            highScore = score;
        }
    }
}
console.log(highScore);
//# sourceMappingURL=08.js.map