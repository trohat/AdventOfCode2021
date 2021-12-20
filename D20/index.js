console.log("AOC 2021 - Day 20: Trench Map");

const splitLines = data => data.split(String.fromCharCode(10) + String.fromCharCode(10));

const prepare = data => {
    let algorithm = data[0];
    let inputImage = data[1];
    let image = new Set();
    inputImage = inputImage.split("\n")
    inputImage.forEach((line, lineIndex) => {
        line.split("").forEach((char, charIndex) => {
            if (char === "#")
                image.add([lineIndex, charIndex].toString());
        });
    })
    let imageSize = inputImage.length;
    return [algorithm, image, imageSize];
};

function* dirs(y, x) {
    yield [y - 1, x - 1];
    yield [y - 1, x];
    yield [y - 1, x + 1];
    yield [y, x - 1];
    yield [y, x];
    yield [y, x + 1];
    yield [y + 1, x - 1];
    yield [y + 1, x];
    yield [y + 1, x + 1];
}

const task = ([algorithm, image, imageSize], steps, test) => {
    let imageLow = -1;
    let imageHigh = imageSize;
    for (let step = 0; step < steps; step++) {
        let newImage = new Set();
        for (let i = imageLow; i <= imageHigh; i++) {
            for (let j = imageLow; j <= imageHigh; j++) {
                let IEAstring = "";
                for (const [y, x] of dirs(i, j)) {
                    if ((y > imageLow) && (y < imageHigh) && (x > imageLow) && (x < imageHigh)) {
                        if (image.has([y, x].toString())) IEAstring += "1";
                        else IEAstring += "0";
                    } else {
                        if ((step % 2 === 0) || test === "test") IEAstring += "0";
                        else IEAstring += "1";
                    }
                }
                let IEAn = parseInt(IEAstring, 2);
                let newPixel = algorithm.at(IEAn);
                if (newPixel === "#") newImage.add([i,j].toString());
            }
        }
        image = newImage;
        imageLow--;
        imageHigh++;
    }

    return image.size;
};

const task1 = (data, test = undefined) => {
    return task(data, 2, test);
};

const task2 = (data, test = undefined) => {
    return task(data, 50, test);
};

let testdata = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata, "test"), 35);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata, "test"), 3351);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");