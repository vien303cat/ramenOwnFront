<template>
  <div v-html="svgContent"></div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  svgContent: {
    type: String,
    required: true,
  },
})
</script>
