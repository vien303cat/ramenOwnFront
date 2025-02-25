<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-col cols="12" justify="center" align="center">
          <v-img :src="store.image" height="300" width="300"></v-img>
        </v-col>
        <v-col cols="12" class="text-center">
          <h1>{{ store.name }}</h1>
          <h3>評價數: {{ totalScore }} 則</h3>
          <h3>
            綜合評價:
            <span v-if="averageScore.toFixed(1) != 'NaN'">
              {{ averageScore.toFixed(1) }}
              <v-rating readonly length="1" size="18" model-value="1" active-color="info" />
            </span>
            <span v-else> 尚無評價 </span>
          </h3>
          <h3>{{ store.timetxt }}</h3>
          <h4>{{ store.depiction }}</h4>
          <h3>
            {{ store.adress }}
            <v-btn
              :href="`https://www.google.com/maps/search/?api=1&query=${store.name}`"
              target="_blank"
              color="primary"
              variant="tonal"
              density="comfortable"
              icon="mdi-map-marker"
            >
            </v-btn>
          </h3>
          <br />
          <v-btn
            v-if="user.isLoggedIn && dialog.id"
            color="info"
            variant="flat"
            append-icon="mdi-noodles"
            @click="openDailog(myScore)"
            ><h3>已吃</h3>
          </v-btn>

          <v-btn
            v-else-if="user.isLoggedIn"
            color="secondary"
            variant="flat"
            append-icon="mdi-noodles"
            @click="openDailog(null)"
            ><h3>吃</h3>
          </v-btn>
        </v-col>
      </v-col>
      <v-col cols="12" md="9">
        <h2 class="text-center">麵友評論</h2>
        <v-divider></v-divider>
        <v-col col="12">
          <v-data-table
            :headers="headers"
            :items="scores"
            :search="search"
            :filter-keys="['user.name']"
            :items-per-page="3"
          >
            <template #top>
              <v-toolbar>
                <v-text-field
                  v-model="search"
                  class="mt-5"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  placeholder="會員名稱搜尋"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>

            <template #[`item.image`]="{ value }">
              <v-img :src="value" height="150" width="200"></v-img>
            </template>

            <template #[`item.user`]="{ value }">
              {{ value.name }}
            </template>

            <template #[`item.star`]="{ value }">
              <v-rating
                v-for="val of value"
                :key="val"
                readonly
                length="1"
                size="18"
                model-value="1"
                active-color="info"
              />
            </template>

            <template #[`item.depiction`]="{ value }">
              <pre class="wrap-text">{{ value }}</pre>
            </template>

            <template #[`item.updatedAt`]="{ value }">
              {{ new Date(value).toLocaleString() }}
            </template>
          </v-data-table>
        </v-col>
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

const scores = ref([])
const store = ref({
  _id: '',
  name: '',
  adress: '',
  timetxt: '',
  image: '',
  depiction: '',
  star: '',
})

const search = ref('')

const headers = computed(() => {
  return [
    { title: '會員', key: 'user', sortable: false, width: '10%' },
    { title: '照片', key: 'image', sortable: false, width: '15%' },
    { title: '評分', key: 'star', sortable: true, width: '20%' },
    { title: '描述', key: 'depiction', sortable: false, maxWidth: '30%' },
    { title: '評論時間', key: 'updatedAt', sortable: true, width: '20%' },
  ]
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

const getScores = async () => {
  try {
    const { data } = await apiAuth.get('/score/getstore/' + route.params.id)
    console.log('getScores:', data.result)
    scores.value = data.result
  } catch (error) {
    console.error('取得麵屋評價列表失敗:' + error)
    createSnackbar({
      text: error?.response?.data?.message || '取得麵屋評價列表失敗',
      snackbarProps: {
        color: 'red',
        timeout: 2000,
      },
    })
  }
}
getScores()

const myScore = ref({
  _id: '',
  user: '',
  store: '',
  star: '',
  depiction: '',
})
const getScorebyUser = async () => {
  try {
    const { data } = await apiAuth.get(`score/getuser/${route.params.id}/${user.id}`)
    myScore.value = data.result
    dialog.value.id = myScore.value._id
  } catch (error) {
    console.error('取得個人評分失敗:', error)
  }
}
getScorebyUser()

// 總評論數以及平均分數
const totalScore = computed(() => {
  return scores.value.length
})
// reduce 會對陣列中的每個元素進行累加
const averageScore = computed(() => {
  return scores.value.reduce((iVal, val) => iVal + val.star, 0) / scores.value.length
})
const dialog = ref({
  open: false,
  id: '',
})
const openDailog = (item) => {
  if (item) {
    console.log('open', item._id)
    dialog.value.id = item._id
    star.value.value = item.star
    depiction.value.value = item.depiction
  }
  dialog.value.open = true
}
const closeDialog = () => {
  console.log('close', myScore.value._id)
  if (!myScore.value._id) {
    resetForm()
    dialog.value.id = ''
    store.value.star = ''
  }
  dialog.value.open = false
  fileAgent.value.deleteFileRecord()
}

const schema = yup.object({
  star: yup.number().required('請填寫評價').min(1, '評價不能為空'),
  depiction: yup.string().required('請填寫描述').max(60, '描述最多 60 個字'),
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
      await apiAuth.patch(`/score/` + myScore.value._id, formData)
    } else {
      await apiAuth.post('/score', formData)
    }

    scores.value.splice(0, scores.value.length)
    getScores()
    getScorebyUser()
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
