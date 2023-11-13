<script setup>
import lines from "./../drawings/lines";
import { ref } from "vue";
import RangeSlider from "./RangeSlider.vue";

// const x = ref(0);
// const y = ref(0);

const settings = ref(lines.settings);
</script>

<template>
  <div class="controls">
    <RangeSlider
      v-for="(settingValue, settingKey) in settings"
      :key="settingKey"
      :name="settingKey"
      v-model="settings[settingKey]"
    />
  </div>

  <svg
    id="svg"
    xmlns="http://www.w3.org/2000/svg"
    width="5000"
    height="5000"
    v-html="lines.draw(settings)"
  ></svg>
</template>
