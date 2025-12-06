const fs = require("fs");
const readLine = require("readline");

function getAdjacentCountsForGrid(grid, row, col) {
  const R = grid.length;
  const C = grid[0].length;

  const adjacentCounts = {};

  const gridOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [dr, dc] of gridOffsets) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (newRow >= 0 && newRow < R && newCol >= 0 && newCol < C) {
      const neighborValue = grid[newRow][newCol];
      adjacentCounts[neighborValue] = (adjacentCounts[neighborValue] || 0) + 1;
    }
  }

  return adjacentCounts;
}

function getCounts(grid) {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    console.log(`Row is ${grid[0].join("")}`);
    for (let col = 0; col < grid[row].length; col++) {
      const counts = getAdjacentCountsForGrid(grid, row, col);
      console.log(
        `Cell (${row}, ${col}) with value '${grid[row][col]}' has adjacent counts:`,
        counts
      );
      const adjacentAtCount = counts["@"] || 0;
      if (adjacentAtCount < 4 && grid[row][col] === "@") {
        count++;
        grid[row][col] = ".";
      }
    }
  }
  return count;
}

async function processGridFile(filePath) {
  let rawInput = "";
  let finalCount = 0;

  try {
    rawInput = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file from disk: ${error}`);
    return;
  }

  const grid = rawInput
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  let iterationCount = getCounts(grid);
  while (iterationCount > 0) {
    finalCount += iterationCount;
    iterationCount = getCounts(grid);
  }

  console.log(`Total cells with fewer than 4 adjacent '@': ${finalCount}`);
}

// Call the function with the path to your file
processGridFile("../inputs/input_1.txt").catch(console.error);
