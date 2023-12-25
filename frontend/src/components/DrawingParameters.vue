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
    <div class="mt-6">
      <span class="isolate inline-flex rounded-md shadow-sm">
        <button
          @click="print"
          type="button"
          class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        >
          Print
        </button>
        <button
          type="button"
          @click="preview"
          class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        >
          Preview
        </button>
      </span>
    </div>
  </div>
</template>
