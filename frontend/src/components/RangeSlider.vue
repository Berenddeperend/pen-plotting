<script setup>
defineProps({ modelValue: Number, name: String });
const emit = defineEmits(["update:model-value"]);

const update = (value) => {
  console.log(value);
  emit("update:model-value", parseInt(value));
};
</script>

<template>
  <!--  <input type="range" v-model="modelValue" :min="0" :max="300" />-->
  <pre>{{ name }}, {{ modelValue }}</pre>
  <input
    type="range"
    :model-value="modelValue"
    @input="update($event.target.value)"
    :min="0"
    :max="300"
  />
</template>
