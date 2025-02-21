<template>
  <div v-html="svgContent"></div>
</template>

<script setup>
const props = defineProps({
  svgContent: {
    type: String,
    required: true,
  },
})
</script>
