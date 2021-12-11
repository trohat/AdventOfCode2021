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

const task = (octopuses, task) => {
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
    let step = 0;
    while (true) {
        step++;
        for (const key of Object.keys(octopuses)) {
            if (!octopuses[key].flashed) {
                flashOctopus(key);
            }
        }

        if (task === "task2" && Object.keys(octopuses).every(oct => octopuses[oct].flashed)) return step + 100;
        
        for (const key of Object.keys(octopuses)) 
        octopuses[key].flashed = false;
        
        if (task !== "task2" && step === 100) return flashes;
    }
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

doEqualTest(task(testdata), 1656);

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task(testdata, "task2"), 195);
console.time("Task 2");
console.log("Task 2: " + task(inputdata, "task2"));
console.timeEnd("Task 2");