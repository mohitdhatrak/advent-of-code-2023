const fs = require("fs");
const filePath = "./input.txt";
const data = fs.readFileSync(filePath, "utf8");

const input = data.split("\n");

// store part numbers as {} every part number in line number {} and start index of number as key
const partNumbers = {};
const gearNumbers = [];
let sum = 0;

const checkNumber = (char) => /\d/.test(char);
const checkDot = (char) => char === ".";
const checkStar = (char) => char === "*";

const checkNeighbours = (left, right, up, down, currentLine) => {
    // checking left and right for dots
    if (left !== -1) {
        if (!checkDot(currentLine[left])) {
            // i.e. one of the neighbours is not a dot, so return true as it is part number
            return true;
        }
    }
    if (right !== -1) {
        if (!checkDot(currentLine[right])) {
            return true;
        }
    }

    // checking up, down and diagonals for dots
    const start = left === -1 ? 0 : left;
    const end = right === -1 ? currentLine.length - 1 : right;
    for (let i = start; i <= end; i++) {
        if (up !== -1) {
            if (!checkDot(input[up][i])) {
                return true;
            }
        }
        if (down !== -1) {
            if (!checkDot(input[down][i])) {
                return true;
            }
        }
    }

    return false; // as all neighbours are dots, so return false as it is not a part number
};

const checkGears = (left, right, up, down, currentLine) => {
    const arr = [];
    const lineNum = up === -1 ? down - 1 : up + 1;

    if (left !== -1) {
        if (checkNumber(currentLine[left])) {
            let i = left;
            let index = left;
            while (checkNumber(currentLine[--i])) {
                index = i;
            }
            arr.push(partNumbers[lineNum][index]);
        }
    }
    if (right !== -1) {
        if (checkNumber(currentLine[right])) {
            arr.push(partNumbers[lineNum][right]);
        }
    }

    const start = left === -1 ? 0 : left;
    const end = right === -1 ? currentLine.length - 1 : right;
    let upIndex = -1;
    let downIndex = -1;
    for (let i = start; i <= end; i++) {
        if (up !== -1) {
            if (checkNumber(input[up][i])) {
                let j = i;
                let index = i;
                while (checkNumber(input[up][--j])) {
                    index = j;
                }
                if (upIndex === -1) {
                    upIndex = index;
                    arr.push(partNumbers[up][index]);
                }
                if (upIndex !== index) {
                    arr.push(partNumbers[up][index]);
                }
            }
        }
        if (down !== -1) {
            if (checkNumber(input[down][i])) {
                let j = i;
                let index = i;
                while (checkNumber(input[down][--j])) {
                    index = j;
                }
                if (downIndex === -1) {
                    downIndex = index;
                    arr.push(partNumbers[down][index]);
                }
                if (downIndex !== index) {
                    arr.push(partNumbers[down][index]);
                }
            }
        }
    }

    if (arr.length === 2) {
        gearNumbers.push(arr);
    }
};

for (let i = 0; i < input.length; i++) {
    const currentLine = input[i].trim();
    let left = -1;
    let right = -1;
    let up = i - 1 >= 0 ? i - 1 : -1;
    let down = i + 1 < input.length ? i + 1 : -1;

    for (let j = 0; j < currentLine.length; j++) {
        let currentNum = "";

        if (checkNumber(currentLine[j])) {
            left = j - 1 >= 0 ? j - 1 : -1;
            right = j + 1 < currentLine.length ? j + 1 : -1;
            currentNum += currentLine[j];

            while (checkNumber(currentLine[++j])) {
                currentNum += currentLine[j];
                right = j + 1 < currentLine.length ? j + 1 : -1;
            }

            const isPartNumber = checkNeighbours(
                left,
                right,
                up,
                down,
                currentLine
            );

            if (isPartNumber) {
                const numLen = currentNum.length;
                const startIndex = j - numLen;
                const number = Number(currentNum);
                if (!partNumbers[i]) {
                    partNumbers[i] = {
                        [startIndex]: number,
                    };
                } else {
                    partNumbers[i] = {
                        ...partNumbers[i],
                        [startIndex]: number,
                    };
                }
            }
        }
    }
}

for (let i = 0; i < input.length; i++) {
    const currentLine = input[i].trim();
    let left = -1;
    let right = -1;
    let up = i - 1 >= 0 ? i - 1 : -1;
    let down = i + 1 < input.length ? i + 1 : -1;

    for (let j = 0; j < currentLine.length; j++) {
        if (checkStar(currentLine[j])) {
            left = j - 1 >= 0 ? j - 1 : -1;
            right = j + 1 < currentLine.length ? j + 1 : -1;
            checkGears(left, right, up, down, currentLine);
        }
    }
}

for (const gear of gearNumbers) {
    sum += gear[0] * gear[1];
}

// console.log(partNumbers);
console.log(gearNumbers);
console.log(sum);
