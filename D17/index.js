console.log("AOC 2021 - Day 17: Trick Shot");

const prepare = data => {
    const re = /target area: x=(\d+)..(\d+), y=(-?\d+)..(-?\d+)/;
    [ , x1, x2, y1, y2 ] = re.exec(data);
    return {
        x1: +x1,
        x2: +x2,
        y1: +y1,
        y2: +y2 
    }
};

const task = ({ x1, x2, y1, y2 }, task) => {
    let highest = 0;
    let highX = null;
    let highY = null;
    let successes = 0;
    for (let x = 0; x < 200; x++) {
        for (let y = -200; y < 200; y++) {
            let success = false;
            let highestCand = 0;
            let xVel = x;
            let yVel = y;
            let xPos = 0;
            let yPos = 0;
            while (yPos >= y1) {
                xPos += xVel;
                yPos += yVel;
                xVel += -Math.sign(xVel);
                yVel--;
                if (yPos > highestCand) highestCand = yPos;
                if (xPos >= x1 && xPos <= x2 && yPos >= y1 && yPos <= y2) {
                    success = true;
                    successes++;
                    break;
                }
            }
            if (success) {
                if (highestCand > highest) {
                    highest = highestCand;
                    highX = x;
                    highY = y;
                }
            }
        }
    }
    if (task === "task2") return successes;
    return highest;
}

let testdata = `target area: x=20..30, y=-10..-5`;

testdata = prepare(testdata);

console.log("Test data:");
console.log(testdata);

inputdata = prepare(inputdata);

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task(testdata), 45);

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task(testdata, "task2"), 112);
console.time("Task 2");
console.log("Task 2: " + task(inputdata, "task2"));
console.timeEnd("Task 2");