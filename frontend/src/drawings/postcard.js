import { toRaw } from "vue";
import { paperSizeMapping, toMMV } from "../helpers/helpers.js";
import { storeToRefs } from "pinia";
import { usePrinterSettings } from "../stores/printerSettings.js";

const printerSettings = usePrinterSettings();
const { paddingXInMM, paddingYInMM, penWidthInMM, paperSize, orientation } =
  storeToRefs(printerSettings);

export default {
  name: "postcard",
  draw: (settings) => {
    console.log(orientation);
    let { spacingY, lineCount } = toRaw(settings);
    const width =
      orientation.value === "portrait"
        ? paperSizeMapping[paperSize.value]["width"]
        : paperSizeMapping[paperSize.value]["height"];

    const height =
      orientation.value === "portrait"
        ? paperSizeMapping[paperSize.value]["height"]
        : paperSizeMapping[paperSize.value]["width"];

    const verticalLine = `<line x1="${
      width / 2 - paddingXInMM.value.value
    } " x2="${width / 2 - paddingXInMM.value.value}" y1="0" y2="${
      height - paddingYInMM.value.value * 2
    }"></line>`;

    const output = [verticalLine];

    for (let i = 0; i < lineCount; i++) {
      output.push(`<line
        x1="${width / 2 + paddingXInMM.value.value / 4}" x2="${
          width - paddingXInMM.value.value * 2
        }"
        y1="${height / 2 + i * spacingY - paddingYInMM.value.value}"
        y2="${height / 2 + i * spacingY - paddingYInMM.value.value}"
      ></line>`);
    }

    return output.join("\n");
  },

  settings: {
    spacingY: toMMV(0, 200, 15),
    lineCount: toMMV(0, 10, 4),
  },
};
