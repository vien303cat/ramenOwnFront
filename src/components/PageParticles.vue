<script setup>
import { ref } from 'vue'
// import { loadFull } from 'tsparticles'
import particlesConfig from '@/config/particles-config.json'
const particlesOptions = ref(particlesConfig)

const particlesInit = async (engine) => {
  // await loadFull(engine)
}
</script>

<template>
  <div id="app">
    <vue-particles
      id="tsparticles"
      :particles-init="particlesInit"
      :particles-loaded="particlesLoaded"
      url="http://foo.bar/particles.json"
    />

    <vue-particles
      id="tsparticles"
      :particles-init="particlesInit"
      :particles-loaded="particlesLoaded"
      :options="particlesOptions"
    />
  </div>
</template>
