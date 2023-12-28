<script setup>
import RangeSlider from "./RangeSlider.vue";
import { usePrinterSettings } from "../stores/printerSettings.js";
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";

const printerSettings = usePrinterSettings();
const globalSettings = useGlobalSettings();

const { paddingInMM, penWidthInMM } = storeToRefs(printerSettings);
const { zoomMultiplier } = storeToRefs(globalSettings);
const { resetZoom } = globalSettings;
</script>
<template>
  <div>
    <RangeSlider name="padding (mm)" v-model="paddingInMM" />
    <RangeSlider name="zoom" v-model="zoomMultiplier" />
    <button @click="resetZoom">Reset</button>
    <br />
    <RangeSlider name="penWidth (mm / 10)" v-model="penWidthInMM" />
  </div>
</template>
