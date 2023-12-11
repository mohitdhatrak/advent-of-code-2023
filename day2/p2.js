const fs = require("fs");
const filePath = "./input.txt";
const data = fs.readFileSync(filePath, "utf8");

const input = data.split("\n");

const powerOfSet = [];
let sum = 0;

for (const game of input) {
    const eachSet = game.split(":")[1].split(";");
    let allSetsData = [];
    let maxRed = 0; // as to get the minimum cubes for valid game, we need to pick the max cubes drawn in game
    let maxGreen = 0;
    let maxBlue = 0;

    for (const set of eachSet) {
        allSetsData = [...allSetsData, ...set.split(",")];
    }

    allSetsData = allSetsData.map((str) => str.trim());

    for (const eachData of allSetsData) {
        let cubeCount = Number(eachData.split(" ")[0]);
        let cubeColour = eachData.split(" ")[1];

        if (cubeColour === "red") {
            maxRed = cubeCount > maxRed ? cubeCount : maxRed;
        } else if (cubeColour === "green") {
            maxGreen = cubeCount > maxGreen ? cubeCount : maxGreen;
        } else if (cubeColour === "blue") {
            maxBlue = cubeCount > maxBlue ? cubeCount : maxBlue;
        }
    }

    let power = maxRed * maxGreen * maxBlue;
    powerOfSet.push(power);
    sum += power;
}

console.log(powerOfSet);
console.log(sum);
