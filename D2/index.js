console.log("AOC 2021 - Day 2: Dive!");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data.map(d => {
    d = d.split(" ");
    return {
        pos: d[0],
        depth: +d[1]
    }
});

const task1 = data => {
    let depth = 0;
    let pos = 0;
    for (const d of data) {
        switch (d.pos) {
            case "forward":
                depth += d.depth;
                break;
            case "up":
                pos -= d.depth;
                break;
            case "down":
                pos += d.depth;
                break;
            default:
                console.log("Wrong switch");
        }
    }
    return pos * depth;
};

const task2 = data => {
    let depth = 0;
    let pos = 0;
    let aim = 0;
    for (const d of data) {
        switch (d.pos) {
            case "forward":
                pos += d.depth;
                depth += aim * d.depth;
                break;
            case "up":
                aim -= d.depth;
                break;
            case "down":
                aim += d.depth;
                break;
            default:
                console.log("Wrong switch");
        }
    }
    return pos * depth;
}

let testdata = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 150);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 900);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");