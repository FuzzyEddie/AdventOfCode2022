import * as fs from "fs"
const filePath = "C:/CodingProjects/AdventOfCode2022/06/input.txt"
const input = fs.readFileSync(filePath, "utf8").split("\r\n")

function findStart(input: string, length: number): number
{

    for (let index = 0; index < input.length - length; index++)
    {
        let slice = Array.from(input.slice(index, index + length)).sort()
        let match = false

        while (slice.length > 1)
        {
            let check = slice.shift()
            if (check == slice[0])
            {
                match = true
                break
            }
        }
        
        if (match === false) return index + length
        
    }

    return -1
}

console.log(findStart(input[0], 14))