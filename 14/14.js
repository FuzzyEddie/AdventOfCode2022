"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const input = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "./input.txt"), "utf8").split("\r\n");
class Cave {
    constructor(input) {
        this.bottom = 0;
        this.walls = new Set();
        this.sand = new Set();
        for (let line of input) {
            let points = line.split(" ")
                .filter(x => x !== "->")
                .map(x => x.split(",")
                .map(x => parseInt(x)));
            for (let x = 0; x < points.length - 1; x++) {
                let from = points[x];
                let to = points[x + 1];
                this.walls.add(from.join());
                let xDiff = to[0] - from[0];
                let yDiff = to[1] - from[1];
                let xDelta = xDiff == 0 ? 0 : xDiff / Math.abs(xDiff);
                let yDelta = yDiff == 0 ? 0 : yDiff / Math.abs(yDiff);
                do {
                    if (from[1] > this.bottom)
                        this.bottom = from[1];
                    from[0] += xDelta;
                    from[1] += yDelta;
                    this.walls.add(from.join());
                } while (from.join() !== to.join());
            }
        }
    }
    isEmpty(coords) {
        return (!this.sand.has(coords.join()) && !this.walls.has(coords.join()) && coords[1] !== this.bottom + 2);
    }
    dropSand() {
        let pos = [500, 0];
        while (true) {
            let down = [pos[0], pos[1] + 1];
            let downLeft = [pos[0] - 1, pos[1] + 1];
            let downRight = [pos[0] + 1, pos[1] + 1];
            if (this.isEmpty(down)) {
                pos = down;
                continue;
            }
            else if (this.isEmpty(downLeft)) {
                pos = downLeft;
                continue;
            }
            else if (this.isEmpty(downRight)) {
                pos = downRight;
                continue;
            }
            else {
                if (this.sand.has(pos.join())) {
                    return false;
                }
                else {
                    this.sand.add(pos.join());
                    return true;
                }
            }
        }
    }
}
let cave = new Cave(input);
let hasRoom = true;
while (hasRoom == true) {
    hasRoom = cave.dropSand();
}
console.log(cave.sand.size);
//# sourceMappingURL=14.js.map