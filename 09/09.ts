import * as fs from "fs"
const filePath = "C:/CodingProjects/AdventOfCode2022/09/input.txt"
const input = fs.readFileSync(filePath, "utf8").split("\r\n")

// type Coordinate = [number, number]

class Coordinate {
  pos: [number, number]
  constructor(pos: [number, number])
  {
    this.pos = pos
  }

  follow(leader: Coordinate)
  {
    let newPos = Array.from(this.pos) as [number, number]
    let xDiff = this.pos[0] - leader.pos[0]
    let yDiff = this.pos[1] - leader.pos[1]
    let totalDist = Math.abs(xDiff) + Math.abs(yDiff)
    if (xDiff < 0 && yDiff < 0 && totalDist > 2)
    {
      newPos[0]++
      newPos[1]++
    }
    else if (xDiff < 0 && yDiff > 0 && totalDist > 2)
    {
      newPos[0]++
      newPos[1]--
    }
    else if (xDiff > 0 && yDiff < 0 && totalDist > 2)
    {
      newPos[0]--
      newPos[1]++
    }
    else if (xDiff > 0 && yDiff > 0 && totalDist > 2)
    {
      newPos[0]--
      newPos[1]--
    }
    else if (xDiff < -1)
    {
      newPos[0]++
    }
    else if (xDiff > 1)
    {
      newPos[0]--
    }
    else if (yDiff < -1)
    {
      newPos[1]++
    }
    else if (yDiff > 1)
    {
      newPos[1]--
    }
    // console.log(leader.pos.join(), "moved.", this.pos.join(), ">", newPos.join())
    this.pos = newPos
  }
}

class Command {
  dir: string
  dist: number
  static totalDist = 0
  constructor(input: string)
  {
    let i = input.split(' ')
    this.dir = i[0]
    this.dist = parseInt(i[1])
    Command.totalDist += this.dist
  }
}

class Rope {
  head: Coordinate = new Coordinate([0, 0])
  tail: Coordinate[] = []
  visited = new Set<string>(["0,0"])
  moves: number = 0

  constructor(length: number)
  {
    while(this.tail.length < length)
    {
      this.tail.push(new Coordinate([0,0]))
    }
  }

  move(command: Command)
  {
    for (let x = command.dist; x > 0; x--)
    {
      switch (command.dir)
      {
        case "R":
          this.head.pos[0]++
          break
        case "L":
          this.head.pos[0]--
          break
        case "U":
          this.head.pos[1]++
          break
        case "D":
          this.head.pos[1]--
          break
        default:
          throw new Error("Invalid direction")
      }
      this.moves++
      for (let x in this.tail)
      {
        let y = parseInt(x)
        if (y == 0)
        {
          this.tail[y].follow(this.head)
        }
        else
        {
          this.tail[y].follow(this.tail[y - 1])
        }
      }
      if (!this.visited.has(this.tail[this.tail.length - 1].pos.join()))
      {
        this.visited.add(this.tail[this.tail.length - 1].pos.join())
        console.log("New Pos:", this.tail[this.tail.length - 1].pos.join())
      }
    }
  }
}

let rope = new Rope(9)
input.forEach((val) =>
{
  rope.move(new Command(val))
  // let logString = rope.head.pos.join() + " | "
  // rope.tail.forEach((val) => logString += val.pos.join() + " | ")
  // console.log(logString)
})
console.log(rope.visited.size)