import * as fs from "fs"
const filePath = "C:/CodingProjects/AdventOfCode2022/07/input.txt"
const input = fs.readFileSync(filePath, "utf8").split("\r\n")

class FileSystem
{
    commands: string[] 
    current: string[]
    root = new Node("/", "dir")
    pointer: string[] = ["/"]
    i = 1
    
    constructor(input: string[])
    {
        this.commands = input
        this.current = this.commands[1].split(" ")
    }

    next = () =>
    {
        this.i++
        if (this.i < this.commands.length)
        {
            this.current = this.commands[this.i].split(" ")
        }
        else
        {
            this.current = ["$"]
        }
        return this
    }
    
    execute = () =>
    {
        switch (this.current[1])
        {
            case "cd":
                if (this.current[2] == "..") 
                {
                    this.pointer.pop()
                }
                else
                {
                    this.pointer.push(this.current[2])
                }
                this.next()
                return this

            case "ls":
                this.next()
                while (this.current[0] !== "$")
                {
                    //Make a new node and add it to the systemTree
                    let base = this.getNodeAt(this.pointer.join(",").split(","))
                    let nodeType: "file" | "dir" = "file"
                    if (this.current[0] === "dir") nodeType = "dir"
                    let node = new Node(
                        this.current[1],
                        nodeType,
                        parseInt(this.current[0])
                    )
                    base.appendNode(node)

                    //Move the command to the next line
                    this.next()                   
                }
                return this

            default:
                return this
        }
    }

    getNodeAt(pointer: string[], node = this.root): Node
    {
        if (pointer.length == 1 && pointer[0] == node.name) return node
        
        for (let x in node.children)
        {
            if (node.children[x].name === pointer[1])
            {
                pointer.shift()
                return this.getNodeAt(pointer, node.children[x])
            }
        }

        throw new Error("Null pointer exception! Oh no!")
    }

    init()
    {
        for (let x = 0; x < this.commands.length; x++)
        {
            this.execute()
        }
    }
}

class Node
{
    size: number = 0
    name: string
    type: "dir" | "file"
    parent: Node | null = null
    children: Node[] = []
    constructor(name: string, type: "dir" | "file", size?: number)
    {
        this.name = name
        this.type = type
        if (size) this.size = size
    }

    appendNode(node: Node)
    {
        node.parent = this
        this.children.push(node)
    }

    updateSize(): number
    {
        let totalSize = 0
        this.children.forEach((node) =>
        {
            if (node.children.length > 0)
            {
                totalSize += node.updateSize()
            }
            else
            {
                totalSize += node.size
            }
        })
        this.size = totalSize
        return totalSize
    }
}

function underLimit(count = 0, node: Node, limit: number): number
{
    if (node.type === "dir")
    {
        if (node.size < limit)
        {
            count += node.size
        }

        for (let x in node.children)
        {
            if (node.children[x].type === "dir")
            count = underLimit(count, node.children[x], limit)
        }
    }

    return count
}

function dirDeleteSize(fileSys: FileSystem): number
{
    var smallest = fileSys.root.size
    const limit = fileSys.root.size - 40_000_000
    let findDir = (node: Node) =>
    {
        node.children.forEach((n) =>
        {
            if (n.type === "dir")
            {
                let diff = n.size - limit
                console.log(n.size, "-", limit, "=", diff)
                if (diff > 0 && n.size < smallest)
                {
                    smallest = n.size
                }
                
                findDir(n)
            }
        })
    }
    findDir(fileSys.root)
    return smallest
}

let fileSys = new FileSystem(input)
fileSys.init()
console.log(fileSys.root.updateSize())
console.log(underLimit(0, fileSys.root, 100_000))
console.log(dirDeleteSize(fileSys))

