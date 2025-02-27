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
