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

function getGreedyElf(file: string): number
{
    const input = fs.readFileSync(file, "utf8")
    const greediestElf =
    {
        index: 0,
        calories: 0
    }
    let index = 0
    let elfIndex = 1
    let calCount: number[] = []

    while(index < input.length)
    {
        let numStart = index
        let numEnd = input.indexOf("\n")
        let num = parseInt(input.slice(numStart, numEnd))

        if (!isNaN(num))
        {
            calCount.push(parseInt(input.slice(numStart, numEnd)))
        }
        else
        {
            let calTotal = calCount.reduce((val1, val2) => val1 + val2)
            if (calTotal > greediestElf.calories) {
                greediestElf.index = elfIndex
                greediestElf.calories = calTotal
            }
            console.log("Elf " + elfIndex + " has " + calTotal + " calories!")
            elfIndex++
        }

        index = numEnd + 1

    }
    
    return greediestElf.index

}

console.log(getGreedyElf("C:/CodingProjects/AdventOfCode2022/01/testInput.txt"))
