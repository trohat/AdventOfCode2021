console.log("AOC 2021 - Day 25: Sea Cucumber");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    let seafloor = [];
    data.forEach((line, lineIndex) => {
        seafloor.push([]);
        for (const char of line.split("")) seafloor[lineIndex].push(char);
    })
    return seafloor;
};

const task1 = seafloor => {
    let change = true;
    let steps = 0;
    //console.log(seafloor.map(l => l.join("")).join("\n"));
    while (change) {
        change = false;
        steps++;
        let secondSeafloor = [];
        for (let i = 0; i < seafloor.length; i++) {
            secondSeafloor.push([]);
            for (let j = 0; j < seafloor[0].length; j++) {
                if (seafloor[i][j] === ">" && seafloor[i][(j + 1) % seafloor[0].length] === ".") {
                    change = true;
                    secondSeafloor[i][j] = ".";
                    secondSeafloor[i][(j + 1) % seafloor[0].length] = ">";
                    j++;
                } else {
                    secondSeafloor[i][j] = seafloor[i][j];
                }
            }
        }
        for (let j = 0; j < secondSeafloor[0].length; j++) {
            for (let i = 0; i < secondSeafloor.length; i++) {
                if (secondSeafloor[i][j] === "v" && secondSeafloor[(i + 1) % secondSeafloor.length][j] === ".") {
                    change = true;
                    seafloor[i][j] = ".";
                    seafloor[(i + 1) % secondSeafloor.length][j] = "v";
                    i++;
                } else {
                    seafloor[i][j] = secondSeafloor[i][j];
                }
            }
        }
        //console.log(seafloor.map(l => l.join("")).join("\n"));
    }
    return steps;
};

let testdata = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 58);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");