import fs from "fs"
import path from "path"
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8").split("\r\n")

type MonkeyInfo = [string, string, string, string, string]

class Monkey {
  items: number[]
  mBuis = 0
  divisor: number
  inspect: Function
  throwTo: Function

  /* 
  Arguments provided as an array of 5 strings:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3
  */
  constructor(input: MonkeyInfo)
  {
    //Parsing starting items
    let items = input[0].replace("Starting items: ", "").split(", ")
    this.items = items.map((x) => parseInt(x))

    //Building inspect method
    let opStr = input[1].replace("Operation: new = ", "")
    this.inspect = new Function("old", `
      this.mBuis++
      this.items[0] = ${opStr}`
    )

    //Building throw method
    let test = parseInt(input[2].replace("Test: divisible by ", ""))
    let ifTrue = parseInt(input[3].replace("If true: throw to monkey ", ""))
    let ifFalse = parseInt(input[4].replace("If false: throw to monkey ", ""))
    this.divisor = test
    this.throwTo = new Function(`
      let item = this.items[0]
      if (item % ${test} == 0)
      {
        return ${ifTrue}
      }
      else
      {
        return ${ifFalse}
      }`)
  }
}

class Troop {
  monkeys: Monkey[] = []
  constructor(input: string[])
  {
    for (let x in input)
    {
      if (input[x].startsWith("Monkey"))
      {
        let y = parseInt(x)
        this.monkeys.push(new Monkey(input.slice(y + 1, y + 6) as MonkeyInfo))
      }
    }
  }
}

let troop = new Troop(input)
let primeProd = 1
troop.monkeys.forEach((a) => primeProd *= a.divisor)

const rounds = 10_000
const knownRounds = [1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000]

for (let t = 0; t < rounds; t++){
  // if (knownRounds.includes(t))
  // {
  //   debugger
  // }
  troop.monkeys.forEach((monkey) =>
  {
    while (monkey.items.length > 0)
    {
      monkey.inspect(monkey.items[0])
      // monkey.items[0] = Math.floor(monkey.items[0] / 3)
      monkey.items[0] = monkey.items[0] % primeProd
      troop.monkeys[monkey.throwTo()].items.push(monkey.items[0])
      monkey.items.shift()
    }
  })
}

troop.monkeys.sort((a, b) => b.mBuis - a.mBuis)
let totalMbuis = troop.monkeys[0].mBuis * troop.monkeys[1].mBuis
console.log(totalMbuis)
debugger