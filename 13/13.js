"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const input = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "./input.txt"), "utf8").split("\r\n");
let signal = [];
for (let line of input) {
    if (line.length > 1) {
        let f = new Function("return " + line);
        signal.push(f());
    }
}
var val;
(function (val) {
    val[val["false"] = 1] = "false";
    val[val["true"] = -1] = "true";
    val[val["dnd"] = 0] = "dnd";
})(val || (val = {}));
function isNum(x) { return typeof x === "number"; }
//Did not work
// function compare(left: any[], right: any[]): val
// {
//   // console.log("Comparing", left.join(), "and", right.join())
//   if (left.length == 0 && right.length > 0) return val.true
//   if (left.length > 0 && right.length == 0) return val.false
//   if (left.length == 0 && right.length == 0) return val.dnd
//   let l = left.shift()
//   let r = right.shift()
//   if (isNum(l) && isNum(r))
//   {
//     if (l < r) return val.true
//     else if (l > r) return val.false
//     else if (left.length > 0 || right.length > 0) return compare(left, right)
//     else return val.dnd
//   }
//   else
//   {
//     if (isNum(l)) l = [l]
//     if (isNum(r)) r = [r]
//     //This is specifically for empty arrays in the input
//     if (l.length == 0 && r.length > 0) return val.true
//     if (l.length > 0 && r.length == 0) return val.false
//     let test = val.dnd
//     while(l.length > 0 && r.length > 0) {
//       test = compare(l, r)
//     }
//     return test
//   }
// }
function compare2(left, right) {
    for (let x = 0; x < left.length; x++) {
        if (right[x] !== undefined) {
            let l = left[x];
            let r = right[x];
            if (isNum(l) && isNum(r)) {
                if (l < r)
                    return val.true;
                if (l > r)
                    return val.false;
                else
                    continue;
            }
            else {
                if (isNum(l))
                    l = [l];
                if (isNum(r))
                    r = [r];
                let test = compare2(l, r);
                if (test === val.dnd)
                    continue;
                else
                    return test;
            }
        }
        else {
            return val.false;
        }
    }
    if (left.length < right.length)
        return val.true;
    return val.dnd;
}
// Part 1
let correctPairs = [];
let checked = 0;
for (let x = 0; x < signal.length; x += 2) {
    let outcome = compare2(signal[x], signal[x + 1]);
    if (outcome === val.true) {
        correctPairs.push(x / 2 + 1);
    }
    else if (outcome === val.dnd) {
        throw new Error("Could not determine outcome at index " + x);
    }
    checked++;
}
console.log("Checked", checked, "pairs");
// console.log(correctPairs.join())
console.log(correctPairs.reduce((x, y) => x + y));
//Part 2
let cleanSignal = signal.filter(line => line !== "");
cleanSignal.push([[2]]);
cleanSignal.push([[6]]);
cleanSignal.sort(compare2);
let two = cleanSignal.findIndex((line) => {
    if (line.length == 1) {
        if (line[0].length == 1) {
            if (line[0] == 2)
                return true;
        }
        else
            return false;
    }
}) + 1;
let six = cleanSignal.findIndex((line) => {
    if (line.length == 1) {
        if (line[0].length == 1) {
            if (line[0] == 6)
                return true;
        }
        else
            return false;
    }
}) + 1;
console.log(two, six, two * six);
//# sourceMappingURL=13.js.map