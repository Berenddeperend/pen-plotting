const json = Bun.file("./json/nono-puzzles.json");
const content = await json.json();
const puzzles = content
  .map((puzzle) => JSON.parse(puzzle.solution))
  .sort((a, b) => Math.round(Math.random() * -1));

const pixelSize = 10;

function puzzleToSvg(puzzle, yOffset = 0, xOffset = 0) {
  const cells = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      if (puzzle[y][x] !== "d") {
        continue;
      }
      cells.push(
        `
        <rect x="${x * pixelSize + xOffset}" y="${
          y * pixelSize + yOffset
        }" width="${pixelSize}" height="${pixelSize}"></rect>
      `.trim(),
      );
    }
  }
  return cells.join("\n");
}

function puzzleGrid(columns, rows) {
  const grid = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      grid.push(
        puzzleToSvg(
          puzzles[y * rows + x],
          y * pixelSize * 11,
          x * pixelSize * 11,
        ),
      );
    }
  }
  return grid.join("");
}

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000">${puzzleGrid(
  7,
  7,
)}</svg>
`;

Bun.write("svg/nono-puzzles.svg", svg);
