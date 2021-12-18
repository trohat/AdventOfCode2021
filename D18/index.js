console.log("AOC 2021 - Day 18: Snailfish");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    return data.map(d => eval(d));
};

const isNumber = n => "0123456789".split("").includes(n);

const check = numberString => {
    let changed = true;
    main: while (changed) {
        changed = false;
        let lefts = 0;
        for (let i = 0; i < numberString.length; i++) {
            
            let char = numberString.at(i);
            if (char === "[") {
                lefts++;
            }
            else if (char === "]") {
                lefts--;
            }
            else continue;
            if (lefts > 4) {
                let right = numberString.indexOf("]", i);
                let explodingPair = numberString.slice(i, right + 1);
                //console.log("Explode at", explodingPair);
                numberString = numberString.slice(0, i) + 0 + numberString.slice(i + explodingPair.length);

                let [leftExploded, rightExploded] = explodingPair.slice(1, explodingPair.length - 1).split(",").map(Number);

                let toLeft = i - 1;
                while (!isNumber(numberString.at(toLeft)) && toLeft >= 0) {
                    toLeft--;
                }
                let newLeft = 0;
                let leftShift = 0;
                if (toLeft >= 0) {
                    let leftLen = 1;
                    while (isNumber(numberString.at(toLeft - leftLen))) leftLen++;
                    let leftLiteral = numberString.slice(toLeft - leftLen + 1, toLeft + 1);
                    newLeft = +leftLiteral + leftExploded;
                    numberString = numberString.slice(0, toLeft - leftLen + 1) + newLeft + numberString.slice(toLeft + 1);
                    leftShift = newLeft.toString().length - leftLiteral.length;
                }

                let toRight = i + leftShift + 1;

                while (!isNumber(numberString.at(toRight)) && toRight < numberString.length) {
                    toRight++;
                }
                if (toRight < numberString.length) {
                    let rightLen = 1;
                    while (isNumber(numberString.at(toRight + rightLen))) rightLen++;
                    let rightLiteral = numberString.slice(toRight, toRight + rightLen);
                    let newRight = +rightLiteral + rightExploded;
                    numberString = numberString.slice(0, toRight) + newRight + numberString.slice(toRight + rightLen);
                }
                //console.log(numberString);
                changed = true;
                continue main;
            }

        }

        let literal;
        for (let i = 0; i < numberString.length; i++) {
            
            let char = numberString.at(i);
            if (/[\],\[]/.exec(char)) {
                literal = "";
                continue;
            }
            else {
                literal += char;
            }
            
            // slicing only works for numbers under 1000
            if (Number(literal) > 9) {
                if (isNumber(numberString.at(i + 1))) {
                    literal += numberString.at(i + 1);
                }
                let n = Number(literal);
                //console.log("Split at", n);
                let newString = "[" + Math.floor(n / 2) + "," + Math.ceil(n / 2) + "]";
                numberString = numberString.slice(0, i - 1) + newString + numberString.slice(i + (isNumber(numberString.at(i + 1)) ? 2 : 1));
                
                //console.log(numberString);
                changed = true;
                continue main;
            }
        }
    }
    return numberString;
};

console.assert(check("[[[[[9,8],1],2],3],4]") === "[[[[0,9],2],3],4]");
console.assert(check("[7,[6,[5,[4,[3,2]]]]]") === "[7,[6,[5,[7,0]]]]");
console.assert(check("[[6,[5,[4,[3,2]]]],1]") === "[[6,[5,[7,0]]],3]");
console.assert(check("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]") === "[[3,[2,[8,0]]],[9,[5,[7,0]]]]");
console.assert(check("[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]") === "[[3,[2,[8,0]]],[9,[5,[7,0]]]]");

const magnitude = snailNumber => 3 * (Array.isArray(snailNumber[0]) ? magnitude(snailNumber[0]) : snailNumber[0]) + 2 * (Array.isArray(snailNumber[1]) ? magnitude(snailNumber[1]) : snailNumber[1]);

const task1 = (data, test) => {
    let homework = data[0];
    homework = check(homework);
    for (let i = 1; i < data.length; i++) {
        homework = "[" + homework + "," + data[i] + "]";
        homework = check(homework);
    }

    if (test === "test") return homework;

    return magnitude(eval(homework));
};

const task2 = data => {
    let magnitudes = [];
    for (const n1 of data) {
        for (const n2 of data) {
            if (n1 !== n2) {
                let two = "[" + n1 + "," + n2 + "]";
                magnitudes.push(magnitude(eval(check(two))));
            }
        }
    }

    return magnitudes.max();
}

console.assert(task1(splitLines(`[[[[4,3],4],4],[7,[[8,4],9]]]
[1,1]`), "test") === "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");

console.assert(task1(splitLines(`[1,1]
[2,2]
[3,3]
[4,4]`), "test") === "[[[[1,1],[2,2]],[3,3]],[4,4]]");

console.assert(task1(splitLines(`[1,1]
[2,2]
[3,3]
[4,4]
[5,5]`), "test") === "[[[[3,0],[5,3]],[4,4]],[5,5]]");

console.assert(task1(splitLines(`[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`), "test") === "[[[[5,0],[7,4]],[5,5]],[6,6]]");

let testdata = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

testdata = splitLines(testdata);

console.log("Test data:");
console.log(testdata);

inputdata = splitLines(inputdata);

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 4140);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 3993);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");