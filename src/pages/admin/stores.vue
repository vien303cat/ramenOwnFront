<template>
  <v-container class="h-100 pa-0 ma-0">
    <v-row class="h-100" align="center">
      <v-col cols="12">
        <h1 class="text-center">麵屋管理</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col col="12">
        <v-data-table
          :headers="headers"
          :items="stores"
          :search="search"
          :filter-keys="['name', 'adress']"
        >
          <template #top>
            <v-toolbar>
              <v-btn prepend-icon="mdi-archive-plus">新增麵屋</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                class="mt-5"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
              ></v-text-field>
            </v-toolbar>
          </template>
          <template #[`item.image`]="{ value }">
            <v-img :src="value" height="50" width="80"></v-img>
          </template>
          <template #[`item.name`]="{ value }">
            {{ value }}
          </template>
          <template #[`item.depiction`]="{ value }">
            {{ value }}
          </template>
          <template #[`item.ishidden`]="{ value }">
            <v-icon v-if="!value" icon="mdi-check"></v-icon>
            <v-icon v-else icon="mdi-close"></v-icon>
          </template>
          <template #[`item.adress`]="{ value }">
            {{ value }}
          </template>
          <template #[`item.timetxt`]="{ value }">
            {{ value }}
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog.open" persistent>
    <v-form>
      <v-card>
        <v-card-title>{{ dialog.id ? '編輯麵屋' : '新增麵屋' }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name.value.value"
            label="名稱"
            :error-messages="name.errorMessage.value"
          ></v-text-field>
          <v-textarea
            v-model="description.value.value"
            label="描述"
            :error-messages="description.errorMessage.value"
          ></v-textarea>
          <v-text-field
            v-model="timetxt.value.value"
            label="營業時間"
            :error-messages="timetxt.errorMessage.value"
          ></v-text-field>
          <v-text-field
            v-model="adress.value.value"
            label="地址"
            :error-messages="adress.errorMessage.value"
          ></v-text-field>
          <v-checkbox
            v-model="ishidden.value.value"
            label="上架"
            :error-messages="ishidden.errorMessage.value"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { reactive, computed, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const stores = reactive([])
const search = ref('')
const headers = computed(() => {
  return [
    { title: 'ID', key: '_id', sortable: true },
    { title: '圖片', key: 'image', sortable: false },
    { title: '麵屋名稱', key: 'name', sortable: true },
    { title: '描述', key: 'depiction', sortable: false },
    { title: '上架中', key: 'ishidden', sortable: false },
    { title: '地址', key: 'adress', sortable: false },
    { title: '營業時間', key: 'timetxt', sortable: false },
    { title: '新增時間', key: 'createdAt', sortable: true },
    { title: '更新時間', key: 'updatedAt', sortable: true },
    // { title: '編輯', key: 'edit' },
  ]
})

const getStores = async () => {
  try {
    const { data } = await apiAuth.get('/store/all')
    stores.push(...data.result)
    console.log('stores:', stores)
  } catch (error) {
    console.error('取得麵屋列表失敗:' + error)
    createSnackbar({
      text: error?.response?.data?.message || '未知錯誤',
      snackbarProps: {
        color: 'red',
        timeout: 1000,
      },
    })
  }
}

getStores()

const dialog = ref({
  open: true,
  id: '',
})

const schema = yup.object({
  name: yup.string().required('請輸入名稱'),
  description: yup.string().required('請輸入描述'),
  timetxt: yup.string().required('請輸入營業時間'),
  adress: yup.string().required('請輸入地址'),
  image: yup.string().required('請提供店家圖片'),
  ishidden: yup.boolean().required('請選擇是否上架'),
})

// 建立表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
const name = useField('name')
const description = useField('description')
const timetxt = useField('timetxt')
const adress = useField('adress')
const ishidden = useField('ishidden')

// const openDialog = (item) => {
//   if (item) {
//     dialog.value.id = item._id
//     name.value.value = item.name
//     price.value.value = item.price
//     description.value.value = item.description
//     category.value.value = item.category
//     sell.value.value = item.sell
//   }
//   dialog.value.open = true
// }
// const closeDialog = () => {
//   resetForm()
//   dialog.value.id = ''
//   dialog.value.open = false
//   fileAgent.value.deleteFileRecord()
// }
</script>
