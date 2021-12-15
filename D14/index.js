console.log("AOC 2021 - Day 14: Extended Polymerization");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const template = data.shift();
    data.shift();
    const rules = {};
    const re = /(\w{2}) -> (\w)/;
    for (const line of data) {
        const [, pair, insert ] = re.exec(line);
        rules[pair] = insert;
    }
    //console.log(Object.values(rules).length);
    return [ template, rules ];
};

const task1 = ([polymerTemplate, rules]) => {
    let template = polymerTemplate;
    for (let step = 0; step < 10; step++) {
        let newTemplate = "";
        for (let i = 0; i < template.length - 1; i++) {
            let pair = template.substr(i, 2);
            let insert = rules[pair];
            newTemplate += pair[0] + insert;
        }
        template = newTemplate + template[template.length - 1];
    }
    let counter = {};
    for (let i = 0; i < template.length; i++) {
        let letter = template[i];
        count = counter[letter] || 0;
        counter[letter] = count + 1;
    }
    let max = Object.values(counter).max();
    let min = Object.values(counter).min();

    return max - min;
};

const task2 = ([template, rules]) => {
    let pairs = {};
    for (let i = 0; i < template.length - 1; i++) {
        let pair = template.substr(i, 2);
        pairs[pair] = pairs[pair] + 1 || 1;
    }
    for (let step = 0; step < 40; step++) {
        let newPairs = {};
        for (const pair of Object.keys(pairs)) {
            let insert = rules[pair];
            let first = pair[0] + insert;
            let second = insert + pair[1];
            let count = pairs[pair];
            newPairs[first] = newPairs[first] + count || count;
            newPairs[second] = newPairs[second] + count || count;
        }
        pairs = newPairs;
    }
    let counter = {};

    Object.keys(pairs).forEach(pair => {
        let letter = pair[0];
        count = counter[letter] || 0;
        counter[letter] = count + pairs[pair];
    });
    counter[template[template.length - 1]] = counter[template[template.length - 1]] + 1 || 1;
    let max = Object.values(counter).max();
    let min = Object.values(counter).min();

    return max - min;
};

let testdata = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 1588);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 2188189693529);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");