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
const filePath = "C:/CodingProjects/AdventOfCode2022/05/input.txt";
const input = fs.readFileSync(filePath, "utf8").split("\r\n");
let stacksEnd = input.findIndex((val) => val === "") - 1;
class Storage {
    constructor(input, stacksEnd) {
        let stack = [];
        //Get the number of stacks
        let numStacks = (input[0].length + 1) / 4;
        //Add the correct number of empty stacks
        for (let x = 0; x < numStacks; x++) {
            let currentStack = [];
            for (let y = stacksEnd - 1; y >= 0; y--) {
                let char = input[y].charAt((x * 4) + 1);
                if (char !== " ") {
                    currentStack.push(char);
                }
            }
            stack.push(currentStack);
        }
        this.stacks = stack;
        console.log("Storage initialized:");
        for (let x in stack) {
            let str = "";
            for (let y in stack[x])
                str += stack[x][y];
            console.log(x, str);
        }
    }
    exOrder9000(order) {
        {
            if (order.amount > this.stacks[order.from].length) {
                order.amount = this.stacks[order.from].length;
            }
            for (let x = 0; x < order.amount; x++) {
                this.stacks[order.to].push(this.stacks[order.from].pop());
            }
        }
    }
    exOrder9001(order) {
        {
            if (order.amount > this.stacks[order.from].length) {
                order.amount = this.stacks[order.from].length;
            }
            for (let x = order.amount - 1; x >= 0; x--) {
                this.stacks[order.to].push(this.stacks[order.from][this.stacks[order.from].length - 1 - x]);
            }
            for (let x = 0; x < order.amount; x++) {
                this.stacks[order.from].pop();
            }
        }
    }
}
class Order {
    constructor(input) {
        let x = input.split(' ');
        this.amount = parseInt(x[1]);
        this.from = parseInt(x[3]) - 1;
        this.to = parseInt(x[5]) - 1;
    }
}
let storage = new Storage(input, stacksEnd);
for (let x = stacksEnd + 2; x < input.length; x++) {
    let order = new Order(input[x]);
    storage.exOrder9001(order);
}
for (let stack in storage.stacks) {
    if (storage.stacks[stack].length > 0) {
        console.log("Stack", stack, ":", storage.stacks[stack][storage.stacks[stack].length - 1]);
    }
    else {
        console.log("Stack", stack, ":", "is empty.");
    }
}
//# sourceMappingURL=05.js.map