<template>
  <v-form :disabled="isSubmitting" @submit.prevent="submit">
    <v-text-field
      v-model="account.value.value"
      label="帳號"
      prepend-icon="mdi-account"
      counter
      minlength="4"
      maxlength="20"
      :error-messages="account.errorMessage.value"
    ></v-text-field>
    <v-text-field
      v-model="password.value.value"
      label="密碼"
      type="password"
      counter
      prepend-icon="mdi-lock"
      minlength="4"
      maxlength="20"
      :error-messages="password.errorMessage.value"
    ></v-text-field>
    <v-btn type="submit" :loading="isSubmitting" block color="primary">登入</v-btn>
  </v-form>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

// import Swal from 'sweetalert2'

const user = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()

const { api } = useAxios()

const schema = yup.object({
  account: yup
    .string()
    .required('請輸入帳號')
    .min(4, '帳號至少 4 個字')
    .max(20, '帳號至多 20 個字')
    .test('isAlphanumeric', '帳號只能包含英文或數字', (value) => validator.isAlphanumeric(value)),
  password: yup
    .string()
    .required('請輸入密碼')
    .min(4, '密碼至少 4 個字')
    .max(20, '密碼至多 20 個字'),
})

// 建立表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
// 建立欄位
const account = useField('account')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  // axios.post('/api/register', values)
  console.log(values)
  try {
    const { data } = await api.post('/user/login', {
      account: values.account,
      password: values.password,
    })
    user.login(data.result) // 登入成功後將資料存入 Vuex
    createSnackbar({
      text: '登入成功',
      snackbarProps: {
        color: 'green',
        timeout: 2000,
      },
    })
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message,
      snackbarProps: {
        color: 'red',
        timeout: 1000,
      },
    })
  }
})
</script>
