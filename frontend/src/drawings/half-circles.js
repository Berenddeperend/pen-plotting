import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { arc } from "d3";
import { randomUniform, randomInt } from "d3-random";

export default {
  name: "half-circles",
  draw: (settings) => {
    let { columns, radius, multiplier, rows } = toRaw(settings);

    const makeHalfCircle = (radius, x, y, rotation = 0) => {
      const arcGenerator = arc()
        .outerRadius(radius)
        .innerRadius(radius)
        .startAngle(-Math.PI / 2 + (Math.PI / 2) * rotation)
        .endAngle(Math.PI / 2 + (Math.PI / 2) * rotation);

      return `<path transform="translate(${x}, ${y})" d="${arcGenerator()}" fill="none" />`;
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
    columns: toMMV(0, 100, 16),
    rows: toMMV(0, 100, 11),
    radius: toMMV(0, 200, 6),
    multiplier: toMMV(0, 15),
  },
};
