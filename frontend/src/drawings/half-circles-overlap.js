import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { arc } from "d3";
import { randomUniform, randomInt } from "d3-random";

export default {
  name: "half-circles-overlap",
  draw: (settings) => {
    let { columns, radius, multiplier, rows } = toRaw(settings);

    const makeHalfCircle = (radius, x, y, rotation = 0) => {
      const arcGenerator = arc()
        .outerRadius(radius)
        .innerRadius(radius)
        .startAngle(-Math.PI / 2 + (Math.PI / 2) * rotation)
        .endAngle(Math.PI / 2 + (Math.PI / 2) * rotation);

      return `<path stroke="black" transform="translate(${x / 2}, ${
        y / 2
      })" d="${arcGenerator()}" fill="none" />`;
    };

    const output = [];

    //
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        output.push(
          makeHalfCircle(
            radius,
            row * radius * 2,
            column * radius * 2,
            randomInt(4)(),
          ),
        );
      }
    }

    return output.join("\n");
  },

  settings: {
    // rotation: toMMV(0, 10),
    columns: toMMV(0, 100, 46),
    rows: toMMV(0, 100, 32),
    radius: toMMV(0, 200, 4),
    multiplier: toMMV(0, 15),
  },
};
