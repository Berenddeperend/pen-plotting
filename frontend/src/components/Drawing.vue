<script setup>
import { computed, ref, watch } from "vue";
import RangeSlider from "./RangeSlider.vue";
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";
import { usePrinterSettings } from "../stores/printerSettings.js";
import { paperSizeMapping } from "../helpers/helpers.js";

const importedDrawing = ref();
const settings = ref();
const svgElement = ref();

const globalSettings = useGlobalSettings();
const printerSettings = usePrinterSettings();

const { paddingInMM, penWidthInMM, size, orientation } =
  storeToRefs(printerSettings);
const { selectedDrawing, drawings } = storeToRefs(globalSettings);

const asyncImport = async () => {
  importedDrawing.value = await import(
    /* @vite-ignore */
    `./../drawings/${selectedDrawing.value}`
  );
  settings.value = importedDrawing.value.default.settings;
};

watch(
  () => selectedDrawing.value,
  () => {
    asyncImport();
  },
);

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

asyncImport();

const toValues = (mmvObj) => {
  return Object.entries(mmvObj).reduce((acc, [key, value]) => {
    acc[key] = value.value;
    return acc;
  }, {});
};

const print = () => {
  fetch("http://localhost:8080/print", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      svg: svgElement.value.outerHTML,
    }),
  });
};
</script>

<template>
  <div class="controls">
    <RangeSlider
      v-if="settings"
      v-for="(settingValue, settingKey) in settings"
      :key="settingKey"
      :name="settingKey"
      v-model="settings[settingKey]"
    />
    <button @click="print">Print</button>
  </div>

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
