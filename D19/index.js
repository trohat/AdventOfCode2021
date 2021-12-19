console.log("AOC 2021 - Day 19: Beacon Scanner");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    let scanners = [];
    let scanner = -1;
    for (const line of data) {
        let scannerRe = /--- scanner \d+ ---/;
        let coordsRe = /(-?\d+),(-?\d+),(-?\d+)/;
        if (line.trim().length === 0) continue;
        if (scannerRe.exec(line)) {
            scanner++;
            scanners.push([]);
        }
        else if (coordsRe.exec(line)) {
            [, x, y, z] = coordsRe.exec(line).map(Number);
            scanners[scanner].push([x, y, z]);
        }
    }
    return scanners;
};

function* rotate(scanner, omit = []) {
    omit = omit.map(Math.abs);
    for (let i = 1; i <= 3; i++) {
        if (!omit.includes(i)) {
            yield [scanner.map(c => c[i - 1]), i];
            yield [scanner.map(c => -c[i - 1]), -i];
        }
    }
}

const task = (scanners, task) => {
    let connectedScanners = [];
    let remainingScanners = [...scanners];
    connectedScanners.push(remainingScanners.shift());
    
    let scannerPositions = [[0, 0, 0]];

    main: while (remainingScanners.length > 0) {
        for (const scanner1 of connectedScanners) {
            for (const scanner2 of remainingScanners) {

                let distances = scanner1.map(c => c[0]).sort((a, b) => a - b);
                /*comment out*/ //let scanner2 = scanners[1];

                for (const [otherDists, firstAxis] of rotate(scanner2)) {
                    otherDists.sort((a, b) => a - b);

                    for (let i = 0; i < distances.length; i++) {
                        for (let j = 0; j < otherDists.length - 11; j++) {
                            let firstDiff = otherDists[j] - distances[i];
                            let newDists = distances.filter(d => otherDists.includes(d + firstDiff));
                            if (newDists.length >= 12) {

                                let distances = scanner1.map(c => c[1]).sort((a, b) => a - b);
                                for (const [otherDists, secondAxis] of rotate(scanner2, [firstAxis])) {
                                    for (let k = 0; k < distances.length; k++) {
                                        for (let l = 0; l < otherDists.length - 11; l++) {
                                            let secondDiff = otherDists[l] - distances[k];
                                            let newDists = distances.filter(d => otherDists.includes(d + secondDiff));
                                            if (newDists.length >= 12) {

                                                let distances = scanner1.map(c => c[2]).sort((a, b) => a - b);
                                                for (const [otherDists, thirdAxis] of rotate(scanner2, [firstAxis, secondAxis])) {
                                                    for (let m = 0; m < distances.length; m++) {
                                                        for (let n = 0; n < otherDists.length - 11; n++) {
                                                            let thirdDiff = otherDists[n] - distances[m];
                                                            let newDists = distances.filter(d => otherDists.includes(d + thirdDiff));
                                                            if (newDists.length >= 12) {
                                                                //console.log(firstAxis, firstDiff, secondAxis, secondDiff, thirdAxis, thirdDiff);
                                                                let connectedScanner = [];
                                                                for (const beacon of scanner2) {
                                                                    let x = beacon[Math.abs(firstAxis) - 1];
                                                                    let y = beacon[Math.abs(secondAxis) - 1];
                                                                    let z = beacon[Math.abs(thirdAxis) - 1];
                                                                    connectedScanner.push([x * Math.sign(firstAxis) - firstDiff, y * Math.sign(secondAxis) - secondDiff, z * Math.sign(thirdAxis) - thirdDiff,])
                                                                }
                                                                connectedScanners.push(connectedScanner);
                                                                remainingScanners = remainingScanners.filter(sc => sc !== scanner2);
                                                                scannerPositions.push([-firstDiff, -secondDiff, -thirdDiff]);
                                                                continue main;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    let beacons = new Set();
    for (const scanner of connectedScanners) {
        for (const beacon of scanner) {
            beacons.add(beacon.toString());
        }
    }

    if (task === undefined) return beacons.size;

    let distances = [];

    for (const scanner1 of scannerPositions) {
        for (const scanner2 of scannerPositions) {
            if (scanner1 === scanner2) continue;
            let distance = 0;
            for (let i = 0; i < 3; i++) {
                distance += Math.abs(scanner1[i] - scanner2[i]);
            }
            distances.push(distance);
        }
    }

    return distances.max();
};

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task(testdata), 79);

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task(testdata, "task2"), 3621);
console.time("Task 2");
console.log("Task 2: " + task(inputdata, "task2"));
console.timeEnd("Task 2");