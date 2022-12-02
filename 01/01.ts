//Take all elves, add their calories and add them to a map
//Sort the map by highest to lowest
//return the elf carrying highest calories

//or

//Take all elves, add their calories and add them to an array
//Loop through the array to find the index of the highest calorie elf

//or

//Go through the list counting elves as you go
//Add the elf's calories. If it's the highest you've seen, log that count
//Logged count at the end is the highest calorie elf
import * as fs from "fs"

type Elf = {
    index: number,
    calories: number
}

const filePath = "C:/CodingProjects/AdventOfCode2022/01/input.txt"

function getGreedyElf(file: string): Elf
{
    const input = fs.readFileSync(file, "utf8")
    const greediestElf: Elf =
    {
        index: 0,
        calories: 0
    }
    let index = 0
    let elfIndex = 1
    let calCount: number[] = []

    do
    {
        let numStart = index
        let numEnd = input.indexOf("\n", index)
        let num = parseInt(input.slice(numStart, numEnd))
        
        if (!isNaN(num))
        {
            calCount.push(parseInt(input.slice(numStart, numEnd)))
        }
        else
        {
            let calTotal = calCount.reduce((val1, val2) => val1 + val2)
            console.log("Elf " + elfIndex + " has " + calTotal + " calories!")
            if (calTotal > greediestElf.calories) {
                greediestElf.index = elfIndex
                greediestElf.calories = calTotal
            }
            calCount = []
            elfIndex++
        }
        
        index = numEnd + 1
        
    }
    while(index < input.length)
    
    return greediestElf
}

function topThreeElves(file: string): number[]
{
    const input = fs.readFileSync(file, "utf8")
    let topThree: number[] = [0, 0, 0]
    let index = 0
    let elfIndex = 1
    let calCount: number[] = []

    do
    {
        let numStart = index
        let numEnd = input.indexOf("\n", index)
        let num = parseInt(input.slice(numStart, numEnd))
        
        if (!isNaN(num))
        {
            calCount.push(parseInt(input.slice(numStart, numEnd)))
        }
        else
        {
            let calTotal = calCount.reduce((val1, val2) => val1 + val2)
            console.log("Elf " + elfIndex + " has " + calTotal + " calories!", elfIndex)
            for (let x = 0; x < 3; x++)
            {
                if (calTotal > topThree[x])
                {
                    topThree[x] = calTotal
                    topThree.sort()
                    break
                }
            }

            calCount = []
            elfIndex++
        }
        
        index = numEnd + 1
        
    }
    while(index < input.length)
    
    return topThree
}

// let greediestElf = getGreedyElf(filePath)
let topThreeTotal = topThreeElves(filePath).reduce((val1, val2) => val1 + val2) 
console.log("Top three elves have", topThreeTotal)
