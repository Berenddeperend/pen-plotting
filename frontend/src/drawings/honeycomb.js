import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";

export default {
  name: "honeycomb",
  draw: (settings) => {
    let { columns, rows, segments, multiplier } = toRaw(settings);

    const output = [];

    for (let column = 0; column < columns; column++) {
      const lineSegments = []; // should be a string, like `100,34`

      for (let segment = 0; segment < segments; segment++) {
        // const movedX = segment % 2 ? column * multiplier : column * -multiplier;
        // console.log(movedX);
        // lineSegments.push(`${movedX},${segment * multiplier}`);
        // lineSegments.push(`${movedX},${segment * 2 * multiplier}`);
        // lineSegments.push(`${0},${segment * 3 * multiplier}`);
        // lineSegments.push(`${0},${segment * 4 * multiplier}`);
        // lineSegments.push(`${movedX},${segment * 5 * multiplier}`);
        // lineSegments.push(
        //   `${column * 10 + (segment % 2 ? multiplier : -multiplier)},${
        //     segment * multiplier
        //   }`,
        // );
      }

      output.push(
        `<polyline points="${lineSegments.join(
          " ",
        )}" fill="none" stroke="black"></polyline>`,
      );
    }

    return output.join("\n");
  },

  settings: {
    columns: toMMV(0, 100, 2),
    multiplier: toMMV(0, 10),
    segments: toMMV(1, 30, 3),
  },
};
