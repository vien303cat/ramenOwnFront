<template>
  <v-container class="h-100">
    <!-- <IndexOverlay /> -->
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          width="30%"
          class="mt-5"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        ></v-text-field>
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
import IndexOverlay from '@/components/IndexOverlay.vue'
import StoreCard from '@/components/StoreCard.vue'
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const user = useUserStore()
const { apiAuth } = useAxios()
const search = ref('')

const stores = ref([])
const getStores = async () => {
  try {
    const { data } = await apiAuth.get('/store')
    stores.value.push(...data.result)
  } catch (error) {
    console.error('取得店家列表失敗:', error)
  }
}
getStores()

const ITEMS_PER_PAGE = 4
const currentPage = ref(1)
const totalPage = computed(() => {
  return Math.ceil(filteredProducts.value.length / ITEMS_PER_PAGE)
})
const filteredProducts = computed(() => {
  return stores.value.filter((store) =>
    store.name.toLowerCase().includes(search.value.toLowerCase()),
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

<route lang="yaml">
meta:
  layout: default # 使用 src/layouts/default.vue 作為版面配置
  login: false
  admin: false
  title: '拉麵王|首頁'
</route>
