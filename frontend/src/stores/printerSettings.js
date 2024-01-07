import { defineStore } from "pinia";
import { toMMV } from "../helpers/helpers.js";

import { useLocalStorage } from "@vueuse/core";

export const usePrinterSettings = defineStore("printerSettings", () => {
  const paperSize = useLocalStorage("paperSize", "a5");
  const orientation = useLocalStorage("orientation", "portrait");
  const paddingInMM = useLocalStorage("paddingInMM", toMMV(0, 50, 30));
  const penWidthInMM = useLocalStorage("penWidthInMM", toMMV(0, 100, 40));

  return { paddingInMM, paperSize, orientation, penWidthInMM };
});
