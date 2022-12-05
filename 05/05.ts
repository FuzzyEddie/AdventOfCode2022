import * as fs from "fs"
const filePath = "C:/CodingProjects/AdventOfCode2022/05/input.txt"
const input = fs.readFileSync(filePath, "utf8").split("\r\n")
let stacksEnd = input.findIndex((val) => val === "") - 1

class Storage {
    stacks: string[][]
    constructor(input: string[], stacksEnd: number)
    {
        let stack: string[][] = []

        //Get the number of stacks
        let numStacks = (input[0].length + 1) / 4

        //Add the correct number of empty stacks
        for (let x = 0; x < numStacks; x++)
        {   
            let currentStack: string[] = []
            for (let y = stacksEnd - 1; y >= 0; y--)
            {
                let char = input[y].charAt((x * 4) + 1)
                if (char !== " ")
                {
                    currentStack.push(char)
                }
            }

            stack.push(currentStack)
        }
        this.stacks = stack
        console.log("Storage initialized:")
        for (let x in stack)
        {
            console.log(x, stack[x].join())
        }
    }

    exOrder9000(order: Order) {
        {
            if (order.amount > this.stacks[order.from].length)
            {
                order.amount = this.stacks[order.from].length
            }
            for (let x = 0; x < order.amount; x++)
            {
                this.stacks[order.to].push(this.stacks[order.from].pop() as string)
            }
        }
    }

    exOrder9001(order: Order) {
        {
            if (order.amount > this.stacks[order.from].length)
            {
                order.amount = this.stacks[order.from].length
            }

            let moving = this.stacks[order.from].slice(0 - order.amount)
            this.stacks[order.from].splice(0 - order.amount)
            this.stacks[order.to] = this.stacks[order.to].concat(moving)
        }
    }
}

class Order {
    amount: number
    from: number
    to: number
    constructor(input: string)
    {
        //Input Format:
        //Move <amount> from <stack> to <stack>
        let x = input.split(' ')
        this.amount = parseInt(x[1])
        this.from = parseInt(x[3]) - 1
        this.to = parseInt(x[5]) - 1
    }
}

let storage = new Storage(input, stacksEnd)

for (let x = stacksEnd + 2; x < input.length; x++)
{
    let order = new Order(input[x])
    storage.exOrder9001(order)
}

for (let stack in storage.stacks)
{
    if (storage.stacks[stack].length > 0)
    {
        console.log("Stack", stack, ":", storage.stacks[stack][storage.stacks[stack].length - 1])
    }
    else
    {
        console.log("Stack", stack, ":", "is empty.")
    }
}