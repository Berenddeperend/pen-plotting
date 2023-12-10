import { defineStore } from "pinia";
import { ref } from "vue";
import { toMMV } from "../helpers/helpers.js";

import { useLocalStorage } from "@vueuse/core";

export const usePrinterSettings = defineStore("printerSettings", () => {
  const size = useLocalStorage("size", "a5");
  const orientation = useLocalStorage("orientation", "portrait");
  const paddingInMM = useLocalStorage("paddingInMM", toMMV(0, 100, 30));
  const penWidthInMM = useLocalStorage("penWidthInMM", 0.4);

  return { paddingInMM, size, orientation, penWidthInMM };
});
