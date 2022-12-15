import fs from "fs"
import path from "path"
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8").split("\r\n")

type Sensor = {
  loc: [number, number]
  dist: number
}

let signals = new Map<string, Sensor>()
let beacons = new Set()

function getDist(x: number[], y: number[]): number
{
  return Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1])
}

for (let line of input)
{
  
  let sensorX = line.split(":")[0].match(/x=(-?\d*)/)
  let sensorY = line.split(":")[0].match(/y=(-?\d*)/)
  let beaconX = line.split(":")[1].match(/x=(-?\d*)/)
  let beaconY = line.split(":")[1].match(/y=(-?\d*)/)

  if (sensorX && sensorY && beaconX && beaconY)
  {
    let sensor = [parseInt(sensorX[1]), parseInt(sensorY[1])]
    let beacon = [parseInt(beaconX[1]), parseInt(beaconY[1])]
    beacons.add(beacon.join())

    let dist = getDist(sensor, beacon)
    
    signals.set(sensor.join(), {loc: sensor as [number, number], dist: dist})
  }
}
let sortedSigs = Array.from(signals.values()).sort((a, b) => b.dist - a.dist)

// sortedSigs.forEach(sig => console.log(sig.loc.join(), sig.dist))

// Part 1
function part1() {
  const lineCheck = 2_000_000
  let maximums = [NaN, NaN]
  
  signals.forEach((sig) =>
  {
    let delta = sig.dist - Math.abs(sig.loc[1] - lineCheck)
    if (delta >= 0)
    {
      let lineLeft = sig.loc[0] - delta
      let lineRight = sig.loc[0] + delta
  
      if (isNaN(maximums[0]) || lineLeft < maximums[0]) maximums[0] = lineLeft
      if (isNaN(maximums[1]) || lineRight > maximums[1]) maximums[1] = lineRight
    }
  })
  
  let inSensorRange = 0
  
  if (!isNaN(maximums[1]) && !isNaN(maximums[1]))
  {
    xCheck:
    for (let x = maximums[0]; x <= maximums[1]; x++)
    {
      for (let signal of signals)
      {
        let sig = signal[1]
        let dist = Math.abs(sig.loc[0] - x) + Math.abs(sig.loc[1] - lineCheck)
        let isBeacon = beacons.has([x, lineCheck].join())
        if (dist <= sig.dist && !isBeacon)
        {
          inSensorRange++
          continue xCheck
        }
      }
    }
  }
  console.log(inSensorRange)
}

function findSensor(x: number, y: number): Sensor | null
{
  for(let sig of sortedSigs)
  {
    if (getDist([x, y], sig.loc) <= sig.dist)
    {
      return sig
    }
  }
  return null
}

function getRightEdge(y: number, sig: Sensor): number
{
  let deltaLeft = sig.dist - Math.abs(y - sig.loc[1])
  return sig.loc[0] + deltaLeft
}

function part2() {
  // const maximum = 20
  const maximum = 4_000_000
  for (let y = 0; y < maximum; y++)
  {
    for (let x = 0; x < maximum; x++)
    {
      let sensor = findSensor(x, y)
      if (sensor === null)
      {
        console.log(x, y)
        console.log((x * 4_000_000) + y)
      }
      else
      {
        x = getRightEdge(y, sensor)
      }
    }
  }
}

part2()
