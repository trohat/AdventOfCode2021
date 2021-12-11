console.log("AOC 2021 - ");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    let map = {};
    data.forEach((line, lineIndex) => {
        line.split("").forEach((oct, octIndex) => {
            map[[octIndex, lineIndex].toString()] = {
                energy: +oct,
                flashed: false
            };
        });
    });
    return map;
}

const task1 = octopuses => {
    const flashOctopus = key => {
        octopuses[key].energy++;
        if (octopuses[key].energy > 9) {
            flashes++;
            octopuses[key].energy = 0;
            octopuses[key].flashed = true;
            let [x, y] = key.split(",");
            for (const dir of diagonalDirs) {
                newX = +x + dir.x;
                newY = +y + dir.y;
                newOct = [newX, newY].toString();
                if (newOct in octopuses && !octopuses[newOct].flashed) flashOctopus(newOct);
            }
        }
    }

    let flashes = 0;
    let steps = 100;
    for (let step = 0; step < steps; step++) {
        for (const key of Object.keys(octopuses)) {
            if (!octopuses[key].flashed) {
                flashOctopus(key);
            }
        }
        for (const key of Object.keys(octopuses)) 
            octopuses[key].flashed = false;
    }
    return flashes;
};

const task2 = octopuses => {
    const flashOctopus = key => {
        octopuses[key].energy++;
        if (octopuses[key].energy > 9) {
            flashes++;
            octopuses[key].energy = 0;
            octopuses[key].flashed = true;
            let [x, y] = key.split(",");
            for (const dir of diagonalDirs) {
                newX = +x + dir.x;
                newY = +y + dir.y;
                newOct = [newX, newY].toString();
                if (newOct in octopuses && !octopuses[newOct].flashed) flashOctopus(newOct);
            }
        }
    }

    let flashes = 0;
    let steps = 1000;
    for (let step = 1; step <= steps; step++) {
        for (const key of Object.keys(octopuses)) {
            if (!octopuses[key].flashed) {
                flashOctopus(key);
            }
        }
        if (Object.keys(octopuses).every(oct => octopuses[oct].flashed)) return step + 100;
        
        for (const key of Object.keys(octopuses)) 
            octopuses[key].flashed = false;
    }
    console.log("we dont want to be here");
    return flashes;
};

let testdata = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 1656);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 195);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");