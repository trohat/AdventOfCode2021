console.log("AOC 2021 - Day 8: Seven Segment Search");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data;

const task1 = data => {
    let easy = 0;
    for (let line of data) {
        line = line.split(" | "); 
        //console.log(line[1].trim().split(" ").filter( n => [1,4,7,8].includes(n.length)))
        easy += line[1].trim().split(" ").filter( n => [2,3,4,7].includes(n.length)).length   
    }
    return easy;
};

const task2 = data => {
    data = data.map(line => line.split(" | ").map( hl => hl.trim().split(" "))); 
    let sum = 0;

    // correctly aligned segments to numbers
    const mapping = {
        "abcefg": "0",
        "cf": "1",
        "acdeg": "2",
        "acdfg": "3",
        "bcdf": "4",
        "abdfg": "5",
        "abdefg": "6",
        "acf": "7",
        "abcdefg": "8",
        "abcdfg": "9"
    };
    for (const line of data) {
        input = line[0].concat(line[1]);
        input.sort((a,b) => a.length - b.length);
        const myMapping = {};

        let two = input.find(n => n.length === 2).split("");
        let three = input.find(n => n.length === 3).split("");
        let four = input.find(n => n.length === 4).split("");

        //looking for A segment comparing number 1 and number 7
        for (const letter of three) {
            if (!two.includes(letter))
            myMapping[letter] = "a";
        }

        // looking for C segment comparing 6-segment numbers and number 1 (C is missing in number 6)
        outer: for (const n of input) {
            if (n.length === 6) {
                for (const letter of two) {
                    if (!n.split("").includes(letter)) {
                        myMapping[letter] = "c";
                        break outer;
                    }
                }
            }
        }

        // F segment is the other in number 1
        for (l of two) {
            if (!(l in myMapping)) {
                myMapping[l] = "f";
            }
        }

        // number 4 has two new segments, B and D
        let fourSegs = [];
        for (const letter of four) {
            if (!(letter in myMapping))
            fourSegs.push(letter);
        }

        // looking for D comparing 5-segment numbers and number 4 (need to find the case with only one difference, as is not case of number 5, but is the case of 2 and 3)
        outer: for (const n of input) {
            if (n.length === 5) {
                lookingForD = new Set();
                let l;
                for (const letter of n.split("")) {
                    if (fourSegs.includes(letter)) {
                        lookingForD.add(letter);
                        l = letter;
                    }
                }
                if (lookingForD.size == 1) {
                    myMapping[l] = "d";
                    break outer;
                }
            }
        }

        // B is the other in new segments from number 4
        for (const letter of fourSegs) {
            if (!(letter in myMapping)) myMapping[letter] = "b";
        }

        // looking for G comparing 5-segment numbers and the segments we don't have (again need to find only one difference, as is in numbers 3 and 5)
        outer: for (const n of input) {
            if (n.length === 5) {
                lookingForG = new Set();
                let l;
                for (const letter of n.split("")) {
                    if (!(letter in myMapping)) {
                        lookingForG.add(letter);
                        l = letter;
                    }
                }
                if (lookingForG.size == 1) {
                    myMapping[l] = "g";
                    break outer;
                }
            }
        }

        // E is the last segment we don't have yet
        for (const letter of "abcdefg".split("")) {
            if (!(letter in myMapping)) myMapping[letter] = "e";
        }

        output = line[1];

        let value = "";
        for (number of output) {
            number = number.split("").map(x => myMapping[x]).sort().join("");
            value += mapping[number];
        }

        sum += +value;
    }
    return sum;
}

let testdata = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 26);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 61229);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");