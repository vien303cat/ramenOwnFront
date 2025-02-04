<template>
  <v-form>
    <v-text-field label="暱稱" prepend-icon="mdi-account-circle-outline"></v-text-field>
    <v-text-field label="帳號" prepend-icon="mdi-account"></v-text-field>
    <v-text-field label="密碼" type="password" prepend-icon="mdi-lock"></v-text-field>
    <v-text-field label="確認密碼" type="password" prepend-icon="mdi-lock"></v-text-field>
    <v-text-field label="信箱" prepend-icon="mdi-email"></v-text-field>
    <v-btn block color="success">註冊</v-btn>
  </v-form>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'

const schema = yup.object({
  name: yup.string().required('請輸入暱稱').max(10, '暱稱至多 10 個字'),
  account: yup
    .string()
    .required('請輸入帳號')
    .min(4, '帳號至少 4 個字')
    .max(20, '帳號至多 20 個字')
    .test('isAlphanumeric', '帳號只能包含英文或數字', (value) => validator.isAlphanumeric(value)),
  password: yup.string().required('請輸入密碼'),
  confirmPassword: yup
    .string()
    .required('請輸入確認密碼')
    .oneOf([yup.ref('password')], '確認密碼不一致'),
  email: yup.string().email('請輸入正確的信箱').required('請輸入信箱'),
})
</script>
