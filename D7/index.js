console.log("AOC 2021 - Day 7: The Treachery of Whales");

const prepare = data => data.split(",").map(Number);

const task1 = crabs => {
    let min = crabs.min();
    let max = crabs.max();
    let best =  Infinity;
    for (let alignTo = min; alignTo <= max; alignTo++) {
        let actual = 0;
        for (const crab of crabs) {
            actual += Math.abs(alignTo - crab);
        }
        if (actual < best) best = actual;
    }
    return best;
};

const task2 = crabs => {
    let max = crabs.max();
    let min = crabs.min();
    let distances = [0];
    for (let i = 1; i < max; i++) {
        distances.push(distances[i-1] + i);
    }
    let best =  Infinity;
    for (let alignTo = min; alignTo <= max; alignTo++) {
        let actual = 0;
        for (const crab of crabs) {
            actual += distances[Math.abs(alignTo - crab)];
        }
        if (actual < best) best = actual;
    }
    return best;
};

let testdata = `16,1,2,0,4,2,7,1,2,14`;

testdata = prepare(testdata);

console.log("Test data:");
console.log(testdata);

inputdata = prepare(inputdata);

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 37);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 168);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");