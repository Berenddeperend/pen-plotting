import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { arc } from "d3";
import { randomUniform, randomInt } from "d3-random";

export default {
  name: "bauhaus-half-circles",
  draw: (settings) => {
    let { columns, radius, rows, gap, ringCount, tilt } = toRaw(settings);

    const makeHalfCircle = (radius, x, y, rotation = 0) => {
      const arcGenerator = arc()
        .outerRadius(radius)
        .innerRadius(radius)
        .startAngle(-Math.PI / 2 + (Math.PI / 2) * rotation)
        .endAngle(Math.PI / 2 + (Math.PI / 2) * rotation);

      return `<path style="stroke: rgb(${x * 2}, ${
        y * 2
      }, 100)" transform="translate(${x}, ${y})" d="${arcGenerator()}" fill="none" />`;
    };

    const output = [];

    //
    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {
        for (let i = 0; i < ringCount; i++) {
          output.push(
            makeHalfCircle(
              radius * (1 - i / ringCount),
              column * radius * 2 + radius * gap * 0.1 * column,
              row * radius * 2 + radius * gap * 0.1 * row,
              (column % 2) * 2 + (row % 2) + tilt * 0.01,
            ),
          );
        }
      }
    }

    return output.join("\n");
  },

  settings: {
    // rotation: toMMV(0, 10),
    columns: toMMV(0, 100, 4),
    rows: toMMV(0, 100, 6),
    radius: toMMV(0, 200, 10),
    ringCount: toMMV(0, 40, 6),
    gap: toMMV(0, 50, 0),
    tilt: toMMV(0, 100, 0),
  },
};
