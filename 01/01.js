"use strict";
//Take all elves, add their calories and add them to a map
//Sort the map by highest to lowest
//return the elf carrying highest calories
exports.__esModule = true;
//or
//Take all elves, add their calories and add them to an array
//Loop through the array to find the index of the highest calorie elf
//or
//Go through the list counting elves as you go
//Add the elf's calories. If it's the highest you've seen, log that count
//Logged count at the end is the highest calorie elf
var fs = require("fs");
function getGreedyElf(file) {
    var input = fs.readFileSync(file, "utf8");
    var greediestElf = {
        index: 0,
        calories: 0
    };
    var index = 0;
    var elfIndex = 1;
    var calCount = [];
    while (index < input.length) {
        var numStart = index;
        var numEnd = input.indexOf("\n");
        var num = parseInt(input.slice(numStart, numEnd));
        if (!isNaN(num)) {
            calCount.push(parseInt(input.slice(numStart, numEnd)));
        }
        else {
            var calTotal = calCount.reduce(function (val1, val2) { return val1 + val2; });
            if (calTotal > greediestElf.calories) {
                greediestElf.index = elfIndex;
                greediestElf.calories = calTotal;
            }
            console.log("Elf " + elfIndex + " has " + calTotal + " calories!");
            elfIndex++;
        }
        index = numEnd + 1;
    }
    return greediestElf.index;
}
console.log(getGreedyElf("C:/CodingProjects/AdventOfCode2022/01/testInput.txt"));
