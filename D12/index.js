console.log("AOC 2021 - Day 12: Passage Pathing");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const map = {};
    const re = /(\w+)-(\w+)/;
    for (const line of data) {
        let [ , from, to ] = re.exec(line);
        if (from in map)
            map[from].push(to);
        else
            map[from] = [to];
        if (from !== "start" && to !== "end") {
            if (to in map)
            map[to].push(from);
        else
            map[to] = [ from ];
        }
    }
    return map;
};

const task1 = map => {
    let paths = [];
    paths.push(["start"]);
    while (!paths.every(path => path[path.length-1] === "end")) {
        path = paths.shift();
        if (path[path.length - 1] === "end") paths.push(path);
        else {
            let last = path[path.length - 1];
            let nexts = map[last];
            for (const next of nexts) {
                if (next.isUpper() || !path.includes(next))
                    paths.push(path.concat(next));
            }
        }
    }
    return paths.length;
};

const task2  = map => {
    let paths = [];
    paths.push(["start"]);
    while (!paths.every(path => path[path.length-1] === "end")) {
        path = paths.shift();
        if (path[path.length - 1] === "end") paths.push(path);
        else {
            let last = path[path.length - 1];
            let nexts = map[last];
            for (const next of nexts) {
                let smallTwice = new Set(path.filter(cave => cave.isLower())).size < path.filter(cave => cave.isLower()).length;
                if (next.isUpper() || !path.includes(next) || (!smallTwice && next !== "start"))
                    paths.push(path.concat(next));
            }
        }
    }
    return paths.length;
};

let testdata1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

let testdata2 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

testdata1 = prepare(splitLines(testdata1));
testdata2 = prepare(splitLines(testdata2));

console.log("Test data:");
console.log(testdata1);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata1), 10);
doEqualTest(task1(testdata2), 226);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata1), 36);
doEqualTest(task2(testdata2), 3509);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");