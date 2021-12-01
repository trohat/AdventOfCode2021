console.log("AOC 2021 - Day 1: Sonar Sweep");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data.map(Number);

const task1 = data => {
    let count = 0;
    oldDepth = data[0]
    for (depth of data) {
        if (depth > oldDepth) count++;
        oldDepth = depth;
    }
    return count;
};

const task2 = data => {
    measurements = [];
    data.forEach((_, index) => {
        if (index < 2) return;
        measurements.push(data[index] + data[index-1] + data[index-2]);
    });
    return task1(measurements);
}

let testdata = `199
200
208
210
200
207
240
269
260
263`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 7);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 5);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");