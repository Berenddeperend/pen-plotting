<script setup>
import RangeSlider from "./RangeSlider.vue";
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";
import { computed } from "vue";
import Checkbox from "./Checkbox.vue";

const globalSettings = useGlobalSettings();

const { settings } = storeToRefs(globalSettings);

const rangeSliderOnlySettings = computed(() => {
  const clone = { ...settings.value };

  for (const prop in clone) {
    if (typeof clone[prop].value !== "number") {
      delete clone[prop];
    }
  }

  return clone;
});

const booleanOnlySettings = computed(() => {
  const clone = { ...settings.value };

  for (const prop in clone) {
    console.log(typeof clone[prop].value);
    if (typeof clone[prop].value !== "boolean") {
      delete clone[prop];
    }
  }

  return clone;
});
</script>

<template>
  <h2 class="font-bold mb-4">Plot settings</h2>
  <div class="controls">
    <RangeSlider
      v-if="settings"
      v-for="(settingValue, settingKey) in rangeSliderOnlySettings"
      :key="settingKey"
      :name="settingKey"
      v-model="settings[settingKey]"
    />

    <Checkbox
      v-if="settings"
      v-for="(settingValue, settingKey) in booleanOnlySettings"
      :key="settingKey"
      :name="settingKey"
      v-model="settings[settingKey].value"
      >{{ settingKey }}</Checkbox
    >

    <div class="mt-6"></div>
  </div>
</template>
