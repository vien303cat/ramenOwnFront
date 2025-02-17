<template>
  <v-container>
    <v-row>
      <v-col cols="12" color="primary">
        <h1>幻想一下有swiper</h1>
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
        <h3>
          綜合評價:
          <v-rating readonly length="1" size="18" model-value="1" active-color="info" />
        </h3>
        <h3>{{ store.timetxt }}</h3>
        <pre>{{ store.depiction }}</pre>
        <h3>{{ store.adress }}</h3>
        <br />
        <v-btn
          v-if="user.isLoggedIn && !scroeDone"
          color="secondary"
          variant="flat"
          append-icon="mdi-noodles"
          @click="openDailog(null)"
          ><h3>吃</h3>
        </v-btn>

        <v-btn
          v-else-if="user.isLoggedIn && scroeDone"
          color="info"
          variant="flat"
          append-icon="mdi-noodles"
          @click="openDailog(item)"
          ><h3>已吃</h3>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog.open" persistent max-width="40%" max-height="80vh">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title class="dialog-title">
          <v-row class="align-start">
            <v-col cols="12" md="4" class="d-flex justify-start">
              <v-img :src="store.image" height="200" width="200"></v-img>
            </v-col>
            <v-col cols="12" md="8" class="text-left wrap-text">
              <v-col cols="12">
                <h2>{{ store.name }}</h2>
                <h3>{{ store.timetxt }}</h3>
              </v-col>
              <v-col cols="12">
                <h4>{{ store.adress }}</h4>
              </v-col>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <h2>{{ dialog.id ? '編輯評論' : '新增評論' }}</h2>
          <br />

          <!-- 顯示錯誤訊息 -->
          <span v-if="star.errorMessage" class="text-secondary">{{ star.errorMessage }}</span>
          <v-rating
            v-model="star.value.value"
            length="10"
            :item-labels="['評分', '', '', '', '', '', '', '', '', '']"
            active-color="info"
            color="info"
            size="24"
            hover
          ></v-rating>
          <p>當前評分: {{ star.value.value }}</p>
          <!-- 顯示當前評分 -->

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
            help-text="上傳圖片"
            :error-text="{ type: '檔案格式不符', size: '圖片容量過大' }"
          ></VueFileAgent>
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
  star: '', // 確保這裡有 star 屬性
})

const getStore = async () => {
  try {
    const { data } = await apiAuth.get(`/store/` + route.params.id)
    store.value = data.result
  } catch (error) {
    console.error('取得店家資訊失敗:', error)
  }
}
getStore()

const scores = ref([])
const getScores = async () => {
  try {
    const { data } = await apiAuth.get('/score/getstore/' + route.params.id)
    scores.value.push(...data.result)
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
getScores()
console.log('scores:', scores.value)

const myScore = ref({})
const getScorebyUser = async () => {
  try {
    const { data } = await apiAuth.get(`score/getuser/${route.params.id}/${user.id}`)
    // console.log(data)
    myScore.value = data.result
  } catch (error) {
    console.error('取得個人評分失敗:', error)
  }
}
getScorebyUser()
console.log('myScore:', myScore.value)

const dialog = ref({
  open: false,
  id: '',
})
const openDailog = (item) => {
  console.log('open', myScore.value)
  if (item) {
    dialog.value.id = item._id
    star.value.value = item.value
    depiction.value.value = item.depiction
  }
  dialog.value.open = true
}
const closeDialog = () => {
  resetForm()
  dialog.value.id = ''
  store.value.star = ''
  dialog.value.open = false
  fileAgent.value.deleteFileRecord()
}

const schema = yup.object({
  star: yup.number().required('請填寫評價').min(1, '評價不能為空'),
  depiction: yup.string().required('請填寫描述'),
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
})
const star = useField('star')
const depiction = useField('depiction')

const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  console.log('submit', values)
  try {
    const formData = new FormData()
    formData.append('user', user.id)
    formData.append('store', store.value._id)
    formData.append('star', values.star)
    formData.append('depiction', values.depiction)

    if (fileRecords.value.length > 0) {
      formData.append('image', fileRecords.value[0].file)
    }
    if (dialog.value.id) {
      await apiAuth.patch(`/score/` + dialog.value.id, formData)
    } else {
      await apiAuth.post('/score', formData)
    }

    scores.value.splice(0, scores.value.length)
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
      text: '新增/編輯評價失敗 ',
      snackbarProps: {
        color: 'red',
        timeout: 2000,
      },
    })
  }
})
</script>

<style scoped>
.dialog-title {
  margin-top: 20px; /* 添加上邊距 */
}
.text-left {
  text-align: left; /* 文字靠左對齊 */
}
.wrap-text {
  white-space: pre-wrap; /* 使文本換行 */
  word-wrap: break-word; /* 使長單詞換行 */
}
</style>

<route lang="yaml">
meta:
  login: false
  admin: false
  title: '拉麵王|麵屋詳情'
</route>
