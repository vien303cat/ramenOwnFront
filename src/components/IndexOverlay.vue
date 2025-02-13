<template>
  <v-overlay
    v-model="overlay"
    absolute
    :style="{ zIndex: 10 }"
    class="d-flex align-center justify-center fill-height"
  >
    <v-responsive class="fill-height" style="width: 100%; height: 100%">
      <iframe
        class="fill-height"
        :src="youtubeUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        muted
        @click.stop="closeOverlay"
      ></iframe>
    </v-responsive>
  </v-overlay>
</template>

<script setup>
import { ref } from 'vue'
const overlay = ref(true)
const youtubeUrl = ref('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1')

const closeOverlay = () => {
  overlay.value = false
}
</script>
