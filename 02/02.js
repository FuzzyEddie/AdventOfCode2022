"use strict";
exports.__esModule = true;
var fs = require("fs");
var filePath = "C:/CodingProjects/AdventOfCode2022/02/input.txt";
var input = fs.readFileSync(filePath, "utf8").split("\r\n");
var Choice = /** @class */ (function () {
    function Choice(x) {
        var _this = this;
        this.vs = function (x) {
            if (_this.act === x.act) {
                return 3;
            }
            else if (_this.act === 1) {
                if (x.act === 3) {
                    return 6;
                }
                else {
                    return 0;
                }
            }
            else if (_this.act === 2) {
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
        this.forOutcome = function (x) {
            if (x === 3) {
                return _this.act;
            }
            else if (x === 0) {
                if (_this.act === 1) {
                    return 3;
                }
                else if (_this.act === 2) {
                    return 1;
                }
                else {
                    return 2;
                }
            }
            else {
                if (_this.act === 1) {
                    return 2;
                }
                else if (_this.act === 2) {
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
    Choice.convertOutcome = function (x) {
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
    return Choice;
}());
function roundScore(me, them) {
    return me.vs(them) + me.act;
}
function roundScoreByResult(them, outcome) {
    return them.forOutcome(outcome) + outcome;
}
function getTotalScore1(input) {
    var score = 0;
    for (var x = 0; x < input.length; x++) {
        var round = input[x].split(" ");
        var them = new Choice(round[0]);
        var me = new Choice(round[1]);
        score += roundScore(me, them);
        console.log("Current score:", score);
    }
    return score;
}
function getTotalScore2(input) {
    var score = 0;
    for (var x = 0; x < input.length; x++) {
        var round = input[x].split(" ");
        console.log(round);
        var them = new Choice(round[0]);
        var outcome = Choice.convertOutcome(round[1]);
        score += roundScoreByResult(them, outcome);
    }
    console.log("Current score:", score);
    return score;
}
// console.log(getTotalScore1(input))
console.log(getTotalScore2(input));
