<script setup>
import { computed, ref, watch } from "vue";
import RangeSlider from "./RangeSlider.vue";
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";
import { usePrinterSettings } from "../stores/printerSettings.js";
import { paperSizeMapping } from "../helpers/helpers.js";

// const importedDrawing = ref();
// const settings = ref();
// const svgElement = ref();

const globalSettings = useGlobalSettings();
const printerSettings = usePrinterSettings();

const { paddingInMM, penWidthInMM, size, orientation } =
  storeToRefs(printerSettings);
const { selectedDrawing, drawings, settings, importedDrawing } =
  storeToRefs(globalSettings);

const multiplier = 3.7795275591;

const canvasWidth = computed(() => {
  return orientation.value === "portrait"
    ? paperSizeMapping[size.value].width - 2 * paddingInMM.value.value
    : paperSizeMapping[size.value].height - 2 * paddingInMM.value.value;
});

const canvasHeight = computed(() => {
  return orientation.value === "portrait"
    ? paperSizeMapping[size.value].height - 2 * paddingInMM.value.value
    : paperSizeMapping[size.value].width - 2 * paddingInMM.value.value;
});

// asyncImport();

const toValues = (mmvObj) => {
  return Object.entries(mmvObj).reduce((acc, [key, value]) => {
    acc[key] = value.value;
    return acc;
  }, {});
};
</script>

<template>
  <svg
    v-if="importedDrawing"
    id="svg"
    xmlns="http://www.w3.org/2000/svg"
    :width="canvasWidth * multiplier"
    :height="canvasHeight * multiplier"
    ref="svgElement"
    :style="{
      'stroke-width': multiplier * penWidthInMM + 'px',
      padding: multiplier * paddingInMM.value + 'px',
    }"
    v-html="importedDrawing.default.draw(toValues(settings))"
  ></svg>
</template>

<style>
#svg {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

#svg path,
#svg line {
  stroke: slategray;
}
</style>
