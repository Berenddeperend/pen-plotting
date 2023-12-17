<script setup>
import RangeSlider from "./RangeSlider.vue";
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";

const globalSettings = useGlobalSettings();

const { settings } = storeToRefs(globalSettings);

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

const preview = () => {
  fetch("http://localhost:8080/preview", {
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
    <button @click="preview">Preview</button>
  </div>
</template>
