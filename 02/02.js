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
const filePath = "C:/CodingProjects/AdventOfCode2022/02/input.txt";
const input = fs.readFileSync(filePath, "utf8").split("\r\n");
class Choice {
    constructor(x) {
        this.vs = (x) => {
            if (this.act === x.act) {
                return 3;
            }
            else if (this.act === 1) {
                if (x.act === 3) {
                    return 6;
                }
                else {
                    return 0;
                }
            }
            else if (this.act === 2) {
                if (x.act === 1) {
                    return 6;
                }
                else {
                    return 0;
                }
            }
            else {
                if (x.act === 2) {
                    return 6;
                }
                else {
                    return 0;
                }
            }
        };
        this.forOutcome = (x) => {
            if (x === 3) {
                return this.act;
            }
            else if (x === 0) {
                if (this.act === 1) {
                    return 3;
                }
                else if (this.act === 2) {
                    return 1;
                }
                else {
                    return 2;
                }
            }
            else {
                if (this.act === 1) {
                    return 2;
                }
                else if (this.act === 2) {
                    return 3;
                }
                else {
                    return 1;
                }
            }
        };
        if (x === "A" || x === "X") {
            this.act = 1;
        }
        else if (x === "B" || x === "Y") {
            this.act = 2;
        }
        else if (x === "C" || x === "Z") {
            this.act = 3;
        }
        else {
            throw new Error("Invalid argument for Choice constuctor: " + x);
        }
    }
}
Choice.convertOutcome = (x) => {
    if (x === "X") {
        return 0;
    }
    else if (x === "Y") {
        return 3;
    }
    else if (x === "Z") {
        return 6;
    }
    else {
        throw new Error("Invalid outcome argument: " + x);
    }
};
function roundScore(me, them) {
    return me.vs(them) + me.act;
}
function roundScoreByResult(them, outcome) {
    return them.forOutcome(outcome) + outcome;
}
function getTotalScore1(input) {
    let score = 0;
    for (let x = 0; x < input.length; x++) {
        let round = input[x].split(" ");
        let them = new Choice(round[0]);
        let me = new Choice(round[1]);
        score += roundScore(me, them);
        console.log("Current score:", score);
    }
    return score;
}
function getTotalScore2(input) {
    let score = 0;
    for (let x = 0; x < input.length; x++) {
        let round = input[x].split(" ");
        console.log(round);
        let them = new Choice(round[0]);
        let outcome = Choice.convertOutcome(round[1]);
        score += roundScoreByResult(them, outcome);
    }
    console.log("Current score:", score);
    return score;
}
// console.log(getTotalScore1(input))
console.log(getTotalScore2(input));
//# sourceMappingURL=02.js.map