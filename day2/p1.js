const fs = require("fs");
const filePath = "./input.txt";
const data = fs.readFileSync(filePath, "utf8");

const input = data.split("\n");

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const possibleGames = [];
let sum = 0;

const checkPossible = (count, colour) => {
    switch (colour) {
        case "red":
            return count <= maxRed;

        case "green":
            return count <= maxGreen;

        case "blue":
            return count <= maxBlue;

        default:
            return false;
    }
};

for (const game of input) {
    const inputArr = game.split(":");

    const gameNum = Number(inputArr[0].split(" ")[1]);
    const eachSet = inputArr[1].split(";");
    let allSetsData = [];
    let isPossible = true;

    for (const set of eachSet) {
        allSetsData = [...allSetsData, ...set.split(",")];
    }

    allSetsData = allSetsData.map((str) => str.trim());

    for (const eachData of allSetsData) {
        let cubeCount = Number(eachData.split(" ")[0]);
        let cubeColour = eachData.split(" ")[1];

        isPossible = checkPossible(cubeCount, cubeColour);
        if (!isPossible) {
            break;
        }
    }

    if (isPossible) {
        possibleGames.push(gameNum);
        sum += gameNum;
    }
}

console.log(possibleGames);
console.log(sum);
