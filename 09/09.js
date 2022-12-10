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
const filePath = "C:/CodingProjects/AdventOfCode2022/09/input.txt";
const input = fs.readFileSync(filePath, "utf8").split("\r\n");
// type Coordinate = [number, number]
class Coordinate {
    constructor(pos) {
        this.pos = pos;
    }
    follow(leader) {
        let newPos = Array.from(this.pos);
        let xDiff = this.pos[0] - leader.pos[0];
        let yDiff = this.pos[1] - leader.pos[1];
        let totalDist = Math.abs(xDiff) + Math.abs(yDiff);
        if (xDiff < 0 && yDiff < 0 && totalDist > 2) {
            newPos[0]++;
            newPos[1]++;
        }
        else if (xDiff < 0 && yDiff > 0 && totalDist > 2) {
            newPos[0]++;
            newPos[1]--;
        }
        else if (xDiff > 0 && yDiff < 0 && totalDist > 2) {
            newPos[0]--;
            newPos[1]++;
        }
        else if (xDiff > 0 && yDiff > 0 && totalDist > 2) {
            newPos[0]--;
            newPos[1]--;
        }
        else if (xDiff < -1) {
            newPos[0]++;
        }
        else if (xDiff > 1) {
            newPos[0]--;
        }
        else if (yDiff < -1) {
            newPos[1]++;
        }
        else if (yDiff > 1) {
            newPos[1]--;
        }
        // console.log(leader.pos.join(), "moved.", this.pos.join(), ">", newPos.join())
        this.pos = newPos;
    }
}
class Command {
    constructor(input) {
        let i = input.split(' ');
        this.dir = i[0];
        this.dist = parseInt(i[1]);
        Command.totalDist += this.dist;
    }
}
Command.totalDist = 0;
class Rope {
    constructor(length) {
        this.head = new Coordinate([0, 0]);
        this.tail = [];
        this.visited = new Set(["0,0"]);
        this.moves = 0;
        while (this.tail.length < length) {
            this.tail.push(new Coordinate([0, 0]));
        }
    }
    move(command) {
        for (let x = command.dist; x > 0; x--) {
            switch (command.dir) {
                case "R":
                    this.head.pos[0]++;
                    break;
                case "L":
                    this.head.pos[0]--;
                    break;
                case "U":
                    this.head.pos[1]++;
                    break;
                case "D":
                    this.head.pos[1]--;
                    break;
                default:
                    throw new Error("Invalid direction");
            }
            this.moves++;
            for (let x in this.tail) {
                let y = parseInt(x);
                if (y == 0) {
                    this.tail[y].follow(this.head);
                }
                else {
                    this.tail[y].follow(this.tail[y - 1]);
                }
            }
            if (!this.visited.has(this.tail[this.tail.length - 1].pos.join())) {
                this.visited.add(this.tail[this.tail.length - 1].pos.join());
                console.log("New Pos:", this.tail[this.tail.length - 1].pos.join());
            }
        }
    }
}
let rope = new Rope(9);
input.forEach((val) => {
    rope.move(new Command(val));
    // let logString = rope.head.pos.join() + " | "
    // rope.tail.forEach((val) => logString += val.pos.join() + " | ")
    // console.log(logString)
});
console.log(rope.visited.size);
//# sourceMappingURL=09.js.map