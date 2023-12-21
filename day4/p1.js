const fs = require("fs");
const filePath = "./input.txt";
const data = fs.readFileSync(filePath, "utf8");

const input = data.split("\n");

let sum = 0;

for (const line of input) {
    const card = line.trim();
    const allNumbers = card.split(":")[1];
    const numberLists = allNumbers.split("|");
    const numList1 = numberLists[0].split(" ");
    const numList2 = numberLists[1].split(" ");

    const winningNumbers = numList1.filter((num) => num !== "");
    const numbersWeHave = numList2.filter((num) => num !== "");

    let count = 0;
    for (const num of numbersWeHave) {
        if (winningNumbers.includes(num)) {
            count++;
        }
    }

    let points = 0;
    if (count !== 0) {
        points = 1;
    }
    while (count > 1) {
        points *= 2;
        count--;
    }
    console.log(points);
    sum += points;
}

console.log(sum);
