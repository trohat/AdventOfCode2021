console.log("AOC 2021 - Day 24: Arithmetic Logic Unit");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const instructions = [];
    const re = /(\w{3}) (\w) ?(\w|-?\d+)?/;
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

const monad = (instructions, inputString) => {
    let processingUnit = zeros(4);
    console.log(processingUnit);
    let step = 0;
    let log = false;
    for (const instr of instructions) {
        step++;
        if (step > 0) log = true;
        if (log) {
            console.log(processingUnit);
            console.log(instr)
        }
        if (step > 20) break;
        let a = varMapping[instr.a];
        let b = /[wxyz]/.exec(instr.b) ? processingUnit[varMapping[instr.b]] : instr.b;
        switch (instr.instr) {
            case "inp":
                processingUnit[a] = inputString.at(0);
                inputString = inputString.slice(1);
                break;
            case "add":
                if (+b === 0) ;
                else if (+processingUnit[a] === 0) processingUnit[a] = b;
                else processingUnit[a] = "(" + processingUnit[a] + "+" + b + ")";
                break;
            case "mul":
                if (+b === 0 || +processingUnit[a] === 0) processingUnit[a] = 0;
                else processingUnit[a] = "(" + processingUnit[a] + "*" + b + ")";
                break;
            case "div":
                if (+processingUnit[a] === 0) ;
                else processingUnit[a] = "(" + processingUnit[a] + "/" + b + ")";
                break;
            case "mod":
                if (+processingUnit[a] === 0) ;
                else processingUnit[a] = "(" + processingUnit[a] + "%" + b + ")";
                break;
            case "eql":
                processingUnit[a] = "(" + processingUnit[a] + "eq" + b + ")";
                if (/\(\(-?\d+eq[ABCDEFGHIJKLMN]\)eq0\)$/.exec(processingUnit[a])) {
                    console.log(processingUnit[a]);
                    processingUnit[a] = 0;
                }
                break;
            default:
                console.warn("Unknown MONAD instruction.")
        }
    }
    return processingUnit;
};

const task1 = instructions => {

    return monad(instructions, "ABCDEFGHIJKLMN").join("   ");
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