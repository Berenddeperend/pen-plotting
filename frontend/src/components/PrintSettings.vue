<script setup>
import RangeSlider from "./RangeSlider.vue";
import { usePrinterSettings } from "../stores/printerSettings.js";
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";
import Selectbox from "./Selectbox.vue";

const printerSettings = usePrinterSettings();
const globalSettings = useGlobalSettings();

const { paddingInMM, penWidthInMM, paperSize, orientation } =
  storeToRefs(printerSettings);
const { zoomMultiplier } = storeToRefs(globalSettings);
</script>
<template>
  <div>
    <RangeSlider name="padding (mm)" v-model="paddingInMM" />
    <RangeSlider name="zoom" v-model="zoomMultiplier" />

    <Selectbox
      v-model="orientation"
      name="orientation"
      :options="['portrait', 'landscape']"
    />
    <Selectbox v-model="paperSize" name="paper size" :options="['a5', 'a6']" />
    <RangeSlider name="penWidth (mm / 10)" v-model="penWidthInMM" />
  </div>
</template>
