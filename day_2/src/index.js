const fs = require("fs");
const readline = require("readline");

async function processFileLines(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Handles both Windows (\r\n) and Unix (\n) line endings
  });

  let array = [];
  let sumArr = new Set();

  for await (const line of rl) {
    array = line.split(",");
    for (let i = 0; i < array.length; i++) {
      let newArray = array[i].split("-");
      console.log(`From ${newArray[0]} to ${newArray[1]}`);
      for (let j = parseInt(newArray[0]); j <= parseInt(newArray[1]); j++) {
        // if (j.toString().length % 2 === 0) {
        //   let firstHalf = j.toString().slice(0, j.toString().length / 2);
        //   let secondHalf = j.toString().slice(j.toString().length / 2);
        //   if (firstHalf === secondHalf) {
        //     console.log(`Found matching number: ${j}`);
        //     sum = sum + j;
        //   }
        // } else {
        if (checkPrime(j.toString().length)) {
          if (
            j
              .toString()
              .split("")
              .every((char) => char === j.toString()[0])
          ) {
            console.log(`All characters are the same in number: ${j}`);
            // sum = sum + j;
            sumArr.add(j);
          }
        } else {
          let divisors = [];
          for (let k = 2; k < j.toString().length; k++) {
            if (j.toString().length % k === 0) {
              divisors.push(k);
            }
          }
          divisors.forEach((divisor) => {
            // if (j.toString().length % divisor === 0) {
            let parts = [];
            for (let l = 0; l < j.toString().length; l += divisor) {
              parts.push(j.toString().slice(l, l + divisor));
            }
            if (parts.every((part) => part === parts[0])) {
              console.log(`All parts are the same in number: ${j}`);
              //   sum = sum + j;
              sumArr.add(j);
            }
            // }
          });
        }
        // }
      }
    }
  }
  let sum = 0;
  for (let number of sumArr) {
    sum += number;
  }
  console.log(`Total Sum: ${sum}`);
}

function checkPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Call the function with the path to your file
processFileLines("../inputs/input_1.txt").catch(console.error);
