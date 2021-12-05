console.log("AOC 2021 - Day 4: Giant Squid");

const splitLines = data => data.split(String.fromCharCode(10) + String.fromCharCode(10));

const prepare = data => {
    order = data.shift().split(",").map(Number);
    data = data.map(d => d.split("\n").map(d => d.split(" ").filter( d => d !== "").map(Number)));
    return {order, boards: data };
};

const task1 = ({ order, boards }) => {
    const boardSum = board => {
        return board.flat().sum();
    }

    for (const number of order) {
        for (const board of boards) {
            for (const line of board) {
                line.forEach((n, i) => {
                    if (number === n) line[i] = null;
                })
            }
        }
        for (const board of boards) {
            for (const line of board) {
                if (line.every( x => x === null)) {
                    return boardSum(board) * number;
                }
            }
            testBoard = board.rotateRight();
            for (const line of testBoard) {
                if (line.every( x => x === null)) {
                    return boardSum(board) * number;
                }
            }
        }
    }
};

const task2 = ({ order, boards }) => {
    const boardSum = board => {
        return board.flat().sum();
    }

    for (const number of order) {
        for (const board of boards) {
            for (const line of board) {
                line.forEach((n, i) => {
                    if (number === n) line[i] = null;
                })
            }
        }
        let boardsToDelete = [];
        for (const board of boards) {
            for (const line of board) {
                if (line.every( x => x === null)) {
                    boardsToDelete.push(board);
                }
            }
            testBoard = board.rotateRight();
            for (const line of testBoard) {
                if (line.every( x => x === null)) {
                    boardsToDelete.push(board);
                }
            }
        }
        if (boards.length === 1 && boardsToDelete.length === 1) return boardSum(boards[0]) * number;
        boards = boards.filter( board => !boardsToDelete.includes(board));
    }
    
};

let testdata = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 4512);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 1924);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");