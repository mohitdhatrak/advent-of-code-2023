const fs = require("fs");
const filePath = "./input.txt";
const data = fs.readFileSync(filePath, "utf8");

const input = data.split("\n");

const partNumbers = [];
let sum = 0;

const checkNumber = (char) => /\d/.test(char);
const checkDot = (char) => char === ".";

const checkAllPossibleAdjacent = (left, right, up, down, currentLine) => {
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

            const isPartNumber = checkAllPossibleAdjacent(
                left,
                right,
                up,
                down,
                currentLine
            );

            if (isPartNumber) {
                const number = Number(currentNum);
                partNumbers.push(number);
                sum += number;
            }
        }
    }
}

console.log(partNumbers);
console.log(sum);
