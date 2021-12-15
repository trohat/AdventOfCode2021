console.log("AOC 2021 - Day 13: Transparent Origami");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    let paper = new Set();
    let folds = [];
    for (const line of data) {
        if (line.trim() === "") continue;
        const paperRe = /(\d+),(\d+)/;
        const foldRe = /fold along ([xy])=(\d+)/;
        if (paperRe.test(line)) {
            [, x, y] = paperRe.exec(line);
            paper.add([x,y].toString());
        }
        else {
            [, axis, where ] = foldRe.exec(line);
            folds.push({
                axis, where: +where
            });
        }
    }
    return [ paper, folds ];
};

const task = ([ paper, folds ], task) => {
    let nFolds = 0;
    for (const fold of folds) {
        nFolds++;
        newPaper = new Set();
        axis = fold.axis;
        where = fold.where;
        for (const dot of paper) {
            [ x, y ] = dot.split(",");
            if (axis === "y" && y > where) {
                y -= 2 * (y - where);
                newPaper.add([x,y].toString());
            } else if (axis === "x" && x > where) {
                x -= 2 * (x - where);
                newPaper.add([x,y].toString());
            } else newPaper.add(dot);
        }
        if (nFolds === 1 && task === "task1") return newPaper.size;
        paper = newPaper;
    }
    let resultStr = "";
    for (let i = 0; i < 6; i++) {
        let str = "                                                ";
        for (const dot of paper) {
            [ x, y ] = dot.split(",");
            if (+y === i) {
                str = str.setCharAt(+x, "█");
            }
        }
        resultStr += str + "\n";
    }
    console.log(resultStr);
    return paper;
};

let testdata = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task(testdata, "task1"), 17);

console.time("Task 1");
console.log("Task 1: " + task(inputdata, "task1"));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: ");
task(inputdata);
console.timeEnd("Task 2");