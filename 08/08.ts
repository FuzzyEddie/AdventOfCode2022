import * as fs from "fs"
const filePath = "C:/CodingProjects/AdventOfCode2022/08/input.txt"
const input = fs.readFileSync(filePath, "utf8").split("\r\n")

const enum Cards
{
  NORTH,
  EAST,
  SOUTH,
  WEST,
  ALL
}

type Coordinates = [number, number]

class Orchard {
  trees: string[]
  constructor(input: string[])
  {
    this.trees = input
  }

  treeVal(coords: Coordinates): number
  {
    return parseInt(this.trees[coords[1]].charAt(coords[0]))
  }

  isVisible(origin: Coordinates, ...dirs: Cards[]): boolean
  {
    let height = this.treeVal(origin)

    if (dirs[0] === Cards.ALL)
    {
      dirs = [
        Cards.NORTH,
        Cards.SOUTH,
        Cards.EAST,
        Cards.WEST,
      ]
    }

    heightCheck:
    for (let x in dirs)
    {
      switch (dirs[x])
      {
        case 0:

          if (origin[1] == 0) return true

          for (let y = origin[1] - 1; y >= 0; y--)
          {
            if (this.treeVal([origin[0], y]) >= height) continue heightCheck
          }

          return true
          
        case 1:

          if (origin[0] == this.trees[0].length - 1) return true

          for (let y = origin[0] + 1; y < this.trees[0].length; y++)
          {
            if (this.treeVal([y, origin[1]]) >= height) continue heightCheck
          }

          return true

        case 2:

          if (origin[1] == this.trees.length - 1) return true

          for (let y = origin[1] + 1; y < this.trees.length; y++)
          {
            if (this.treeVal([origin[0], y]) >= height) continue heightCheck
          }

          return true

        case 3:

          if (origin[0] == 0) return true

          for (let y = origin[0] - 1; y >= 0; y--)
          {
            if (this.treeVal([y, origin[1]]) >= height) continue heightCheck
          }

          return true
      }
    }

    return false
    
  }
  score(origin: Coordinates, ...dirs: Cards[]): number
  {
    let height = this.treeVal(origin)
    let score = 1
    let count = 1

    if (dirs[0] === Cards.ALL)
    {
      dirs = [
        Cards.NORTH,
        Cards.SOUTH,
        Cards.EAST,
        Cards.WEST,
      ]
    }

    heightCheck:
    for (let x in dirs)
    {
      switch (dirs[x])
      {
        case 0:

          if (origin[1] == 0) return 0
          
          for (let y = origin[1] - 1; y >= 0; y--)
          {
            if (this.treeVal([origin[0], y]) >= height || y == 0)
            {
              score *= count
              count = 1
              continue heightCheck
            }
            count++
          }
          
        case 1:

          if (origin[0] == this.trees[0].length - 1) return 0

          for (let y = origin[0] + 1; y < this.trees[0].length; y++)
          {
            if (this.treeVal([y, origin[1]]) >= height || y == this.trees[0].length - 1)
            {
              score *= count
              count = 1
              continue heightCheck
            }
            count++
          }

        case 2:

          if (origin[1] == this.trees.length - 1) return 0

          for (let y = origin[1] + 1; y < this.trees.length; y++)
          {
            if (this.treeVal([origin[0], y]) >= height || y == this.trees.length - 1)
            {
              score *= count
              count = 1
              continue heightCheck
            }
            count++
          }

        case 3:

          if (origin[0] == 0) return 0

          for (let y = origin[0] - 1; y >= 0; y--)
          {
            if (this.treeVal([y, origin[1]]) >= height || y == 0)
            {
              score *= count
              count = 1
              continue heightCheck
            }
            count++
          }
      }
    }

    return score
    
  }
}

let orchard = new Orchard(input)

/*
let visible = 0
for (let x = 0; x < orchard.trees.length; x++)
{
  for (let y = 0; y < orchard.trees[x].length; y++)
  {
    if (orchard.isVisible([x, y], Cards.ALL))
    {
      visible++
    }
  }
}

console.log(visible)
*/

let highScore = 0

for (let x = 0; x < orchard.trees.length; x++)
{
  for (let y = 0; y < orchard.trees[x].length; y++)
  {
    let score = orchard.score([x, y], Cards.ALL)
    if (score > highScore)
    {
      highScore = score
    }
  }
}

console.log(highScore)
