import { toMMV } from "../helpers/helpers.js";

export default {
  name: "alternating-sine-lines",
  draw: (settings) => {
    let { columns, rows, amplitude, frequency, multiplier } = settings;

    const makeSineLine = (amplitude, frequency, x, y) => {
      const points = [];
      for (let i = 0; i < columns; i++) {
        points.push(
          `${i * multiplier + x},${Math.sin(i * frequency) * amplitude + y}`,
        );
      }

      return `<polyline points="${points.join(" ")}" fill="none" />`;
    };

    const output = [];

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        output.push(
          makeSineLine(
            amplitude,
            frequency,
            row * multiplier,
            column * multiplier,
          ),
        );
      }
    }

    return output.join("\n");
  },

  settings: {
    // rotation: toMMV(0, 10),
    columns: toMMV(0, 100, 21),
    rows: toMMV(0, 100, 11),
    amplitude: toMMV(0, 200, -2),
    multiplier: toMMV(0, 10, 4),
    frequency: toMMV(0, 15, 6),
  },
};
