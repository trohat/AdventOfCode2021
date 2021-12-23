console.log("AOC 2021 - Day 23: Amphipod");

const prepare = data => {
    if (data === "test") {
        return ["21", "34", "23", "41"];
    }
    return ["32", "23", "14", "41"];
};

const stepsInto = [[2, 1, 1, 3, 5, 7, 8],
[4, 3, 1, 1, 3, 5, 6],
[6, 5, 3, 1, 1, 3, 4],
[8, 7, 5, 3, 1, 1, 2]];

const scores = [1, 10, 100, 1000];

const buildStateString = (rooms, hallway) => {
    return rooms.join("-") + "_" + hallway;
}

const isLegal = (roomN, hallPosIndex, hallway) => {
    let partOfHall;
    if (hallPosIndex <= roomN) partOfHall = hallway.slice(hallPosIndex + 1, roomN + 1);
    else partOfHall = hallway.slice(roomN + 1, hallPosIndex);
    return partOfHall.split("").every(x => x === "0");
};

const canGoInside = (cave, caveN) => cave.split("").every(a => +a === caveN);
const isClean = canGoInside;

const task = (initialRooms, roomSize) => {

    const countSteps = (roomN, hallIndex, room) => {
        let inside = roomSize - room.length;
        let outside = stepsInto[roomN][hallIndex];
        return inside + outside;
    }

    const isFinal = (a, b, c, d) => {
        return a === "1".repeat(roomSize) && b === "2".repeat(roomSize) && c === "3".repeat(roomSize) && d === "4".repeat(roomSize);
    };

    getPointsValue = pointsObj => {
        let score = 0;
        for (const [ type, points ] of Object.entries(pointsObj)) {
            score += points * scores[type - 1];
        }
        return score;
    }

    const setState = (newStates, key, value) => {
        if (key in newStates) {
            let oldValue = getPointsValue(newStates[key]);
            let newValue = getPointsValue(value);
            if (newValue < oldValue) newStates[key] = value;
        }
        else newStates[key] = value;
        return newStates;
    }

    let hallway = zeros(7).join("");
    let allScores = [];
    let states = {};
    states[buildStateString(initialRooms, hallway)] = { 1: 0, 2: 0, 3: 0, 4: 0 };
    let steps = 0;
    while (Object.keys(states).length > 0) {
        steps++;
        let newStates = {};
        for (const [state, points] of Object.entries(states)) {
            let [rooms, hallway] = state.split("_");
            rooms = rooms.split("-");
            if (isFinal(...rooms)) {
                console.log(points);
                allScores.push(getPointsValue(points));
                continue;
            }
            let newPoints;
            hallway.split("").map(Number).forEach((amphipod, hallPosIndex) => {
                if (amphipod === 0) return;
                if (canGoInside(rooms[amphipod - 1], amphipod) && isLegal(amphipod, hallPosIndex, hallway)) {
                    let newRooms = [...rooms];
                    let newRoom = amphipod + rooms[amphipod - 1];
                    newRooms[amphipod - 1] = newRoom;
                    let newHallway = hallway.setCharAt(hallPosIndex, "0");
                    newPoints = {...points};
                    newPoints[amphipod] += countSteps(amphipod - 1, hallPosIndex, rooms[amphipod - 1]);
                    newStates = setState(newStates, buildStateString(newRooms, newHallway), newPoints);
                }
            });
            rooms.forEach((room, rIndex) => {
                if (isClean(room, rIndex + 1)) return;
                else {
                    let amphipod = +room.at(0);
                    let newRoom = room.slice(1);
                    hallway.split("").map(Number).forEach((hallPos, hallIndex) => {
                        if (hallPos !== 0) return;
                        if (!isLegal(rIndex + 1, hallIndex, hallway)) return;
                        let newHallway = hallway.setCharAt(hallIndex, amphipod);
                        let newRooms = [...rooms];
                        newRooms[rIndex] = newRoom;
                        newPoints = {...points};
                        newPoints[amphipod] += countSteps(rIndex, hallIndex, newRoom);
                        newStates = setState(newStates, buildStateString(newRooms, newHallway), newPoints);
                    })
                }
            })
        }
        states = newStates;
    }
    return allScores.min();
};

const task1 = data => {
    return task(data, 2);
}

const task2 = data => {
    let insert = ["44", "32", "21", "13"];
    data = data.map((d, i) => d.at(0) + insert[i] + d.at(1));
    return task(data, 4);
}

testdata = prepare("test");

console.log("Test data:");
console.log(testdata);

inputdata = prepare();

console.log("Input data:");
console.log(inputdata);

console.log("");

//doEqualTest(task1(testdata), 12521);

console.time("Task 1");
//console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

//doEqualTest(task2(testdata), 44169);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");