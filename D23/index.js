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

getPointsValue = pointsObj => {
    let score = 0;
    for (const [type, points] of Object.entries(pointsObj)) {
        score += points * scores[type - 1];
    }
    return score;
}

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

const logPoints = (steps, newPoints, state, points) => {
    if (getPointsValue(newPoints) === 50172) console.log(steps, getPointsValue(newPoints), state, getPointsValue(points));
    // out due to rewriting values
}
/*
const logPoints = (steps, newPoints, state, points) => {
    //if (steps === 18 && newPoints === 13834) console.log(steps, newPoints, state, points);
    //if (steps === 28 && newPoints === 49489) console.log(steps, newPoints, state, points);
    //if (steps === 28 && newPoints === 49504) console.log(steps, newPoints, state, points);
    //if (steps === 28 && newPoints === 45494) console.log(steps, newPoints, state, points);
    //if (steps === 28 && newPoints === 45509) console.log(steps, newPoints, state, points);
    //if (steps === 28 && newPoints === 47494) console.log(steps, newPoints, state, points);
    //if (steps === 28 && newPoints === 47509) console.log(steps, newPoints, state, points);
    //if (steps === 28 && newPoints === 42514) console.log(steps, newPoints, state, points);
    //if (steps === 29 && newPoints === 49494) console.log(steps, newPoints, state, points);
    //if (steps === 29 && newPoints === 49509) console.log(steps, newPoints, state, points);
    //if (steps === 29 && newPoints === 49515) console.log(steps, newPoints, state, points);
    //if (steps === 29 && newPoints === 45514) console.log(steps, newPoints, state, points);
    //if (steps === 29 && newPoints === 47514) console.log(steps, newPoints, state, points);
    //if (steps === 30 && newPoints === 49514) console.log(steps, newPoints, state, points);
    //if (steps === 30 && newPoints === 49526) console.log(steps, newPoints, state, points);
    //if (steps === 30 && newPoints === 49519) console.log(steps, newPoints, state, points);
    //if (steps === 31 && newPoints === 49523) console.log(steps, newPoints, state, points);
    //if (steps === 31 && newPoints === 49529) console.log(steps, newPoints, state, points);
    //if (newPoints === 49532) console.log(steps, newPoints, state, points);
}*/

const task = (initialRooms, roomSize) => {

    let allScores = [];
    
    const countAmphipodSteps = (roomN, hallIndex, room) => {
        let inside = roomSize - room.length;
        let outside = stepsInto[roomN][hallIndex];
        return inside + outside;
    }

    const isFinal = (a, b, c, d) => {
        return a === "1".repeat(roomSize) && b === "2".repeat(roomSize) && c === "3".repeat(roomSize) && d === "4".repeat(roomSize);
    };

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

    const findState = (initialRooms, finalScores, finalSteps) => {
        let reverseScores = new Set();
        let states = {};
        states[buildStateString(initialRooms, hallway)] = { 1: 0, 2: 0, 3: 0, 4: 0 };
        let steps = 0;
        while (Object.keys(states).length > 0) {
            steps++;
            console.log(steps, finalSteps)
            if (steps > finalSteps) break;
            let newStates = {};
            for (const [state, points] of Object.entries(states)) {
                let [rooms, hallway] = state.split("_");
                rooms = rooms.split("-");
                
                let newPoints;
                hallway.split("").map(Number).forEach((amphipod, hallPosIndex) => {
                    if (amphipod === 0) return;
                    if (canGoInside(rooms[amphipod - 1], amphipod) && isLegal(amphipod, hallPosIndex, hallway)) {
                        let newRooms = [...rooms];
                        let newRoom = amphipod + rooms[amphipod - 1];
                        newRooms[amphipod - 1] = newRoom;
                        let newHallway = hallway.setCharAt(hallPosIndex, "0");
                        newPoints = { ...points };
                        newPoints[amphipod] += countAmphipodSteps(amphipod - 1, hallPosIndex, rooms[amphipod - 1]);
                        if (finalScores.has(buildStateString(newRooms, newHallway) + "_" + getPointsValue(newPoints))) reverseScores.add( state + "_" + getPointsValue(points));
                        if (isFinal(...newRooms)) {
                            console.log(newPoints);
                            console.log(getPointsValue(newPoints));
                            allScores.push(getPointsValue(newPoints));
                        }
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
                            newPoints = { ...points };
                            newPoints[amphipod] += countAmphipodSteps(rIndex, hallIndex, newRoom);
                            if (finalScores.has(buildStateString(newRooms, newHallway) + "_" + getPointsValue(newPoints))) reverseScores.add( state + "_" + getPointsValue(points));
                            logPoints(steps, newPoints, state, points);
                            newStates = setState(newStates, buildStateString(newRooms, newHallway), newPoints);
                        })
                    }
                })
            }
            states = newStates;
        }
        return reverseScores;
    };

    
    let stepStates = [];
    let reverseScores = new Set(["1111-2222-3333-4444_0000000_" + 49532]);
    for (let totalSteps = 32; totalSteps > 0; totalSteps--) {
        reverseScores = findState(initialRooms, reverseScores, totalSteps);
        stepStates.unshift(reverseScores);
    }
    //findState(initialRooms, 49532, 32);

    console.log(stepStates);
    console.log(allScores);
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