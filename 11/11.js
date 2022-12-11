"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const input = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "./testinput.txt"), "utf8").split("\r\n");
class Monkey {
    /*
    Arguments provided as an array of 5 strings:
    Starting items: 79, 98
    Operation: new = old * 19
    Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3
    */
    constructor(input) {
        this.mBuis = 0;
        //Parsing starting items
        let items = input[0].replace("Starting items: ", "").split(", ");
        this.items = items.map((x) => BigInt(parseInt(x)));
        //Building inspect method
        let opStr = input[1].replace("Operation: new = old ", "").split(" ");
        if (opStr[1] !== "old") {
            opStr[1] = "BigInt(" + opStr[1] + ")";
        }
        this.inspect = new Function("old", `
      this.mBuis++
      this.items[0] = old ${opStr[0]} ${opStr[1]}`);
        //Building throw method
        let test = BigInt(parseInt(input[2].replace("Test: divisible by ", "")));
        let ifTrue = parseInt(input[3].replace("If true: throw to monkey ", ""));
        let ifFalse = parseInt(input[4].replace("If false: throw to monkey ", ""));
        this.throwTo = new Function(`
      let item = this.items[0]
      console.log(this.items[0], "${test}", item % ${test})
      if (item % ${test} == 0)
      {
        return ${ifTrue}
      }
      else
      {
        return ${ifFalse}
      }`);
    }
}
class Troop {
    constructor(input) {
        this.monkeys = [];
        for (let x in input) {
            if (input[x].startsWith("Monkey")) {
                let y = parseInt(x);
                this.monkeys.push(new Monkey(input.slice(y + 1, y + 6)));
            }
        }
    }
}
let troop = new Troop(input);
const rounds = 10000;
const knownRounds = [1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
for (let t = 0; t < rounds; t++) {
    if (knownRounds.includes(t)) {
        debugger;
    }
    troop.monkeys.forEach((monkey) => {
        while (monkey.items.length > 0) {
            monkey.inspect(monkey.items[0]);
            // monkey.items[0] = Math.floor(monkey.items[0] / 3)
            troop.monkeys[monkey.throwTo()].items.push(monkey.items[0]);
            monkey.items.shift();
        }
    });
}
// troop.monkeys.sort((a, b) => b.mBuis - a.mBuis)
// let totalMbuis = troop.monkeys[0].mBuis * troop.monkeys[1].mBuis
debugger;
//# sourceMappingURL=11.js.map