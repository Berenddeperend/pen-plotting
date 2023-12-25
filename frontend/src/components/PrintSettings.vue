<script setup>
import RangeSlider from "./RangeSlider.vue";
import { usePrinterSettings } from "../stores/printerSettings.js";
import { storeToRefs } from "pinia";

const printerSettings = usePrinterSettings();

const { paddingInMM, penWidthInMM } = storeToRefs(printerSettings);
</script>
<template>
  <div>
    <RangeSlider name="padding" v-model="paddingInMM" />
    <br />
    <input type="text" v-model="penWidthInMM" />
  </div>
</template>
