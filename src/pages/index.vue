<template>
  <v-container class="h-100 pa-0 ma-0">
    <!-- <v-overlay
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
          @click.stop="closeOverlay"
        ></iframe>
      </v-responsive>
    </v-overlay> -->
    <v-row class="h-100" align="center">
      <v-col cols="12">
        <h1 class="text-center">首頁</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// import { ref } from 'vue'
// const overlay = ref(true)
// const youtubeUrl = ref('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1')

// const closeOverlay = () => {
//   overlay.value = false
// }
</script>

<style>
/* .fill-height {
  height: 100% !important;
  width: 100% !important;
}

.v-overlay__content {
  width: 80% !important;
  height: 80% !important;
} */
</style>

<route lang="yaml">
meta:
  layout: default # 使用 src/layouts/default.vue 作為版面配置
  login: false
  admin: false
  title: '拉麵王|首頁'
</route>
