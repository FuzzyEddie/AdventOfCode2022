import * as fs from "fs"
const filePath = "C:/CodingProjects/AdventOfCode2022/02/input.txt"
const input = fs.readFileSync(filePath, "utf8").split("\r\n")

type Win = 6
type Lose = 0
type Draw = 3

type Rock = 1
type Paper = 2
type Scissors = 3

class Choice
{
    act: Rock|Paper|Scissors
    constructor(x: string)
    {
        if (x === "A" || x === "X")
        {
            this.act = 1
        }
        else if (x === "B" || x === "Y")
        {
            this.act = 2
        }
        else if (x === "C" || x === "Z")
        {
            this.act = 3
        }   
        else
        {
            throw new Error("Invalid argument for Choice constuctor: " + x)
        }   
    }

    vs = (x:Choice): Win|Lose|Draw =>
    {
        if (this.act === x.act)
        {
            return 3
        }
        else if (this.act === 1)
        {
            if (x.act === 3)
            {
                return 6
            }
            else
            {
                return 0
            }
        }
        else if (this.act === 2)
        {
            if (x.act === 1)
            {
                return 6
            }
            else
            {
                return 0
            }
        }
        else
        {
            if (x.act === 2)
            {
                return 6
            }
            else
            {
                return 0
            }
        }
    }

    forOutcome = (x: Win|Lose|Draw): Rock|Paper|Scissors =>
    {
        if (x === 3)
        {
            return this.act
        }
        else if (x === 0)
        {
            if (this.act === 1)
            {
                return 3
            }
            else if (this.act === 2)
            {
                return 1
            }
            else
            {
                return 2
            }
        }
        else
        {
            if (this.act === 1)
            {
                return 2
            }
            else if (this.act === 2)
            {
                return 3
            }
            else
            {
                return 1
            }
        }
    }

    static convertOutcome = (x: string): Win|Lose|Draw =>
    {
        if (x === "X")
        {
            return 0
        }
        else if (x === "Y")
        {
            return 3
        }
        else if (x === "Z")
        {
            return 6
        }
        else
        {
            throw new Error("Invalid outcome argument: " + x)
        }
    }
}

function roundScore(me: Choice, them: Choice): number
{
    return me.vs(them) + me.act
}

function roundScoreByResult(them: Choice, outcome: Win|Lose|Draw): number{
    return them.forOutcome(outcome) + outcome
}

function getTotalScore1(input: string[]): number
{
    let score = 0

    for (let x = 0; x < input.length; x++)
    {
        let round = input[x].split(" ")
        let them = new Choice(round[0])
        let me = new Choice(round[1])
        score += roundScore(me, them)
        console.log("Current score:", score)
    }
    return score
}

function getTotalScore2(input: string[]): number
{
    let score = 0

    for (let x = 0; x < input.length; x++)
    {
        let round = input[x].split(" ")
        console.log(round)
        let them = new Choice(round[0])
        let outcome = Choice.convertOutcome(round[1])
        score += roundScoreByResult(them, outcome)
    }
    console.log("Current score:", score)
    return score
}

// console.log(getTotalScore1(input))
console.log(getTotalScore2(input))

