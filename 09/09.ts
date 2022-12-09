import * as fs from "fs"
const filePath = "C:/CodingProjects/AdventOfCode2022/09/testinput.txt"
const input = fs.readFileSync(filePath, "utf8").split("\r\n")

type Coordinate = [number, number]

class Command {
  dir: string
  dist: number
  constructor(input: string)
  {
    this.dir = input.charAt(0)
    this.dist = parseInt(input.charAt(2))
  }
}

class Rope {
  head: Coordinate = [0, 0]
  tail: Coordinate = [0, 0]
  visited = new Set<string>(["0,0"])
  moves: number = 0

  move(command: Command)
  {
    for (let x = command.dist; x > 0; x--)
    {
      let oldPos = Array.from(this.head) as Coordinate
      switch (command.dir)
      {
        case "R":
          this.head[0]++
          break
        case "L":
          this.head[0]--
          break
        case "U":
          this.head[1]++
          break
        case "D":
          this.head[1]--
          break
        default:
          throw new Error("Invalid direction")
      }
      this.moves++
      if (Math.abs(this.head[0] - this.tail[0]) > 1 || Math.abs(this.head[1] - this.tail[1]) > 1)
      {
        this.tail = oldPos
        this.visited.add(oldPos.join())
      }
    }
  }
}

let rope = new Rope()
input.forEach((val) =>
{
  rope.move(new Command(val))
})
console.log(rope.visited.size)
console.log(rope.moves)