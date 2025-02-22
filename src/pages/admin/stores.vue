<template>
  <v-container class="h-100" fill-height fluid>
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
          :items-per-page="10"
        >
          <template #top>
            <v-toolbar>
              <v-btn prepend-icon="mdi-archive-plus" @click="openDailog(null)">新增麵屋</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                class="mt-5"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"

                placeholder="麵屋名稱/地址搜尋"
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
          <template #[`item.edit`]="{ item }">
            <v-btn icon="mdi-pencil" @click="openDailog(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog.open" persistent max-width="600px" max-height="80vh">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title
          ><h2>{{ dialog.id ? '編輯麵屋' : '新增麵屋' }}</h2></v-card-title
        >
        <v-card-text>
          <v-text-field
            v-model="name.value.value"
            label="名稱"
            :error-messages="name.errorMessage.value"
          ></v-text-field>
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
          <v-textarea
            v-model="depiction.value.value"
            label="描述"
            :error-messages="depiction.errorMessage.value"
          ></v-textarea>
          <VueFileAgent
            ref="fileAgent"
            v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg, image/png"
            deletable
            max-size="1MB"
            help-text="請上傳店家圖片"
            :error-text="{ type: '檔案格式不符', size: '圖片容量過大' }"
          ></VueFileAgent>

          <pre>{{ errors }}</pre>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">取消</v-btn>
          <v-btn type="submit" :loading="isSubmitting">提交</v-btn>
        </v-card-actions>
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
    { title: '上架中', key: 'ishidden', sortable: true },
    { title: '地址', key: 'adress', sortable: false },
    { title: '營業時間', key: 'timetxt', sortable: false },
    { title: '新增時間', key: 'createdAt', sortable: true },
    { title: '更新時間', key: 'updatedAt', sortable: true },
    { title: '編輯', key: 'edit', sortable: false },
  ]
})

const getStores = async () => {
  try {
    const { data } = await apiAuth.get('/store/all')
    stores.push(...data.result)
  } catch (error) {
    console.error('取得麵屋列表失敗:' + error)
    createSnackbar({
      text: error?.response?.data?.message || '取得麵屋列表失敗',
      snackbarProps: {
        color: 'red',
        timeout: 2000,
      },
    })
  }
}

getStores()

const dialog = ref({
  open: false,
  // id判斷現在是新增還是編輯
  id: '',
})
const openDailog = (item) => {
  if (item) {
    dialog.value.id = item._id
    name.value.value = item.name
    timetxt.value.value = item.timetxt
    adress.value.value = item.adress
    ishidden.value.value = !item.ishidden
    depiction.value.value = item.depiction
  }
  dialog.value.open = true
}
const closeDialog = () => {
  resetForm()
  dialog.value.id = ''
  dialog.value.open = false
  fileAgent.value.deleteFileRecord()
}

const schema = yup.object({
  name: yup.string().required('請輸入名稱'),
  depiction: yup.string().required('請輸入描述').max(60, '描述最多 60 個字'),
  timetxt: yup.string().required('請輸入營業時間'),
  adress: yup.string().required('請輸入地址'),
  ishidden: yup.boolean().required('請選擇是否上架'),
})

// 建立表單
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
})
const name = useField('name')
const depiction = useField('depiction')
const timetxt = useField('timetxt')
const adress = useField('adress')
const ishidden = useField('ishidden')

// 要清空 file agent 不能直接把 fileRecords 設為空(沒有用)因此利用 fileAgent 的方法來清空上傳的圖片(取消新增/編輯時)
const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  if ((fileRecords.value.length === 0 && dialog.value.id == '') || fileRecords.value[0]?.error) {
    createSnackbar({
      text: '店家圖片不可為空或是格式錯誤',
      snackbarProps: {
        color: 'red',
        timeout: 2000,
      },
    })
    return
  }
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('timetxt', values.timetxt)
    formData.append('adress', values.adress)
    formData.append('ishidden', !values.ishidden)
    formData.append('depiction', values.depiction)

    // 編輯時若沒修改圖片則用原來的圖片
    if (fileRecords.value.length > 0) {
      formData.append('image', fileRecords.value[0].file)
    }
    if (dialog.value.id) {
      await apiAuth.patch(`/store/` + dialog.value.id, formData)
    } else {
      await apiAuth.post('/store', formData)
    }

    //陣列全清空再重新抓一次全部資料 (若是資料量大建議抓id來更新或是直接提交內容來更新)
    stores.splice(0, stores.length)
    getStores()

    createSnackbar({
      text: dialog.value.id ? '編輯成功' : '新增成功',
      snackbarProps: {
        color: 'green',
        timeout: 2000,
      },
    })
    closeDialog()
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: '新增/編輯麵屋失敗 ',
      snackbarProps: {
        color: 'red',
        timeout: 2000,
      },
    })
  }
})
</script>
