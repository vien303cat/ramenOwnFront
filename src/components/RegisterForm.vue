<template>
  <v-form>
    <v-text-field
      v-model="name.value.value"
      label="暱稱"
      prepend-icon="mdi-account-circle-outline"
      :error-messages="name.errorMessage.value"
    ></v-text-field>
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
      prepend-icon="mdi-lock"
      minlength="4"
      maxlength="20"
      :error-messages="password.errorMessage.value"
    ></v-text-field>
    <v-text-field
      v-model="confirmPassword.value.value"
      label="確認密碼"
      type="password"
      prepend-icon="mdi-lock"
      :error-messages="confirmPassword.errorMessage.value"
    ></v-text-field>
    <v-text-field
      v-model="email.value.value"
      label="信箱"
      prepend-icon="mdi-email"
      :error-messages="email.errorMessage.value"
    ></v-text-field>
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
  password: yup
    .string()
    .required('請輸入密碼')
    .min(4, '密碼至少 4 個字')
    .max(20, '密碼至多 20 個字'),
  confirmPassword: yup
    .string()
    .required('請輸入確認密碼')
    .oneOf([yup.ref('password')], '確認密碼不一致'),
  email: yup
    .string()
    .required('請輸入信箱')
    .test('isEmail', '信箱格式不正確', (value) => validator.isEmail(value)),
})

// 建立表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
// 建立欄位
const account = useField('account')
const password = useField('password')
const confirmPassword = useField('confirmPassword')
const email = useField('email')
const name = useField('name')
</script>
