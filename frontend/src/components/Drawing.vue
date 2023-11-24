<script setup>
import { ref, watch } from "vue";
import RangeSlider from "./RangeSlider.vue";

const importedDrawing = ref();
const settings = ref();
const svgElement = ref();

const props = defineProps(["selectedDrawing"]);

const asyncImport = async () => {
  importedDrawing.value = await import(
    /* @vite-ignore */
    `./../drawings/${props.selectedDrawing}`
  );
  settings.value = importedDrawing.value.default.settings;
};

watch(
  () => props.selectedDrawing,
  () => {
    asyncImport();
  },
);

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
    width="5000"
    height="5000"
    ref="svgElement"
    v-html="importedDrawing.default.draw(toValues(settings))"
  ></svg>
</template>

<style>
#svg path,
#svg line {
  stroke: slategray;
}
</style>
