<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <!-- 左側 LOGO -->
      <v-btn to="/" class="mr-5" :active="false">
        <v-img src="/ramen白_2276860.png" class="ma-1" min-width="40"></v-img>
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
        <LoginForm v-if="dialogType === '登入'" @login-success="handleLoginSuccess" />
        <RegisterForm v-if="dialogType === '註冊'" @register-success="handleRegisterSuccess" />
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
import { useRouter } from 'vue-router'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const { api } = useAxios()
const user = useUserStore()

// 控制 Dialog 開關 & 類型
const dialog = ref(false)
const dialogType = ref('')

// 打開對話框的方法
const openDialog = (type) => {
  dialogType.value = type
  dialog.value = true
  console.log('dialogType:', dialogType.value)
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

// 處理註冊成功
const handleRegisterSuccess = async (values) => {
  try {
    // 自動登入
    const result = await api.post('/user/login', {
      account: values.account,
      password: values.password,
    })
    user.login(result) // 登入成功後將資料存入 Vuex
    // 註冊成功後關閉對話框並重定向到首頁
    dialog.value = false
    router.push('/')
  } catch (error) {
    console.error('自動登入失敗:', error)
  }
}

// 處理登入成功
const handleLoginSuccess = () => {
  dialog.value = false
  router.push('/')
}
</script>

<style>
.text-orange {
  color: #ff9800;
}
</style>
