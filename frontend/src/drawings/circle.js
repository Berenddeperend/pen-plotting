import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { line, curveBasisClosed } from "d3";

export default {
  name: "circle",
  draw: (settings) => {
    let { radius, count } = toRaw(settings);

    const output = [];

    for (let innerCount = 0; innerCount < count; innerCount++) {
      const data = [];
      for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) / innerCount) {
        data.push([radius * Math.cos(i), radius * Math.sin(i)]);
      }
      data.push(data[0]);

      output.push(
        `<path d="${line()(
          data,
        )}" stroke-opacity="0.1" transform="translate(${radius} ${radius})" fill="none" />`,
      );
    }

    return output.join("\n");
  },

  settings: {
    radius: toMMV(0, 300),
    count: toMMV(0, 50),
  },
};
