// --- Arrays ---

Array.prototype.sum = function () {
    return this.reduce((a, b) => a + b, 0);
}

Array.prototype.max = function () {
    return Math.max(...this);
}

Array.prototype.min = function () {
    return Math.min(...this);
}

Array.prototype.countChar = function (char) {
    return this.reduce((accumulator, str) => accumulator + str.split(char).length - 1, 0);
}

Array.prototype.compare = function (arr2) {
    if (this.length !== arr2.length) return false;
    let same = true;
    this.forEach((field, index) => {
        if (field !== arr2[index]) same = false;
    })
    return same;
}

Array.prototype.intersection = function (arrB) {
    return this.filter(el => arrB.includes(el));
}

// sorted union with eliminated duplicates
Array.prototype.union = function (arrB) {
    return [...new Set([...this, ...arrB])].sort();
}

// next 3 are jigsaw operations (first used in 2020 day 20)
// rotations work both for array of strings and array of arrays
Array.prototype.rotateRight = function() {
    let newTile = [];
    for (let i = 0; i < this[0].length; i++) {
        newTile.push("");
    }
    for (const line of this) {
        for (let i = 0; i < line.length; i++) {
            if (Array.isArray(line)) newTile[i] = [line[i], ...newTile[i]];
            else newTile[i] = line.charAt(i) + newTile[i];
        }   
    }
    return newTile;
}

Array.prototype.rotateLeft = function() {
    return this.rotateRight().rotateRight().rotateRight();
}

Array.prototype.flip = function() {
    let newTile = [];
    for (const line of this) { 
        newTile.push(line.reverse());
    }
    return newTile;
}

// --- Strings ---

// str.isupper()
String.prototype.isUpper = function () {
    return this.toUpperCase() == this;
}

// str.islower()
String.prototype.isLower = function () {
    return this.toLowerCase() == this;
}

String.prototype.countChar = function (char) {
    return this.split(char).length - 1;
}

String.prototype.setCharAt = function (index, char) {
    return this.substring(0, index) + char + this.substring(index + 1);
}

String.prototype.reverse = function() {
    return this.split("").reverse().join("");
}

// --- Others ---

let chr = String.fromCharCode;

let ord = str => str.charCodeAt(0);

// numpy.zeros()
const zeros = length => Array.from({ length }).map(() => 0);

// combinatorics
const getAllPermutations = (arr) => {
    if (arr.length === 1) return [[...arr]];
    const permutations = [];
    arr.forEach((d, index) => {
        let newArr = [...arr];
        newArr.splice(index, 1);
        getAllPermutations(newArr).forEach((newD) => {
            permutations.push([d, ...newD]);
        });
    });
    return permutations;
};