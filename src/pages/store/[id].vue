<template>
  <v-container>
    <v-row>
      <v-col cols="12" color="primary">
        <h1>123</h1>
      </v-col>

      <v-col cols="12" md="4" class="d-flex justify-center">
        <v-img :src="store.image" height="300" width="300"></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <h2 class="text-center">麵友評論</h2>
        <!-- 合併的麵友評論欄位 -->
        <div>
          <p>評論1...</p>
          <p>評論2...</p>
          <!-- 你可以在這裡添加更多評論 -->
        </div>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <h1>{{ store.name }}</h1>
        <h3>評價數:</h3>
        <h3>綜合評價:**</h3>
        <h3>{{ store.timetxt }}</h3>
        <pre>{{ store.depiction }}</pre>
        <h3>{{ store.adress }}</h3>
        <v-btn
          v-if="user.isLoggedIn && 1"
          color="secondary"
          variant="flat"
          append-icon="mdi-noodles"
          @click="openDailog(null)"
          ><h3>吃</h3>
        </v-btn>

        <v-btn
          v-else-if="user.isLoggedIn && 0"
          color="info"
          variant="flat"
          append-icon="mdi-noodles"
          @click="openDailog(item)"
          ><h3>已吃</h3>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog.open" persistent max-width="600px" max-height="80vh">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title
          ><h2>{{ dialog.id ? '編輯評論' : '新增評論' }}</h2></v-card-title
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
import { reactive, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
// import Swal from 'sweetalert2'

const user = useUserStore()
const createSnackbar = useSnackbar()
const router = useRouter()
const route = useRoute()
const { apiAuth } = useAxios()

const store = ref({
  _id: '',
  name: '',
  adress: '',
  timetxt: '',
  image: '',
  depiction: '',
})

const getStore = async () => {
  try {
    const { data } = await apiAuth.get(`/store/` + route.params.id)
    store.value = data.result
    console.log('取得店家資訊', store.value)
  } catch (error) {
    console.error('取得店家資訊失敗:', error)
  }
}
getStore()

// TODO: 0214 回來開始做下面這兩個func資料還沒抓好(可能要判斷是沒資料 還是抓失敗了)
// TODO: 上面HTML需要把form的資訊改一下 目前是改新增商店的資訊
// TODO: 想法:首頁可以用swiper輪播圖 或是overlay來個廣告之類的 加油O_Q/

const scores = reactive([])
const getScores = async () => {
  try {
    const { data } = await apiAuth.get(`/score/` + route.params.id)
    scores.splice(0, scores.length)
    scores.push(...data.result)
    console.log('取得店家總評分', scores.value)
  } catch (error) {
    console.error('取得店家評分失敗:', error)
  }
}
getScores()

const myScore = reactive([])
const getScorebyUser = async () => {
  try {
    const { data } = await apiAuth.get(`/getuser/${route.params.id}/${user.id}`)
    console.log(data)
    myScore.value = data.result
  } catch (error) {
    console.error('取得個人評分失敗:', error)
  }
}
getScorebyUser()

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
  depiction: yup.string().required('請輸入描述'),
  timetxt: yup.string().required('請輸入營業時間'),
  adress: yup.string().required('請輸入地址'),
})

// 建立表單
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
})
const name = useField('name')
const depiction = useField('depiction')
const timetxt = useField('timetxt')
const adress = useField('adress')

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
    scores.splice(0, scores.length)
    getScores()

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

<route lang="yaml">
meta:
  login: false
  admin: false
  title: '拉麵王|麵屋詳情'
</route>
