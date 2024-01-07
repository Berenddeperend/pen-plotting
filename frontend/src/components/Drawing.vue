<script setup>
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";
import { usePrinterSettings } from "../stores/printerSettings.js";
import { paperSizeMapping } from "../helpers/helpers.js";

const globalSettings = useGlobalSettings();
const printerSettings = usePrinterSettings();

const { paddingInMM, penWidthInMM, paperSize, orientation } =
  storeToRefs(printerSettings);
const {
  selectedDrawing,
  drawings,
  settings,
  importedDrawing,
  svgElement,
  zoomMultiplier,
} = storeToRefs(globalSettings);

const zoom = computed(() => {
  return zoomMultiplier.value.value / 100;
  // return 2;
});

const penWidth = computed(() => {
  return penWidthInMM.value.value / 100;
});

const canvasWidth = computed(() => {
  return orientation.value === "portrait"
    ? paperSizeMapping[paperSize.value].width // - 2 * paddingInMM.value.value
    : paperSizeMapping[paperSize.value].height; // - 2 * paddingInMM.value.value;
});

const canvasHeight = computed(() => {
  return orientation.value === "portrait"
    ? paperSizeMapping[paperSize.value].height //- 2 * paddingInMM.value.value
    : paperSizeMapping[paperSize.value].width; //- 2 * paddingInMM.value.value;
});

const canvasPadding = computed(() => {
  return paddingInMM.value.value;
});

const toValues = (mmvObj) => {
  return Object.entries(mmvObj).reduce((acc, [key, value]) => {
    acc[key] = value.value;
    return acc;
  }, {});
};
</script>

<template>
  <!--    :style="{ padding: canvasPadding + 'px', transform: `scale(${zoom})` }"-->
  <div class="page -z-10" :style="{ transform: `scale(${zoom})` }">
    <svg
      v-if="importedDrawing"
      id="svg"
      xmlns="http://www.w3.org/2000/svg"
      :width="canvasWidth + 'mm'"
      :viewBox="`${canvasPadding * -1} ${
        canvasPadding * -1
      } ${canvasWidth} ${canvasHeight}`"
      :height="canvasHeight + 'mm'"
      ref="svgElement"
      :style="{
        'stroke-width': penWidth + 'mm',
      }"
      v-html="importedDrawing.default.draw(toValues(settings))"
    ></svg>
  </div>
</template>

<style>
.page {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  transform-origin: top center;
}

#svg {
  box-sizing: content-box;
}

#svg path,
#svg line {
  stroke: slategray;
}
</style>
