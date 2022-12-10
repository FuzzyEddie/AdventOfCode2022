import fs from "fs"
import path from "path"
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8").split("\r\n")

let signal: [number, number][] = [[0, 1]]
let strength = 1

input.forEach((val) =>
{
  let command = val.split(" ")
  const lastSig = signal.at(-1)

  if (lastSig == undefined)
  {
    throw new Error("Could not get value of last signal")
  }

  switch (command[0])
  {
    case "noop":
      signal.push([lastSig[0] + 1, strength])
      break
    case "addx":
      signal.push([lastSig[0] + 1, strength])
      signal.push([lastSig[0] + 2, strength])
      strength += parseInt(command[1])
      break
  }
})


let totalSignal = 0

for (let x = 20; x <= 220; x += 40)
{
  totalSignal += (signal[x][1] * x)
  console.log(signal[x][1], x, (signal[x][1] * x), totalSignal)
}

console.log(totalSignal)

signal.shift()
let lines: string[] = []
let line = ""

signal.forEach((val) =>
{
  let pixel = val[0] - 1 - lines.length * 40
  let sprite = [val[1] - 1, val[1], val[1] + 1]

  if (sprite.includes(pixel))
  {
    line += "#"
  }
  else
  {
    line += "."
  }
  if (line.length == 40)
  {
    lines.push(line)
    line = ""
  }
})

lines.forEach(x => console.log(x))

