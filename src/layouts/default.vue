<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <!-- 左側 LOGO -->
      <!-- TODO:首頁圖片能不能放大 -->
      <v-btn to="/" class="mr-5" :active="false">
        <v-img src="/拉麵王.png" min-width="150"></v-img>
        <!-- <v-img src="/ramen白_2276860.png" class="ma-1" min-width="40"></v-img> -->
        <!-- <span class="text-orange font-weight-bold text-h4">拉麵王</span> -->
      </v-btn>

      <!-- 中間靠左操作選單 -->
      <template v-for="nav of midNavs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">{{ nav.title }}</v-btn>
      </template>
      <v-spacer></v-spacer>

      <!-- 右側操作選單 (開啟 v-dialog) -->
      <template v-for="nav of navs" :key="nav.title">
        <v-btn v-if="nav.show" :prepend-icon="nav.icon" @click="openDialog(nav.title)">
          {{ nav.title }}
        </v-btn>
      </template>

      <!-- 右側操作選單 (顯示用戶名稱和登出按鈕) -->
      <template v-if="user.isLoggedIn">
        <SvgAvatar :svg-content="svg" />
        <v-card class="pa-2 mr-3" outlined>
          <div>您好! {{ user.name }}</div>
          <div>等級{{ nowLevel + 1 }} : {{ UserLevel.LEVEL[nowLevel] }}</div>
        </v-card>
        <v-btn append-icon="mdi-logout-variant" @click="logout">登出</v-btn>
      </template>
    </v-container>
  </v-app-bar>

  <!-- 註冊 / 登入的 Dialog -->
  <v-dialog v-model="dialog" :max-width="dialogWidth">
    <v-card>
      <v-card-title class="text-h5">{{ dialogTitle }}</v-card-title>
      <v-card-text>
        <LoginForm v-if="dialogType === '登入'" @login-success="handleSuccess" />
        <RegisterForm v-if="dialogType === '註冊'" @register-success="handleSuccess" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="dialog = false">關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-main> <RouterView></RouterView> </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { useRouter } from 'vue-router'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'
import Swal from 'sweetalert2'
import avatar from 'animal-avatar-generator'
import SvgAvatar from '@/components/SvgAvatar.vue'
import UserLevel from '@/enums/UserLevel'

const router = useRouter()
const { api } = useAxios()
const user = useUserStore()
const { apiAuth } = useAxios()

//level
const nowLevel = computed(() => Math.floor(user.scorescnt / 3))
// avatar
const svg = computed(() => avatar(user.account, { size: 40, blackout: true }))

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
  { title: '註冊', icon: 'mdi-account-plus', show: !user.isLoggedIn },
  { title: '登入', icon: 'mdi-login-variant', show: !user.isLoggedIn },
  // { to: '/logout', title: '登出', icon: 'mdi-logout-variant', show: user.isLoggedIn },
])

const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
    user.logout() // 清除用戶狀態
    Swal.fire({
      icon: 'success',
      title: '已登出',
      showConfirmButton: false,
      timer: 2000,
    })
    router.push('/')
  } catch (error) {
    console.error('登出失敗:', error)
  }
}

const midNavs = computed(() => [
  { title: '個人專區', to: '/userRoom', icon: 'mdi-account-circle', show: user.isLoggedIn },
  { title: '管理後台', to: '/admin/stores', icon: 'mdi-account-star', show: user.isAdmin },
  // { title: '關於作者', to: '/about', icon: 'mdi-noodles', show: true },
])

// 處理註冊成功
const handleSuccess = async (values) => {
  if (dialogType.value === '註冊') {
    try {
      // 自動登入
      const { data } = await api.post('/user/login', {
        account: values.account,
        password: values.password,
      })

      user.login(data.result) // 登入成功後將資料存入 Vuex
      // 註冊成功後關閉對話框並重定向到首頁
      dialog.value = false
      router.push('/')
    } catch (error) {
      console.error('自動登入失敗:', error)
    }
  } else {
    dialog.value = false
    router.push('/')
  }
}
</script>

<style>
/* 取消網頁邊邊的滾動條 */
html,
body {
  overflow-x: hidden;
}
</style>

<route lang="yaml">
meta:
  login: false
  admin: false
  title: '拉麵王-首頁'
</route>
