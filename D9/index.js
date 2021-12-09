console.log("AOC 2021 - Day 9: Smoke Basin");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const maze = {};
    data.forEach((line, lineIndex) => {
        line.split("").forEach((loc, locIndex) => {
            maze[[locIndex, lineIndex].toString()] = +loc;
        })
    });
    return [maze, data[0].length, data.length];
};

const task1 = ([ maze, x, y]) => {
    let sum = 0;
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            let isLowPoint = true;       
            for (const dir of generalDirs) {
                newX = i + dir.x;
                newY = j + dir.y;
                newLoc = [newX, newY].toString();
                loc = [i,j].toString();
                if (newLoc in maze) 
                    if (maze[loc] >= maze[newLoc]) isLowPoint = false;
            }
            if (isLowPoint) sum += maze[[i,j].toString()] + 1
        }
    }
    return sum;
};

const task2 = ([ maze, x, y]) => {
    let lowPoints = [];
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            let isLowPoint = true;       
            for (const dir of generalDirs) {
                newX = i + dir.x;
                newY = j + dir.y;
                newLoc = [newX, newY].toString();
                loc = [i,j].toString();
                if (newLoc in maze) 
                    if (maze[loc] >= maze[newLoc]) isLowPoint = false;
            }
            if (isLowPoint) lowPoints.push(loc);
        }
    }
    //console.log(lowPoints);

    let basins = [];

    for (const lowPoint of lowPoints) {
        basin = new Set();
        basin.add(lowPoint);
        let lastSize = 0;
        while (basin.size > lastSize) {
            lastSize = basin.size;
            pointsToExplore = basin;
            for (let point of pointsToExplore) {
                point = point.split(",");
                x = +point[0];
                y = +point[1];
                for (const dir of generalDirs) {
                    newX = x + dir.x;
                    newY = y + dir.y;
                    newLoc = [newX, newY].toString();
                    if (newLoc in maze && maze[newLoc] < 9) {
                        basin.add(newLoc);
                    }
                }
            }
        }
        basins.push(basin.size);
    }
    basins = basins.sort((a,b) => b-a);
    //console.log(basins);
    return basins[0] * basins[1] * basins[2];
};

let testdata = `2199943210
3987894921
9856789892
8767896789
9899965678`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 15);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 1134);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");