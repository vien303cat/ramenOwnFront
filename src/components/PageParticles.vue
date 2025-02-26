<template>
  <vue-particles id="tsparticles" :options="options" :particles-loaded="particlesLoaded" />
</template>

<script setup>
import { ref } from 'vue'
import particlesOptions from '@/config/particles.js'

const particlesLoaded = async (container) => {
  console.log('Particles container loaded', container)
}

const options = ref(particlesOptions)
</script>
<style scoped>
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0; /* 確保粒子背景不會遮擋其他內容 */
  pointer-events: none;
}
</style>
