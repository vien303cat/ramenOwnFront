<template>
  <!-- <PageParticles /> -->

  <IndexVideo />
  <!-- <SmokeVideo /> -->
  <v-container>
    <h2 class="mx-auto">麵友照片</h2>
    <SwiperComponent
      v-if="images.length"
      :slides="images"
      :height="200"
      :autoplay-delay="5000"
      :navigation="true"
      :loop="true"
      :slides-per-view="7"
      :initial-slide="0"
    />
    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <h1 class="me-3">拉麵麵屋列表</h1>
        <v-text-field
          v-model="search"
          class="mt-5"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          placeholder="麵屋名稱/地址搜尋"
        ></v-text-field>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
      </v-col>
      <v-col v-for="store of pageStores" :key="store._id" cols="12" md="4" lg="3">
        <store-card v-bind="store"></store-card>
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPage"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import IndexVideo from '@/components/IndexVideo.vue'
import SmokeVideo from '@/components/SmokeVideo.vue'
import StoreCard from '@/components/StoreCard.vue'
import { ref, computed, watch } from 'vue'
import { useAxios } from '@/composables/axios'
import SwiperComponent from '@/components/SwiperComponent.vue'
// import PageParticles from '@/components/PageParticles.vue'

const { apiAuth } = useAxios()
const search = ref('')
const stores = ref([])
const getStores = async () => {
  try {
    const { data } = await apiAuth.get('/store')
    stores.value.push(...data.result)
    // console.log('stores圖片抓抓', stores.value)
  } catch (error) {
    console.error('取得店家列表失敗:', error)
  }
}
getStores()

const scores = ref([])
const getAllScoresSimple = async () => {
  try {
    const { data } = await apiAuth.get('score/allScoresSimple')
    scores.value.push(...data.result)
  } catch (error) {
    console.error('取得店家列表失敗:', error)
  }
}
getAllScoresSimple()

const images = computed(() => {
  return scores.value.map((val) => ({
    image: val.image,
    url: `/store/${val.store}`,
  }))
})

const ITEMS_PER_PAGE = 4
const currentPage = ref(1)
const totalPage = computed(() => {
  return Math.ceil(filteredProducts.value.length / ITEMS_PER_PAGE)
})
const filteredProducts = computed(() => {
  return stores.value.filter(
    (store) =>
      store.name.toLowerCase().includes(search.value.toLowerCase()) ||
      store.adress.toLowerCase().includes(search.value.toLowerCase()),
  )
})
const pageStores = computed(() => {
  // 如果一頁2筆資料
  // 第 一 頁 = 0 ~ 1
  // 第 二 頁 = 2 ~ 3
  // 第 三 頁 = 4 ~ 5
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = currentPage.value * ITEMS_PER_PAGE
  return filteredProducts.value.slice(start, end)
})

// 監聽 totalPage 的變化，並在變化時將 currentPage 設置為 1
watch(totalPage, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    currentPage.value = 1
  }
})
</script>

<style scoped>
/* 確保頁面內容的高度不超過視窗高度 */
.v-container {
  min-height: 50vh;
  overflow: hidden;
}
</style>

<route lang="yaml">
meta:
  layout: default # 使用 src/layouts/default.vue 作為版面配置
  login: false
  admin: false
  title: '拉麵王|首頁'
</route>
