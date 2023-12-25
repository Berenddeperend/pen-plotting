<script setup>
import RangeSlider from "./RangeSlider.vue";
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";

const globalSettings = useGlobalSettings();

const { settings } = storeToRefs(globalSettings);
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
    <div class="mt-6"></div>
  </div>
</template>
