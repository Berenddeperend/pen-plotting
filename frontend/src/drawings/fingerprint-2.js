import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { arc } from "d3";
import { randomUniform, randomInt } from "d3-random";

export default {
  name: "fingerprint",
  draw: (settings) => {
    let { columns, radius, rows, gap, ringCount, rotation } = toRaw(settings);

    const makeHalfCircle = (radius, x, y, rotation = 0) => {
      const arcGenerator = arc()
        .outerRadius(radius)
        .innerRadius(radius)
        .startAngle(-Math.PI / 2 + (Math.PI / 2) * rotation)
        .endAngle(Math.PI / 2 + (Math.PI / 2) * rotation);

      return `<path transform="translate(${x}, ${y})" d="${arcGenerator()}" fill="none" />`;
    };

    const output = [];

    for (let i = 0; i < ringCount; i++) {
      output.push(
        makeHalfCircle(
          radius * (1 - i / ringCount),
          radius / 2,
          radius,
          rotation,
        ),
      );

      output.push(
        makeHalfCircle(
          radius * (1 - i / ringCount),
          radius,
          radius,
          rotation + 2,
        ),
      );
    }

    return output.join("\n");
  },

  settings: {
    rotation: toMMV(0, 4),
    columns: toMMV(0, 100, 4),
    rows: toMMV(0, 100, 6),
    radius: toMMV(0, 200, 44),
    ringCount: toMMV(0, 40, 24),
    gap: toMMV(0, 50, 0),
  },
};
