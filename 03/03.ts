import * as fs from "fs"
const filePath = "C:/CodingProjects/AdventOfCode2022/03/input.txt"
const input = fs.readFileSync(filePath, "utf8").split("\r\n")

type Priority = number

class Rucksack {
    allContents: string
    compartment1: string
    compartment2: string
    constructor(x: string)
    {
        this.allContents = x
        this.compartment1 = x.slice(0, x.length/2)
        this.compartment2 = x.slice(x.length/2, x.length)
    }

    static getPriority(x: string): Priority
    {
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return str.indexOf(x) + 1
    }

    findError(): Priority
    {
        let comp1 = this.compartment1.split("")
        let comp2 = this.compartment2
        let err: Priority = 0

        for (let val1 in comp1)
        {
            if (comp2.indexOf(comp1[val1]) > -1)
            {
                err = Rucksack.getPriority(val1)
                break
            }
        }

        return err

    }

    findBadge(ruck2: Rucksack, ruck3: Rucksack): Priority
    {
        let sack1 = this.allContents.split("")
        let sack2 = ruck2.allContents
        let sack3 = ruck3.allContents
        
        for (let item1 in sack1)
        {
            let x = sack2.indexOf(sack1[item1])
            let y = sack3.indexOf(sack1[item1])

            if (x > -1 && y > -1)
            {
                return Rucksack.getPriority(sack1[item1])
            }
        }

        return 0

    }
}

let total = 0

/* //Part1
for (let sack in input)
{
    let rucksack = new Rucksack(input[sack])
    let err = rucksack.findError()
    console.log("Errors:", err)
    total += err
}

console.log("Errors total:", total) */

//Part2
let badgeTotal = 0

for (let x = 0; x < input.length; x = x + 3)
{
    let sack1 = new Rucksack(input[x])
    let sack2 = new Rucksack(input[x + 1])
    let sack3 = new Rucksack(input[x + 2])

    let badge = sack1.findBadge(sack2, sack3)
    console.log("Badge:", badge)
    badgeTotal += badge
}

console.log("Badge Total:", badgeTotal)