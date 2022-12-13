"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const input = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "./input.txt"), "utf8").split("\r\n");
class Node {
    constructor(x, y, val) {
        this.type = Node;
        this.dist = Infinity;
        this.prev = new Set();
        this.goal = false;
        this.loc = [x, y];
        const elev = "abcdefghijklmnopqrstuvwxyz";
        if (val == "E")
            this.goal = true;
        if (val == "S")
            this.val = 1;
        else if (val == "E")
            this.val = 26;
        else
            this.val = elev.indexOf(val) + 1;
    }
}
class Landscape {
    constructor(input) {
        this.start = [0, 0];
        this.visited = new Set;
        let g = input.map((x) => x.split(""));
        let nodes = [];
        for (let y in g) {
            let nodes2 = [];
            for (let x in g[y]) {
                if (g[y][x] == "S")
                    this.start = [parseInt(x), parseInt(y)];
                nodes2.push(new Node(parseInt(x), parseInt(y), g[y][x]));
            }
            nodes.push(nodes2);
        }
        this.grid = nodes;
    }
    getNode(c) { return this.grid[c[1]][c[0]]; }
    wasVisited(c) {
        if (c instanceof Node)
            return this.visited.has(c.loc.join());
        else
            return this.visited.has(c.join());
    }
    getValidNeighbors(c) {
        const maxW = this.grid[0].length;
        const maxH = this.grid.length;
        let loc = c.loc;
        let nodes = [];
        //Check Up
        if (loc[1] - 1 >= 0 && !this.wasVisited([loc[0], loc[1] - 1])) {
            let up = this.getNode([loc[0], loc[1] - 1]);
            if (up.val - c.val <= 1) {
                up.prev = c.prev;
                up.prev.add(c.loc.join());
                nodes.push(up);
            }
        }
        //Check Down
        if (loc[1] + 1 < maxH && !this.wasVisited([loc[0], loc[1] + 1])) {
            let down = this.getNode([loc[0], loc[1] + 1]);
            if (down.val - c.val <= 1) {
                down.prev = c.prev;
                down.prev.add(c.loc.join());
                nodes.push(down);
            }
        }
        //Check Left
        if (loc[0] - 1 >= 0 && !this.wasVisited([loc[0] - 1, loc[1]])) {
            let left = this.getNode([loc[0] - 1, loc[1]]);
            if (left.val - c.val <= 1) {
                left.prev = c.prev;
                left.prev.add(c.loc.join());
                nodes.push(left);
            }
        }
        //Check Right
        if (loc[0] + 1 < maxW && !this.wasVisited([loc[0] + 1, loc[1]])) {
            let right = this.getNode([loc[0] + 1, loc[1]]);
            if (right.val - c.val <= 1) {
                right.prev = c.prev;
                right.prev.add(c.loc.join());
                nodes.push(right);
            }
        }
        return nodes;
    }
    findGoal() {
        let goal;
        let steps = 0;
        let children = new Set();
        children.add(this.getNode(this.start));
        while (goal == undefined) {
            steps++;
            console.log(steps);
            let newChildren = new Set();
            for (let node of children) {
                if (node.goal == true) {
                    goal = node;
                    break;
                }
                else {
                    this.visited.add(node.loc.join());
                    let near = this.getValidNeighbors(node);
                    near.forEach((n) => newChildren.add(n));
                }
            }
            children = newChildren;
        }
        return goal;
    }
    findTrail() {
        let goal;
        let steps = 0;
        let children = new Set();
        for (let blah in this.grid) {
            for (let nah of this.grid[blah]) {
                if (nah.val == 1)
                    children.add(nah);
            }
        }
        children.add(this.getNode(this.start));
        while (goal == undefined) {
            steps++;
            console.log(steps);
            let newChildren = new Set();
            for (let node of children) {
                if (node.goal == true) {
                    goal = node;
                    break;
                }
                else {
                    this.visited.add(node.loc.join());
                    let near = this.getValidNeighbors(node);
                    near.forEach((n) => newChildren.add(n));
                }
            }
            children = newChildren;
        }
        return goal;
    }
}
let landscape = new Landscape(input);
let goal = landscape.findGoal();
// let goal = landscape.findTrail()
console.log(goal.prev.size);
//# sourceMappingURL=12.js.map