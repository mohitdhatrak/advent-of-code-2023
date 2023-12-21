const fs = require("fs");
const filePath = "./input.txt";
const data = fs.readFileSync(filePath, "utf8");

const input = data.split("\n");

let sum = 0;
let cardCopies = {};

for (let i = 0; i < input.length; i++) {
    const cardNum = i + 1;
    cardCopies[cardNum] = 1; // 1 original card for all
}

for (let i = 0; i < input.length; i++) {
    const cardNum = i + 1;
    const card = input[i].trim();
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

    for (let k = cardCopies[cardNum]; k > 0; k--) {
        for (let j = 0, index = cardNum + 1; j < count; j++, index++) {
            cardCopies[index] += 1;
        }
    }
}

for (let i = 0; i < input.length; i++) {
    const cardNum = i + 1;
    sum += cardCopies[cardNum];
}

console.log(cardCopies);
console.log(sum);
