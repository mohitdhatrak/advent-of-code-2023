const fs = require("fs");
const filePath = "./input.txt";
const data = fs.readFileSync(filePath, "utf8");

const input = data.split("\n");

const output = [];
let sum = 0;

const startNumber = (str) => {
    if (
        str.startsWith("1") ||
        str.startsWith("2") ||
        str.startsWith("3") ||
        str.startsWith("4") ||
        str.startsWith("5") ||
        str.startsWith("6") ||
        str.startsWith("7") ||
        str.startsWith("8") ||
        str.startsWith("9")
    ) {
        return str[0];
    } else if (str.startsWith("one")) {
        return "1";
    } else if (str.startsWith("two")) {
        return "2";
    } else if (str.startsWith("three")) {
        return "3";
    } else if (str.startsWith("four")) {
        return "4";
    } else if (str.startsWith("five")) {
        return "5";
    } else if (str.startsWith("six")) {
        return "6";
    } else if (str.startsWith("seven")) {
        return "7";
    } else if (str.startsWith("eight")) {
        return "8";
    } else if (str.startsWith("nine")) {
        return "9";
    } else {
        return -1;
    }
};

const endNumber = (str) => {
    if (
        str.endsWith("1") ||
        str.endsWith("2") ||
        str.endsWith("3") ||
        str.endsWith("4") ||
        str.endsWith("5") ||
        str.endsWith("6") ||
        str.endsWith("7") ||
        str.endsWith("8") ||
        str.endsWith("9")
    ) {
        return str.slice(-1);
    } else if (str.endsWith("one")) {
        return "1";
    } else if (str.endsWith("two")) {
        return "2";
    } else if (str.endsWith("three")) {
        return "3";
    } else if (str.endsWith("four")) {
        return "4";
    } else if (str.endsWith("five")) {
        return "5";
    } else if (str.endsWith("six")) {
        return "6";
    } else if (str.endsWith("seven")) {
        return "7";
    } else if (str.endsWith("eight")) {
        return "8";
    } else if (str.endsWith("nine")) {
        return "9";
    } else {
        return -1;
    }
};

for (let i = 0; i < input.length; i++) {
    let str = input[i];
    let strCopy = str;
    let strLen = str.length;
    let start = -1;
    let end = -1;

    while (start === -1) {
        start = startNumber(str);
        if (start === -1) {
            str = str.slice(1);
        }
    }

    str = strCopy;

    while (end === -1) {
        end = endNumber(str);
        if (end === -1) {
            strLen--;
            str = str.substring(0, strLen);
        }
    }

    let requiredNum = start + end;
    output[i] = requiredNum; // storing as string in array
    sum += Number(requiredNum);
}

console.log(sum);
console.log(output);
