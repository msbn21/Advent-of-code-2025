const fs = require("fs");
const readline = require("readline");

async function processFileLines(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Handles both Windows (\r\n) and Unix (\n) line endings
  });

  let lineNumber = 0;
  let pointer = 50;
  let zeroCounter = 0;
  let prevPointer = 50;
  for await (const line of rl) {
    lineNumber++;
    // Perform an action on each line
    console.log(`Line ${lineNumber}: ${line}`);
    if (line[0] === "L") {
      prevPointer = pointer;
      pointer = pointer - parseInt(line.slice(1));
      while (pointer < 0) {
        pointer = pointer + 100;
        if (prevPointer !== 0) {
          zeroCounter++;
        }
        prevPointer = pointer;
        continue;
      }
      if (pointer >= 100) {
        zeroCounter = zeroCounter + Math.floor(pointer / 100);
        pointer = pointer % 100;
      } else if (pointer === 0) {
        zeroCounter++;
      }
    } else if (line[0] === "R") {
      prevPointer = pointer;
      pointer = pointer + parseInt(line.slice(1));
      if (pointer < 0) {
        pointer = pointer * -1;
      } else if (pointer >= 100) {
        zeroCounter = zeroCounter + Math.floor(pointer / 100);
        pointer = pointer % 100;
      } else if (pointer === 0) {
        zeroCounter++;
      }
    }
    console.log(`Current pointer: ${pointer}`);
    console.log(`Current zeroCounter: ${zeroCounter}`);
  }
  console.log(`zeroCounter: ${zeroCounter}`);

  console.log("Finished processing file.");
}

// Call the function with the path to your file
processFileLines("../inputs/input_1.txt").catch(console.error);
