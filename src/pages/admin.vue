<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab value="shop">麵屋資訊</v-tab>
      <v-tab value="feedback">意見回饋</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="shop">
        <v-data-table
          v-model:items-per-page="itemsPerPage"
          :headers="shopHeaders"
          :items="shopData"
          :search="search"
          class="elevation-1"
        >
          <template #top>
            <v-text-field
              v-model="search"
              label="搜尋"
              prepend-inner-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </template>
        </v-data-table>
      </v-window-item>

      <v-window-item value="feedback">
        <v-data-table
          v-model:items-per-page="itemsPerPage"
          :headers="feedbackHeaders"
          :items="feedbackData"
          :search="search"
          class="elevation-1"
        >
          <template #top>
            <v-text-field
              v-model="search"
              label="搜尋"
              prepend-inner-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </template>
        </v-data-table>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('shop')
const search = ref('')
const itemsPerPage = ref(10)

const shopHeaders = [
  { text: 'ID', value: 'id' },
  { text: '名稱', value: 'name' },
  { text: '描述', value: 'depiction' },
  { text: '營業時間', value: 'timetxt' },
  { text: '地址', value: 'address' },
  { text: '上架中', value: 'ishidden' },
  { text: '更新時間', value: 'updateTime' },
  { text: '編輯麵屋', value: 'edit' },
]
const shopData = ref([
  {
    id: 1,
    name: '拉麵店 A',
    depiction: '美味拉麵',
    timetxt: '10:00 - 22:00',
    address: '台北市XX路',
    ishidden: false,
    updateTime: '2024-02-10',
    edit: '編輯',
  },
  {
    id: 2,
    name: '拉麵店 B',
    depiction: '日式風味',
    timetxt: '11:00 - 23:00',
    address: '新北市XX路',
    ishidden: true,
    updateTime: '2024-02-11',
    edit: '編輯',
  },
])

const feedbackHeaders = [
  { text: 'ID', value: 'id' },
  { text: '用戶名稱', value: 'user' },
  { text: '意見內容', value: 'content' },
  { text: '日期', value: 'date' },
]
const feedbackData = ref([
  { id: 1, user: '小明', content: '拉麵很好吃！', date: '2024-02-10' },
  { id: 2, user: '小華', content: '希望增加更多口味。', date: '2024-02-11' },
])
</script>

<style>
/* 設定表頭文字顏色 */
th.v-data-table-header__content {
  color: #ffffff !important;
  font-weight: bold;
}
</style>
