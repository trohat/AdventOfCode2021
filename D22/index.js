console.log("AOC 2021 - Day 22: Reactor Reboot");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/;
    let steps = [];
    for (const line of data) {
        let [, rule, x1, x2, y1, y2, z1, z2] = re.exec(line);
        [x1, x2, y1, y2, z1, z2] = [x1, x2, y1, y2, z1, z2].map(Number);
        console.assert(x1 <= x2);
        console.assert(y1 <= y2);
        console.assert(z1 <= z2);
        steps.push({ rule, x1, x2, y1, y2, z1, z2 });
    }
    return steps;
};

const task1 = steps => {
    let on = new Set();
    for (const { rule, x1, x2, y1, y2, z1, z2 } of steps) {
        if (x1 <= 50 && x1 >= -50 && y1 <= 50 && y1 >= -50) {
            for (let i = x1; i <= x2; i++) {
                for (let j = y1; j <= y2; j++) {
                    for (let k = z1; k <= z2; k++) {
                        let str = `${i},${j},${k}`;
                        if (rule === "on") on.add(str);
                        else on.delete(str);
                    }
                }
            }
        }
    }
    return on.size;
};

const task2 = steps => {
    console.time("Construct");

    let xBorders = new Set();
    let yBorders = new Set();
    let zBorders = new Set();
    for (const { rule, x1, x2, y1, y2, z1, z2 } of steps) {
        xBorders.add(x1);
        xBorders.add(x2 + 1);
        yBorders.add(y1);
        yBorders.add(y2 + 1);
        zBorders.add(z1);
        zBorders.add(z2 + 1);
    }
    xBorders = [...xBorders].sort((a, b) => a - b);
    yBorders = [...yBorders].sort((a, b) => a - b);
    zBorders = [...zBorders].sort((a, b) => a - b);
    const xLen = xBorders.length;
    const yLen = yBorders.length;
    const zLen = zBorders.length;
    let onSquares = [];
    for (let i = 0; i < xLen; i++) {
        onSquares.push([]);
        for (let j = 0; j < yLen; j++) {
            onSquares[i].push([]);
            for (let k = 0; k < zLen; k++) {
                onSquares[i][j].push(false);
            }
        }
    }
    console.timeEnd("Construct");

    console.time("Process");

    for (let { rule, x1, x2, y1, y2, z1, z2 } of steps) {
        x1 = xBorders.findIndex(i => i === x1);
        x2 = xBorders.findIndex(i => i === x2 + 1);
        y1 = yBorders.findIndex(i => i === y1);
        y2 = yBorders.findIndex(i => i === y2 + 1);
        z1 = zBorders.findIndex(i => i === z1);
        z2 = zBorders.findIndex(i => i === z2 + 1);
        for (let i = x1; i < x2; i++) {
            for (let j = y1; j < y2; j++) {
                for (let k = z1; k < z2; k++) {
                    let str = `${i},${j},${k}`;
                    if (rule === "on") {
                        onSquares[i][j][k] = true;
                    }
                    else onSquares[i][j][k] = false;
                }
            }
        }
    }
    console.timeEnd("Process");

    console.time("Result");

    let total = 0;
    /*
    for (const square of onSquares) {
        let [x1, y1, z1] = square.split(",").map(Number);
        let x2 = xBorders[x1 + 1];
        x1 = xBorders[x1];
        let y2 = yBorders[y1 + 1];
        y1 = yBorders[y1];
        let z2 = zBorders[z1 + 1];
        z1 = zBorders[z1];
        let area = (x2 - x1) * (y2 - y1) * (z2 - z1);
        total += area;
    }
    */
   for (let i = 0; i < xLen; i++) {
       for (let j = 0; j < yLen; j++) {
           for (let k = 0; k < zLen; k++) {
               if (onSquares[i][j][k]) {
                   let x2 = xBorders[i + 1];
                   let x1 = xBorders[i];
                   let y2 = yBorders[j + 1];
                   let y1 = yBorders[j];
                   let z2 = zBorders[k + 1];
                   let z1 = zBorders[k];
                   let area = (x2 - x1) * (y2 - y1) * (z2 - z1);
                   total += area;
                }
            }
        }
    }
    console.timeEnd("Result");

    return total;
}


testdata1 = prepare(splitLines(testdata1));
testdata2 = prepare(splitLines(testdata2));
testdata3 = prepare(splitLines(testdata3));

console.log("Test data:");
console.log(testdata1);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

//doEqualTest(task1(testdata1), 39);
//doEqualTest(task1(testdata2), 590784);
//doEqualTest(task1(testdata3), 474140);

console.time("Task 1");
//console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata1), 39);
doEqualTest(task2(testdata3), 2758514936282235);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");