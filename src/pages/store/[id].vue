<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ store.name }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
const store = ref({
  name: '',
  adress: '',
  timetxt: '',
  image: '',
  depiction: '',
})
</script>

<route lang="yaml">
meta:
  login: false
  admin: false
  title: '拉麵王|麵屋詳情'
</route>
