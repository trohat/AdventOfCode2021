console.log("AOC 2021 - Day 15: Chiton");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const cavern = [];
    data.forEach((line, lineIndex) => {
        cavern.push([]);
        line.split("").forEach((char, charIndex) => {
            cavern[lineIndex].push(+char);
        })
    })
    return cavern;
};

const task1 = cavern => {
    maxX = cavern[0].length - 1;
    maxY = cavern.length - 1;
    let risks = [];
    for (let i = 0; i <= maxY; i++) {
        if (i === 0) risks.push([0]);
        else risks.push([cavern[i][0] + risks[i-1][0]])
        for (let j = 1; j <= maxX; j++) {
            if (i === 0) risks[i].push(risks[i][j-1] + cavern[i][j]);
            else risks[i].push(Math.min(risks[i][j-1], risks[i-1][j]) + cavern[i][j]);
        }
    }
    console.log(risks);
    return risks[maxY][maxX];
    /*
    working with stack of paths ... not good
    let paths = [];
    paths.push({
        x: 0,
        y: 0,
        risk: 0
    });
    let risks = [];
    growing = true;
    while (growing) {
        growing = false;
        newPaths = [];
        for (const path of paths) {
            if (path.x === maxX && path.y === maxY) {
                risks.push(path.risk);
            } else {
                growing = true;
                if (path.x < maxX) {
                    newPaths.push({
                        x: path.x + 1,
                        y: path.y,
                        risk: path.risk + cavern[path.y][path.x + 1]
                    });
                }
                if (path.y < maxY) {
                    newPaths.push({
                        x: path.x,
                        y: path.y + 1,
                        risk: path.risk + cavern[path.y + 1][path.x]
                    });
                }
            }
        }
        newPaths.sort((p1,p2) => {
            if (p1.y === p2.y) return p1.x - p2.x;
            else return p1.y - p2.y;
        });
        let cleanedPaths = [];
        for (let i = 0; i < newPaths.length; i++) {
            
            
        }
        paths = newPaths;
    }
    return risks.min();
    */

    /*
    working with permutations of directions ... even worse
     let pathPattern = [];
     for (let i = 0; i <= maxX-7; i++) {
         pathPattern.push(0);
     }
     for (let i = 0; i <= maxY-7; i++) {
         pathPattern.push(1);
     }
     let patterns = new Set(getAllPermutations(pathPattern));
     console.log(patterns);
     */
};

const task2 = smallCavern => {
    let mod9 = n => {
        if (n > 9) return n - 9;
        return n;
    }
    
    let cavern = [];
    size = smallCavern.length;
    for (let i = 0; i < 5; i++) {
        for (let y = 0; y < smallCavern.length; y++) {
            cavern.push([]);
            for (let j = 0; j < 5; j++) {
                for (let x = 0; x < smallCavern[0].length; x++) {
                    cavern[size*i+y].push(mod9(smallCavern[y][x] + i + j));
                }
            }
        }
    }
    
    maxX = cavern[0].length - 1;
    maxY = cavern.length - 1;
    let risks = [];
    for (let i = 0; i <= maxY; i++) {
        if (i === 0) risks.push([0]);
        else risks.push([cavern[i][0] + risks[i-1][0]])
        for (let j = 1; j <= maxX; j++) {
            if (i === 0) risks[i].push(risks[i][j-1] + cavern[i][j]);
            else risks[i].push(Math.min(risks[i][j-1], risks[i-1][j]) + cavern[i][j]);
        }
    }
    
    let changed = true;
    let steps = 0;
    while (changed) {
        steps++;
        changed = false;
        for (let i = 0; i < risks.length; i++) {
            for (let j = 0; j < risks[0].length; j++) {
                lowests = [];
                if (i > 0) lowests.push(risks[i-1][j] + cavern[i][j]);
                if (j > 0) lowests.push(risks[i][j-1] + cavern[i][j]);
                if (i < maxY) lowests.push(risks[i+1][j] + cavern[i][j]);
                if (j < maxY) lowests.push(risks[i][j+1] + cavern[i][j]);
                lowest = lowests.min();
                if (lowest < risks[i][j]) {
                    if (i === 2 && j === 1) {
                        console.log("New lowest",  lowest);
                    }
                    changed = true;
                    risks[i][j] = lowest;
                }
            }
        }
        console.log(steps);

    }
    console.log(risks);
    return risks[maxY][maxX];
}

let testdata = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
//console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 40);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 315);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");