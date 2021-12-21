console.log("AOC 2021 - Day 21: Dirac Dice");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    return [4, 8];
};

const prepare2 = data => {
    return [2, 7];
};

const task1 = startingPositions => {
    let mod10 = score => {
        if (score % 10 === 0) return 10;
        return score % 10;
    }
    let die = 0;
    let player1Score = 0;
    let player2Score = 0;
    let player1Position = startingPositions[0];
    let player2Position = startingPositions[1];
    let player1Playing = true;
    while (player1Score < 1000 && player2Score < 1000) {
        let score = 0;
        for (let i = 0; i < 3; i++) {
            die++;
            score += die;
        }
        if (player1Playing) {
            player1Position = mod10(player1Position + score);
            player1Score += player1Position;
        }
        else {
            player2Position = mod10(player2Position + score);
            player2Score += player2Position;
        }
        player1Playing = !player1Playing;
    }
    return [player1Score, player2Score].min() * die;
};

const task2 = startingPositions => {
    let mod10 = score => {
        if (score % 10 === 0) return 10;
        return score % 10;
    }
    let endScore = 21;
    let scores = { [`0,0,${startingPositions[0]},${startingPositions[1]}`]: 1 };
    let player1Playing = true;
    while (true) {
        let possibleDie = {
            3: 1,
            4: 3,
            5: 6,
            6: 7,
            7: 6,
            8: 3,
            9: 1
        }
        let newScores = [];
        for (let [playerString, games] of Object.entries(scores)) {
            let [p1, p2, p1Pos, p2Pos] = playerString.split(",").map(Number);
            if (p1 >= endScore || p2 >= endScore) {
                newScores[playerString] = newScores[playerString] || 0;
                newScores[playerString] += games;
            }
            else {
                for (const [die, times] of Object.entries(possibleDie)) {
                    if (player1Playing) {
                        let p1Position = mod10(p1Pos + +die);
                        let p1Score = p1 + p1Position;
                        let playerStr = `${p1Score},${p2},${p1Position},${p2Pos}`;
                        newScores[playerStr] = newScores[playerStr] || 0;
                        newScores[playerStr] += games * times;
                    } else {
                        let p2Position = mod10(p2Pos + +die);
                        let p2Score = p2 + p2Position;
                        let playerStr = `${p1},${p2Score},${p1Pos},${p2Position}`;
                        newScores[playerStr] = newScores[playerStr] || 0;
                        newScores[playerStr] += games * times;
                    }
                }
            }
        }
        scores = newScores;
        player1Playing = !player1Playing;
        if (Object.keys(scores).every( string => {
            let [p1, p2] = string.split(",").map(Number);
            if (p1 >= endScore || p2 >= endScore) return true;
            return false;
        })) break;
    }
    p1Wins = 0;
    p2Wins = 0;
    for (const [result, times] of Object.entries(scores)) {
        let [p1] = result.split(",").map(Number);
        if (p1 >= endScore) p1Wins += times;
        else p2Wins += times;
    }
    return [p1Wins, p2Wins].max();
};

let testdata = `Player 1 starting position: 4
Player 2 starting position: 8`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare2(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 739785);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 444356092776315);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");