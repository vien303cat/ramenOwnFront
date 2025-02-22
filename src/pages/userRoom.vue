<template>
  <v-container>
    <v-row>
      <v-col cols="12" color="primary">
        <h1>幻想一下有swiper</h1>
      </v-col>
      <v-col cols="12" md="3">
        <v-col cols="12">
          <v-img :width="207" :height="207" src="/public/membericon2.jpg"></v-img>
          <h1 style="margin: auto">{{ myUser.name }}</h1>
        </v-col>
        <v-col cols="12">
          <h2>帳號:{{ myUser.account }}</h2>
          <h2>已評論店家數: {{ myUser.scorescnt }} 家</h2>
          <h2 class="text-success">等級 {{ nowLevel + 1 }} : {{ UserLevel.LEVEL[nowLevel] }}</h2>
          <h4 class="text-grey">
            距離下一個等級還差 {{ nextLevel }} 則評論
            <v-menu offset-y>
              <template #activator="{ props }">
                <v-icon v-bind="props" color="green"> mdi-book-open-page-variant </v-icon>
              </template>
              <v-card max-height="300" style="overflow-y: auto">
                <v-list>
                  <v-list-item v-for="(level, index) in ramenRanks" :key="index">
                    <v-list-item-title>{{ level }}</v-list-item-title>
                  </v-list-item>
                  <v-divider></v-divider>
                </v-list>
              </v-card>
            </v-menu>
          </h4>
          <h3>最新一間的評論是:</h3>
          <h3>{{ store.timetxt }}</h3>
          <br />
          <h3>註冊時間: {{ new Date(myUser.createdAt).toLocaleString() }}</h3>
        </v-col>
      </v-col>

      <v-col cols="12" md="9">
        <h2 class="text-center">評論一覽</h2>
        <v-divider></v-divider>
        <v-col col="12">
          <!-- TODO: -->
          <v-data-table
            :headers="headers"
            :items="scores"
            :search="search"
            :filter-keys="['store.name', 'store.adress']"
            :items-per-page="3"
          >
            <template #top>
              <v-toolbar>
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
              <v-img :src="value" height="130" width="160"></v-img>
            </template>

            <template #[`item.store`]="{ item }">
              <v-img class="mx-auto" :src="item.store.image" height="50" width="50"></v-img>
              <p class="text-center">{{ item.store.name }}</p>
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
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { reactive, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import UserLevel from '@/enums/UserLevel'

const user = useUserStore()
const createSnackbar = useSnackbar()
const route = useRoute()
const { apiAuth } = useAxios()

//level
const nowLevel = computed(() => Math.floor(myUser.value.scorescnt / 3))
const nextLevel = computed(() => 3 - (myUser.value.scorescnt % 3))
// 使用 map() 來格式化等級名稱
const ramenRanks = ref(UserLevel.LEVEL.map((name, index) => `等級 ${index + 1}: ${name}`))

const myUser = ref({
  account: '',
  createdAt: '',
  id: '',
  name: '',
  scorescnt: 0,
})
const getUser = async () => {
  try {
    const { data } = await apiAuth.get('/user/profile')
    myUser.value = data.result
  } catch (error) {
    console.error('取得會員資訊失敗:', error)
  }
}
getUser()

// const scores = reactive([])
const store = ref({
  _id: '',
  name: '',
  adress: '',
  timetxt: '',
  image: '',
  depiction: '',
  star: '', // 確保這裡有 star 屬性
})

const headers = computed(() => {
  return [
    { title: '麵屋', key: 'store', sortable: true, width: '15%' },
    { title: '麵屋地址', key: 'store.adress', sortable: true, width: '15%' },
    { title: '照片', key: 'image', sortable: false, width: '10%' },
    { title: '評分', key: 'star', sortable: true, width: '15%' },
    { title: '描述', key: 'depiction', sortable: false, width: '30%' },
    { title: '評論時間', key: 'updatedAt', sortable: true, width: '15%' },
  ]
})

// const getStore = async () => {
//   try {
//     const { data } = await apiAuth.get(`/user/` + route.params.id)
//     store.value = data.result
//   } catch (error) {
//     console.error('取得店家資訊失敗:', error)
//   }
// }
// getStore()

// const getScores = async () => {
//   try {
//     const { data } = await apiAuth.get('/score/getstore/' + route.params.id)
//     console.log('getScores:', data.result)
//     // scores.value.push(...data.result)
//     scores.value = data.result
//   } catch (error) {
//     console.error('取得麵屋評價列表失敗:' + error)
//     createSnackbar({
//       text: error?.response?.data?.message || '取得麵屋評價列表失敗',
//       snackbarProps: {
//         color: 'red',
//         timeout: 2000,
//       },
//     })
//   }
// }
// getScores()

const scores = ref([])
const getScorebyUser = async () => {
  try {
    const { data } = await apiAuth.get(`score/getuserall/${user.id}`)
    // console.log(data)
    scores.value = data.result
    // dialog.value.id = myScore.value._id
  } catch (error) {
    console.error('取得個人評分失敗:', error)
  }
}
getScorebyUser()



// const myScore = ref({
//   _id: '',
//   user: '',
//   store: '',
//   star: '',
//   depiction: '',
// })


// 總評論數以及平均分數
// const totalScore = computed(() => {
//   return scores.value.length
// })
// reduce 會對陣列中的每個元素進行累加
// const averageScore = computed(() => {
//   return scores.value.reduce((iVal, val) => iVal + val.star, 0) / scores.value.length
// })

const dialog = ref({
  open: false,
  id: '',
})
// const openDailog = (item) => {
//   if (item) {
//     console.log('open', item._id)
//     dialog.value.id = item._id
//     star.value.value = item.star
//     depiction.value.value = item.depiction
//   }
//   dialog.value.open = true
// }
// const closeDialog = () => {
//   console.log('close', myScore.value._id)
//   if (!myScore.value._id) {
//     resetForm()
//     dialog.value.id = ''
//     store.value.star = ''
//   }
//   dialog.value.open = false
//   fileAgent.value.deleteFileRecord()
// }

// const schema = yup.object({
//   star: yup.number().required('請填寫評價').min(1, '評價不能為空'),
//   depiction: yup.string().required('請填寫描述'),
// })

// const { handleSubmit, isSubmitting, resetForm } = useForm({
//   validationSchema: schema,
// })
// const star = useField('star')
// const depiction = useField('depiction')

// const fileAgent = ref(null)
// const fileRecords = ref([])
// const rawFileRecords = ref([])

// const submit = handleSubmit(async (values) => {
//   console.log('submit', values)
//   try {
//     const formData = new FormData()
//     formData.append('user', user.id)
//     formData.append('store', store.value._id)
//     formData.append('star', values.star)
//     formData.append('depiction', values.depiction)

//     if (fileRecords.value.length > 0) {
//       formData.append('image', fileRecords.value[0].file)
//     }
//     if (dialog.value.id) {
//       await apiAuth.patch(`/score/` + myScore.value._id, formData)
//     } else {
//       await apiAuth.post('/score', formData)
//     }

//     scores.value.splice(0, scores.value.length)
//     getScores()
//     getScorebyUser()
//     createSnackbar({
//       text: dialog.value.id ? '編輯成功' : '新增成功',
//       snackbarProps: {
//         color: 'green',
//         timeout: 2000,
//       },
//     })
//     closeDialog()
//   } catch (error) {
//     console.error(error)
//     createSnackbar({
//       text: '新增/編輯評價失敗 ',
//       snackbarProps: {
//         color: 'red',
//         timeout: 2000,
//       },
//     })
//   }
// })
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
  title: '拉麵王|個人專區'
</route>
