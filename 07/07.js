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
const filePath = "C:/CodingProjects/AdventOfCode2022/07/testinput.txt";
const input = fs.readFileSync(filePath, "utf8").split("\r\n");
class FileSystem {
    constructor(input) {
        this.root = new Node("/", "dir");
        this.pointer = ["/"];
        this.i = 1;
        this.next = () => {
            this.i++;
            if (this.i < this.commands.length) {
                this.current = this.commands[this.i].split(" ");
            }
            else {
                this.current = ["$"];
            }
            return this;
        };
        this.execute = () => {
            switch (this.current[1]) {
                case "cd":
                    if (this.current[2] == "..") {
                        this.pointer.pop();
                    }
                    else {
                        this.pointer.push(this.current[2]);
                    }
                    this.next();
                    return this;
                case "ls":
                    this.next();
                    while (this.current[0] !== "$") {
                        //Make a new node and add it to the systemTree
                        let base = this.getNodeAt(this.pointer.join(",").split(","));
                        let nodeType = "file";
                        if (this.current[0] === "dir")
                            nodeType = "dir";
                        let node = new Node(this.current[1], nodeType, parseInt(this.current[0]));
                        base.appendNode(node);
                        //Move the command to the next line
                        this.next();
                    }
                    return this;
                default:
                    return this;
            }
        };
        this.commands = input;
        this.current = this.commands[1].split(" ");
    }
    getNodeAt(pointer, node = this.root) {
        if (pointer.length == 1 && pointer[0] == node.name)
            return node;
        for (let x in node.children) {
            if (node.children[x].name === pointer[1]) {
                pointer.shift();
                return this.getNodeAt(pointer, node.children[x]);
            }
        }
        throw new Error("Null pointer exception! Oh no!");
    }
    init() {
        for (let x = 0; x < this.commands.length; x++) {
            this.execute();
        }
    }
}
class Node {
    constructor(name, type, size) {
        this.size = 0;
        this.parent = null;
        this.children = [];
        this.name = name;
        this.type = type;
        if (size)
            this.size = size;
    }
    appendNode(node) {
        node.parent = this;
        this.children.push(node);
    }
    updateSize() {
        let totalSize = 0;
        this.children.forEach((node) => {
            if (node.children.length > 0) {
                totalSize += node.updateSize();
            }
            else {
                totalSize += node.size;
            }
        });
        this.size = totalSize;
        return totalSize;
    }
}
function underLimit(count = 0, node, limit) {
    if (node.type === "dir") {
        if (node.size < limit) {
            count += node.size;
        }
        for (let x in node.children) {
            if (node.children[x].type === "dir")
                count = underLimit(count, node.children[x], limit);
        }
    }
    return count;
}
function dirDeleteSize(fileSys) {
    var smallest = 0;
    const limit = fileSys.root.size - 40000000;
    let findDir = (node) => {
        node.children.forEach((n) => {
            if (n.type === "dir") {
                let diff = n.size - limit;
                console.log(n.size, "-", limit, "=", diff);
                if (diff > 0 && n.size < smallest) {
                    smallest = n.size;
                }
                findDir(n);
            }
        });
    };
    findDir(fileSys.root);
    return smallest;
}
let fileSys = new FileSystem(input);
fileSys.init();
console.log(fileSys.root.updateSize());
console.log(underLimit(0, fileSys.root, 100000));
console.log(dirDeleteSize(fileSys));
//# sourceMappingURL=07.js.map