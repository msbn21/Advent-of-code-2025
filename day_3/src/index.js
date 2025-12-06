const fs = require("fs");
const readline = require("readline");

function findLargestNumberIndexFromStringSlice(numStr, n) {
  let maxNumIndex = -1;
  let maxNum = -1;
  for (let i = 0; i <= numStr.length - n; i++) {
    if (parseInt(numStr[i]) > maxNum) {
      maxNum = parseInt(numStr[i]);
      maxNumIndex = i;
    }
  }
  return maxNumIndex;
}

async function processFileLines(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Handles both Windows (\r\n) and Unix (\n) line endings
  });

  let lineNumber = 0;
  let sum = 0;
  for await (const line of rl) {
    lineNumber++;
    let numStr = line.trim();
    let largest12DigitNum = "";
    let remPlaces = 12;
    while (remPlaces > 0) {
      let index = findLargestNumberIndexFromStringSlice(numStr, remPlaces);
      largest12DigitNum += numStr[index];
      numStr = numStr.slice(index + 1);
      remPlaces--;
    }
    sum += parseInt(largest12DigitNum);
    console.log(
      `Line ${lineNumber}: Largest 12-digit number is ${largest12DigitNum}`
    );
  }
  console.log(`Total sum of largest 12-digit numbers: ${sum}`);
}

// Call the function with the path to your file
processFileLines("../inputs/input_1.txt").catch(console.error);
