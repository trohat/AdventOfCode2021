console.log("AOC 2021 - ");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data;

const task1 = data => {
    total = [];
    for (let i = 0; i < data[0].length; i++) {
        total.push("");
        for (const line of data) {
            total[i] += line[i];
        }
    }
    console.log(total);
    let gamma = "";
    let epsilon = "";
    for (let i = 0; i < total.length; i++) {
        let zeros = total[i].countChar("0");
        let ones = total[i].countChar("1");
        if (zeros >= ones) {
            gamma += "0";
            epsilon += "1";
        } else {
            gamma += "1";
            epsilon += "0";
        }
    }
    console.log("eg", gamma, epsilon);
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const task2 = data => {
    data2 = [...data];
    for (let i = 0; i < data[0].length; i++) {
        if (data.length == 1) break;
        total = "";
        for (const line of data) {
            total += line[i];
        }
        let zeros = total.countChar("0");
        let ones = total.countChar("1");
        if (ones >= zeros) {
            data = data.filter(d => d[i] == "1");
        } else {
            data = data.filter(d => d[i] == "0");
        }
    }
    oxygen = parseInt(data[0], 2);
    console.log("ox", oxygen);
    data = data2;
    console.log(data);
    for (let i = 0; i < data[0].length; i++) {
        if (data.length == 1) break;
        total = "";
        for (const line of data) {
            total += line[i];
        }
        let zeros = total.countChar("0");
        let ones = total.countChar("1");
        if (zeros <= ones) {
            data = data.filter(d => d[i] == "0");
        } else {
            data = data.filter(d => d[i] == "1");
        }
        console.log(data);
    }
    CO2 = parseInt(data[0], 2);
    console.log("CO2", CO2);
    return oxygen * CO2;
}

let testdata = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 198);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 230);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");