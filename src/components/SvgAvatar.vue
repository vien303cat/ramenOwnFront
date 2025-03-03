<template>
  <div :class="inputcls" v-html="svgContent"></div>
</template>

<script setup>
const props = defineProps({
  svgContent: {
    type: String,
    required: true,
  },
  inputcls: {
    type: String,
    default: 'icon',
  },
})
</script>

<style scoped>
.icon {
  width: 50px;
  height: 50px;
}

.room {
  width: 500px;
  height: 500px;
  overflow: hidden;
}
</style>
