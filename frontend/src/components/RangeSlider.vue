<script setup>
const props = defineProps({ modelValue: Object, name: String });
const emit = defineEmits(["update:model-value"]);

const { min, max } = props.modelValue;

const update = (value) => {
  emit("update:model-value", { min, max, value: parseInt(value) });
};
</script>

<template>
  <!--  <input type="range" v-model="modelValue" :min="0" :max="300" />-->
  <pre>{{ name }}, {{ props.modelValue.value }}</pre>
  <input
    type="range"
    :value="props.modelValue.value"
    @input="update($event.target.value)"
    :min="min"
    :max="max"
  />
</template>
