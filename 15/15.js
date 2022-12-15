"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const input = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "./input.txt"), "utf8").split("\r\n");
let signals = new Map();
let beacons = new Set();
function getDist(x, y) {
    return Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1]);
}
for (let line of input) {
    let sensorX = line.split(":")[0].match(/x=(-?\d*)/);
    let sensorY = line.split(":")[0].match(/y=(-?\d*)/);
    let beaconX = line.split(":")[1].match(/x=(-?\d*)/);
    let beaconY = line.split(":")[1].match(/y=(-?\d*)/);
    if (sensorX && sensorY && beaconX && beaconY) {
        let sensor = [parseInt(sensorX[1]), parseInt(sensorY[1])];
        let beacon = [parseInt(beaconX[1]), parseInt(beaconY[1])];
        beacons.add(beacon.join());
        let dist = getDist(sensor, beacon);
        signals.set(sensor.join(), { loc: sensor, dist: dist });
    }
}
let sortedSigs = Array.from(signals.values()).sort((a, b) => b.dist - a.dist);
// sortedSigs.forEach(sig => console.log(sig.loc.join(), sig.dist))
// Part 1
function part1() {
    const lineCheck = 2000000;
    let maximums = [NaN, NaN];
    signals.forEach((sig) => {
        let delta = sig.dist - Math.abs(sig.loc[1] - lineCheck);
        if (delta >= 0) {
            let lineLeft = sig.loc[0] - delta;
            let lineRight = sig.loc[0] + delta;
            if (isNaN(maximums[0]) || lineLeft < maximums[0])
                maximums[0] = lineLeft;
            if (isNaN(maximums[1]) || lineRight > maximums[1])
                maximums[1] = lineRight;
        }
    });
    let inSensorRange = 0;
    if (!isNaN(maximums[1]) && !isNaN(maximums[1])) {
        xCheck: for (let x = maximums[0]; x <= maximums[1]; x++) {
            for (let signal of signals) {
                let sig = signal[1];
                let dist = Math.abs(sig.loc[0] - x) + Math.abs(sig.loc[1] - lineCheck);
                let isBeacon = beacons.has([x, lineCheck].join());
                if (dist <= sig.dist && !isBeacon) {
                    inSensorRange++;
                    continue xCheck;
                }
            }
        }
    }
    console.log(inSensorRange);
}
function findSensor(x, y) {
    for (let sig of sortedSigs) {
        if (getDist([x, y], sig.loc) <= sig.dist) {
            return sig;
        }
    }
    return null;
}
function getRightEdge(y, sig) {
    let deltaLeft = sig.dist - Math.abs(y - sig.loc[1]);
    return sig.loc[0] + deltaLeft;
}
function part2() {
    // const maximum = 20
    const maximum = 4000000;
    for (let y = 0; y < maximum; y++) {
        for (let x = 0; x < maximum; x++) {
            let sensor = findSensor(x, y);
            if (sensor === null) {
                console.log(x, y);
                console.log((x * 4000000) + y);
            }
            else {
                x = getRightEdge(y, sensor);
            }
        }
    }
}
part2();
//# sourceMappingURL=15.js.map