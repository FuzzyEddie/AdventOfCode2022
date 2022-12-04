import * as fs from "fs"
const filePath = "C:/CodingProjects/AdventOfCode2022/04/input.txt"
const input = fs.readFileSync(filePath, "utf8").split("\r\n")

class Assignment
{
    sections: number[]

    constructor(str: string)
    {
        let assign = str.split("-")
        let start = parseInt(assign[0])
        let end = parseInt(assign[1])
        let sect: number[] = []

        for (let x = start; x <= end; x++)
        {
            sect.push(x)
        }

        this.sections = sect
    }
}

class Pair
{
    elf1: Assignment
    elf2: Assignment
    
    constructor(str: string)
    {
        let pair = str.split(',')
        this.elf1 = new Assignment(pair[0])
        this.elf2 = new Assignment(pair[1])
    }

    findOverlap(): number[]
    {
        let overlap: number[] = []
        for (let x in this.elf1.sections)
        {
            if (this.elf2.sections.find((val1) =>
                val1 === this.elf1.sections[x]) !== undefined)
            {
                overlap.push(this.elf1.sections[x])
            }
        }
        return overlap
    }

    isRedundant(): boolean
    {
        let overlap = this.findOverlap()
        if (overlap.length === this.elf1.sections.length ||
            overlap.length === this.elf2.sections.length)
        {
            return true
        }
        else
        {
            return false
        }
    }
}

//Part1
let full = 0
let partial = 0

for (let x in input)
{
    let pair = new Pair(input[x])
    let overlap = pair.findOverlap()

    if(pair.isRedundant())
    {
        full++
    }

    if (overlap.length > 0)
    {
        partial++
    }

}

console.log("Pairs with full redundancy:", full)
console.log("Pairs with partial redundancy:", partial)