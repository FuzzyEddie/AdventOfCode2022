import * as fs from "fs"
const filePath = "C:/CodingProjects/AdventOfCode2022/06/input.txt"
const input = fs.readFileSync(filePath, "utf8").split("\r\n")

function findStart(input: string, length: number): number
{

    for (let index = 0; index < input.length - length; index++)
    {
        let slice = new Set(input.slice(index, index + length))
        if (slice.size === length)
        {
            return index + length
        }   
    }

    return -1
}

console.log(findStart(input[0], 14))