import fs from "fs"
import path from "path"
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8").split("\r\n")

type Coordinates = [number, number]

class Node {
  type = Node
  loc: Coordinates
  dist = Infinity
  prev: Set<string> = new Set()
  val: number
  goal = false

  constructor(x: number, y: number, val: string)
  {
    this.loc = [x, y]
    const elev = "abcdefghijklmnopqrstuvwxyz"
    if (val == "E") this.goal = true

    if (val == "S") this.val = 1
    else if (val == "E") this.val = 26
    else this.val = elev.indexOf(val) + 1
  }
}

class Landscape {
  start: Coordinates = [0, 0]
  grid: Node[][]
  visited: Set<string> = new Set

  constructor(input: string[])
  {
    let g = input.map((x) => x.split(""))
    let nodes: Node[][] = []
    for (let y in g)
    {
      let nodes2: Node[] = []
      for (let x in g[y])
      {
        if (g[y][x] == "S") this.start = [parseInt(x), parseInt(y)]
        nodes2.push(new Node(parseInt(x), parseInt(y), g[y][x]))
      }
      nodes.push(nodes2)
    }
    this.grid = nodes
  }

  getNode(c: Coordinates): Node {return this.grid[c[1]][c[0]]}

  wasVisited(c: Coordinates | Node) {
    if (c instanceof Node) return this.visited.has(c.loc.join())
    else return this.visited.has(c.join())
  }

  getValidNeighbors(c: Node): Node[]
  {
    const maxW = this.grid[0].length
    const maxH = this.grid.length

    let loc = c.loc
    let nodes: Node[] = []

    //Check Up
    if (loc[1] - 1 >= 0 && !this.wasVisited([loc[0], loc[1] - 1]))
    {
      let up = this.getNode([loc[0], loc[1] - 1])
      if (up.val - c.val <= 1)
      {
        up.prev = c.prev
        up.prev.add(c.loc.join())
        nodes.push(up)
      }
    }
    //Check Down
    if (loc[1] + 1 < maxH && !this.wasVisited([loc[0], loc[1] + 1]))
    {
      let down = this.getNode([loc[0], loc[1] + 1])
      if (down.val - c.val <= 1)
      {
        down.prev = c.prev
        down.prev.add(c.loc.join())
        nodes.push(down)
      }
    }
    //Check Left
    if (loc[0] - 1 >= 0 && !this.wasVisited([loc[0] - 1, loc[1]]))
    {
      let left = this.getNode([loc[0] - 1, loc[1]])
      if (left.val - c.val <= 1)
      {
        left.prev = c.prev
        left.prev.add(c.loc.join())
        nodes.push(left)
      }
    }
    //Check Right
    if (loc[0] + 1 < maxW && !this.wasVisited([loc[0] + 1, loc[1]]))
    {
      let right = this.getNode([loc[0] + 1, loc[1]])
      if (right.val - c.val <= 1)
      {
        right.prev = c.prev
        right.prev.add(c.loc.join())
        nodes.push(right)
      }
    }

    return nodes
  }

  findGoal(): Node
  {
    let goal: Node | undefined
    let steps = 0
    let children: Set<Node> = new Set()
    children.add(this.getNode(this.start))
    while(goal == undefined)
    {
      steps++
      console.log(steps)
      let newChildren: Set<Node> = new Set()
      for (let node of children)
      {
        if (node.goal == true)
        {
          goal = node
          break
        }
        else
        {
          this.visited.add(node.loc.join())
          let near = this.getValidNeighbors(node)
          near.forEach((n) => newChildren.add(n))
        }
      }
      children = newChildren
    }
    return goal
  }
  
  findTrail(): Node
  {
    let goal: Node | undefined
    let steps = 0
    let children: Set<Node> = new Set()

    for (let blah in this.grid)
    {
      for (let nah of this.grid[blah])
      {
        if (nah.val == 1) children.add(nah)
      }
    }
    children.add(this.getNode(this.start))
    while(goal == undefined)
    {
      steps++
      console.log(steps)
      let newChildren: Set<Node> = new Set()
      for (let node of children)
      {
        if (node.goal == true)
        {
          goal = node
          break
        }
        else
        {
          this.visited.add(node.loc.join())
          let near = this.getValidNeighbors(node)
          near.forEach((n) => newChildren.add(n))
        }
      }
      children = newChildren
    }
    return goal
  }
}


let landscape = new Landscape(input)
let goal = landscape.findGoal()
// let goal = landscape.findTrail()
console.log(goal.prev.size)