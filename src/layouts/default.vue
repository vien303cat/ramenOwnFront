<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <!-- 左側 LOGO -->
      <v-btn to="/" class="mr-5" :active="false">
        <v-img src="../../public/ramen白_2276860.png" class="ma-1" min-width="40"></v-img>
        <span class="text-orange font-weight-bold text-h4">拉麵王</span>
      </v-btn>

      <!-- 中間靠左操作選單 -->
      <v-btn v-for="nav of midNavs" :key="nav.to" :to="nav.to" :prepend-icon="nav.icon">{{
        nav.title
      }}</v-btn>

      <v-spacer></v-spacer>

      <!-- 右側操作選單 (開啟 v-dialog) -->
      <v-btn
        v-for="nav of navs"
        :key="nav.title"
        :prepend-icon="nav.icon"
        @click="openDialog(nav.title)"
      >
        {{ nav.title }}
      </v-btn>
    </v-container>
  </v-app-bar>

  <!-- 註冊 / 登入的 Dialog -->
  <v-dialog v-model="dialog" :max-width="dialogWidth">
    <v-card>
      <v-card-title class="text-h5">{{ dialogTitle }}</v-card-title>
      <v-card-text>
        <LoginForm v-if="dialogType === '登入'" />
        <RegisterForm v-if="dialogType === '註冊'" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="dialog = false">關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

// 控制 Dialog 開關 & 類型
const dialog = ref(false)
const dialogType = ref('')

// 打開對話框的方法
const openDialog = (type) => {
  dialogType.value = type
  dialog.value = true
}

// 設定標題
const dialogTitle = computed(() => (dialogType.value === '登入' ? '登入' : '註冊'))
const dialogWidth = computed(() => (dialogType.value === '登入' ? '400' : '800'))

// 導覽列項目
const navs = computed(() => [
  { title: '註冊', icon: 'mdi-account-plus' },
  { title: '登入', icon: 'mdi-login-variant' },
])

const midNavs = computed(() => [{ title: '關於我們', to: '/about', icon: 'mdi-account-circle' }])
</script>

<style>
.text-orange {
  color: #ff9800;
}
</style>
