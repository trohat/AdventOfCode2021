console.log("AOC 2021 - Day 6: Lanternfish");

const prepare = data => data.split(",").map(Number);

const task1 = data => {
    let fishes = [...data];
    for (let i = 0; i < 80; i++) {
        newFishes = [];
        fishes = fishes.map(fish => {
            if (fish > 0) return fish - 1;
            if (fish === 0) {
                newFishes.push(8);
                return 6;
            }
        });
        fishes = fishes.concat(newFishes);
    }
    return fishes.length;
};

const task2 = data => {
    let fishes = [...data];
    let days = 256;
    makingFishes = [0];
    fishes.forEach(f => {
        makingFishes[f] = makingFishes[f] + 1 || 1;
    });
    let total = 0;
    for (let i = 0; i < days; i++) {
        if (i in makingFishes) {
            const newF = makingFishes[i];
            makingFishes[i+7] = makingFishes[i+7] + newF || newF;
            makingFishes[i+9] = makingFishes[i+9] + newF || newF;
            if (i + 7 >= days ) total += newF;
            if (i + 9 >= days ) total += newF;
        }
    }
    return total;
}

let testdata = `3,4,3,1,2`;

testdata = prepare(testdata);

console.log("Test data:");
console.log(testdata);

inputdata = prepare(inputdata);

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 5934);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 26984457539);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");