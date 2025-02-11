<template>
  <v-container class="h-100">
    <v-row class="h-100" align="center">
      <v-col cols="12">
        <h1 class="text-center">個人專區</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<route lang="yaml">
meta:
  layout: default # 使用 src/layouts/default.vue 作為版面配置
  login: true
  admin: false
  title: '拉麵王-個人專區'
</route>
