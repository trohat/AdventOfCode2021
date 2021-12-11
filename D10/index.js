console.log("AOC 2021 - ");

const splitLines = data => data.split(String.fromCharCode(10)).map( d => d.trim());

const prepare = data => data;

const task1 = data => {
    let score = 0;
    let matches = {
        "(": ")",
        "{": "}",
        "[": "]",
        "<": ">"
    };
    let starts = "([{<";
    let scores = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    }
    for (const line of data) {
        let opens = "";
        for (let i = 0; i < line.length; i++) {
            let char = line[i];
            if (starts.indexOf(char) !== -1) opens += char;
            else {
                last = opens.slice(-1);
                if (char === matches[last]) {
                    opens = opens.slice(0,-1);
                } else {
                    score += scores[char];
                    break;
                }
            }
        }
    }
    return score;
};

const task2 = data => {
    let myScores = [];
    let matches = {
        "(": ")",
        "{": "}",
        "[": "]",
        "<": ">"
    };
    let starts = "([{<";
    let scores = {
        "(": 1,
        "[": 2,
        "{": 3,
        "<": 4
    }
    for (const line of data) {
        let opens = "";
        let complete = true;
        for (let i = 0; i < line.length; i++) {
            let char = line[i];
            if (starts.indexOf(char) !== -1) opens += char;
            else {
                last = opens.slice(-1);
                if (char === matches[last]) {
                    opens = opens.slice(0,-1);
                } else {
                    complete = false;
                    break;
                }
            }
        }
        if (complete && opens.length > 0) {
            opens = opens.reverse();
            localScore = 0;
            for (let i = 0; i < opens.length; i++) {
                localScore *= 5;
                localScore += scores[opens[i]];
            }
            myScores.push(localScore);
        }
    }
    return myScores.sort((a,b) => a-b)[(myScores.length - 1)/2];
};

let testdata = `[({(<(())[]>[[{[]{<()<>>
    [(()[<>])]({[<{<<[]>>(
    {([(<{}[<>[]}>{[]{[(<()>
    (((({<>}<{<{<>}{[]{[]{}
    [[<[([]))<([[{}[[()]]]
    [{[{({}]{}}([{[{{{}}([]
    {<[[]]>}<{[{[{[]{()[[[]
    [<(<(<(<{}))><([]([]()
    <{([([[(<>()){}]>(<<{{
    <{([{{}}[<[[[<>{}]]]>[]]`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 26397);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 288957);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");