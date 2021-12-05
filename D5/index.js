console.log("AOC 2021 - Day 5: Hydrothermal Venture");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const lines = [];
    const re = /(\d+),(\d+) -> (\d+),(\d+)/;
    for (const line of data) {
        const [ , x1, y1, x2, y2 ] = re.exec(line);
        lines.push({x1: +x1, x2: +x2, y1: +y1, y2: +y2});
    }
    return lines;
};

const task = (data, task) => {
    const map = {};
    for (const line of data) {
        let x1 = line.x1;
        let x2 = line.x2;
        let y1 = line.y1;
        let y2 = line.y2;
        if (x1 === x2) {
            if (y1 > y2) [y1, y2] = [y2, y1];
            for (let i = y1; i <= y2 ; i++) {
                let coords = [x1, i].toString();
                map[coords] = map[coords] + 1 || 1;
            }
        }
        else if (y1 === y2) {
            if (x1 > x2) [x1, x2] = [x2, x1];
            for (let i = x1; i <= x2 ; i++) {
                let coords = [i, y1].toString();
                map[coords] = map[coords] + 1 || 1;
            }
        }
        else if (Math.abs(x2 - x1) === Math.abs(y2 - y1)) {
            if (task === "task2") {
                if (x1 < x2 && y1 < y2) {
                    for (let i = x1, j = y1; i <= x2 ; i++, j++) {
                        let coords = [i, j].toString();
                        map[coords] = map[coords] + 1 || 1;
                    }
                }
                else if (x1 > x2 && y1 < y2) {
                    for (let i = x1, j = y1; j <= y2 ; i--, j++) {
                        let coords = [i, j].toString();
                        map[coords] = map[coords] + 1 || 1;
                    }
                }
                else if (x1 > x2 && y1 > y2) {
                    for (let i = x2, j = y2; i <= x1 ; i++, j++) {
                        let coords = [i, j].toString();
                        map[coords] = map[coords] + 1 || 1;
                    }
                }
                else if (x1 < x2 && y1 > y2) {
                    for (let i = x1, j = y1; i <= x2 ; i++, j--) {
                            let coords = [i, j].toString();
                            map[coords] = map[coords] + 1 || 1;
                    }
                }
            }
        }
    }
    let overlap = Object.values(map).filter(x => x > 1).length;
    return overlap;
};

let testdata = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task(testdata), 5);

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task(testdata, "task2"), 12);
console.time("Task 2");
console.log("Task 2: " + task(inputdata, "task2"));
console.timeEnd("Task 2");