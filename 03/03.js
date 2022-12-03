"use strict";
exports.__esModule = true;
var fs = require("fs");
var filePath = "C:/CodingProjects/AdventOfCode2022/03/input.txt";
var input = fs.readFileSync(filePath, "utf8").split("\r\n");
var Rucksack = /** @class */ (function () {
    function Rucksack(x) {
        this.allContents = x.split("");
        this.compartment1 = x.slice(0, x.length / 2);
        this.compartment2 = x.slice(x.length / 2, x.length);
    }
    Rucksack.getPriority = function (x) {
        var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return str.indexOf(x) + 1;
    };
    Rucksack.prototype.findError = function () {
        var comp1 = this.compartment1.split("");
        var comp2 = this.compartment2.split("");
        var err = 0;
        comp1.forEach(function (val1) {
            if (comp2.some(function (val2) { return val1 === val2; })) {
                err = Rucksack.getPriority(val1);
            }
        });
        return err;
    };
    Rucksack.prototype.findBadge = function (ruck2, ruck3) {
        var sack1 = this.allContents;
        var sack2 = ruck2.allContents;
        var sack3 = ruck3.allContents;
        for (var item1 in sack1) {
            for (var item2 in sack2) {
                if (sack1[item1] === sack2[item2]) {
                    for (var item3 in sack3) {
                        if (sack2[item2] === sack3[item3]) {
                            return Rucksack.getPriority(sack3[item3]);
                        }
                    }
                }
            }
        }
        return 0;
    };
    return Rucksack;
}());
var total = 0;
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
var badgeTotal = 0;
for (var x = 0; x < input.length; x = x + 3) {
    var sack1 = new Rucksack(input[x]);
    var sack2 = new Rucksack(input[x + 1]);
    var sack3 = new Rucksack(input[x + 2]);
    var badge = sack1.findBadge(sack2, sack3);
    console.log("Badge:", badge);
    badgeTotal += badge;
}
console.log("Badge Total:", badgeTotal);
