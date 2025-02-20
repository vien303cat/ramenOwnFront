<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item
        v-for="nav in navs"
        :key="nav.to"
        :prepend-icon="nav.icon"
        :title="nav.text"
        :to="nav.to"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main class="pa-0 ma-0">
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'

const navs = computed(() => {
  return [
    { to: '/admin/stores', text: '麵屋管理', icon: 'mdi-shopping' },
    { to: '/admin/scores', text: '評價管理', icon: 'mdi-format-list-bulleted' },
    { to: '/', text: '回首頁', icon: 'mdi-home-circle' },
  ]
})
</script>
<style>
.v-main {
  overflow: hidden !important;
}
</style>
<route lang="yaml">
meta:
  layout: default # 使用 src/layouts/default.vue 作為版面配置
  login: true
  admin: true
  title: '拉麵王|管理後台'
</route>
