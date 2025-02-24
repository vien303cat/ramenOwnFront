<template>
  <v-container>
    <v-row>
      <v-col cols="12" color="primary"> </v-col>
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
          <v-row v-if="newScore.star" class="mt-1">
            <v-col cols="3" class="bg-greyhalf">
              <v-img class="mx-auto" :src="newScore.store.image" height="50" width="50"></v-img>
              <p class="text-center">{{ newScore.store.name }}</p>
            </v-col>
            <v-col cols="9" class="bg-greyhalf" style="max-width: 50%">
              <p>
                評價:{{ newScore.star }}
                <v-rating readonly length="1" size="20" model-value="1" active-color="info" />
              </p>
              <p>
                {{ newScore.depiction }}
              </p>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <h3>目前沒有評論</h3>
            </v-col>
          </v-row>
          <h3>{{ store.timetxt }}</h3>
          <br />
          <h3>註冊時間: {{ new Date(myUser.createdAt).toLocaleString() }}</h3>
        </v-col>
      </v-col>

      <v-col cols="12" md="9">
        <h2 class="text-center">評論一覽</h2>
        <v-divider></v-divider>
        <v-col col="12">
          <v-data-table
            :headers="headers"
            :items="scores"
            :search="search"
            :filter-keys="['store.adress', 'store.name']"
            :items-per-page="3"
          >
            <template #top>
              <v-toolbar>
                <v-text-field
                  v-model="search"
                  class="mt-5"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  placeholder="麵屋名稱/地址搜尋"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'
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

const search = ref('')
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
    { title: '麵屋', align: 'center', key: 'store', sortable: true, width: '15%' },
    { title: '麵屋地址', align: 'center', key: 'store.adress', sortable: true, width: '15%' },
    { title: '照片', align: 'center', key: 'image', sortable: false, width: '10%' },
    { title: '評分', align: 'center', key: 'star', sortable: true, width: '15%' },
    { title: '描述', align: 'center', key: 'depiction', sortable: false, width: '30%' },
    { title: '評論時間', align: 'center', key: 'updatedAt', sortable: true, width: '15%' },
  ]
})

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

const newScore = ref([])
const getScoreUserNew = async () => {
  try {
    const { data } = await apiAuth.get(`score/getusernew/${user.id}`)
    console.log('getusernew', data)
    newScore.value = data.result
    // dialog.value.id = myScore.value._id
  } catch (error) {
    console.error('取得個人最新評分失敗:', error)
  }
}
getScoreUserNew()
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
