console.log("AOC 2021 - Day 24: Arithmetic Logic Unit");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const instructions = [];
    const re = /(\w{3}) (\w) ?(\w+|-?\d+)?/;
    for (const line of data) {
        [ , instr, a, b ] = re.exec(line);
        instructions.push({ instr, a, b});
    }
    return instructions;
};

let varMapping = {
    "w": 0,
    "x": 1,
    "y": 2,
    "z": 3
};

const monad = (instructions, input) => {
    let processingUnit = zeros(4);
    console.log(processingUnit);
    for (const instr of instructions) {
        let a = +varMapping[instr.a];
        let b = /[wxyz]/.exec(instr.b) ? processingUnit[varMapping[instr.b]] : +instr.b;
        if (instr.a === "z") console.log(instr);
        switch (instr.instr) {
            case "inp":
                processingUnit[a] = +input.at(0);
                input = input.slice(1);
                break;
            case "add":
                processingUnit[a] += b;
                break;
            case "mul":
                processingUnit[a] *= b;
                break;
            case "div":
                processingUnit[a] = Math.trunc(processingUnit[a] / b);
                break;
            case "mod":
                processingUnit[a] %= b;
                break;
            case "eql":
                processingUnit[a] = processingUnit[a] === b ? 1 : 0;
                break;
            default:
                console.warn("Unknown MONAD instruction.")
        }
    }
    return processingUnit;
};

const task1 = instructions => {

    return monad(instructions, "39999698799429");
};

const task2 = data => {
    
}

let testdata = `inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

//doEqualTest(task1(testdata), 7);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

//doEqualTest(task2(testdata), 336);
//console.time("Task 2");
//console.log("Task 2: " + task2(inputdata));
//console.timeEnd("Task 2");