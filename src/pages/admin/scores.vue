<template>
  <v-container class="h-100" fill-height fluid>
    <v-row class="h-100" align="center">
      <v-col cols="12">
        <h1 class="text-center">評價管理</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col col="12">
        <v-data-table
          :headers="headers"
          :items="stores"
          :search="search"
          :filter-keys="['user', 'store']"
          :items-per-page="5"
        >
          <template #top>
            <v-toolbar>
              <v-text-field
                v-model="search"
                class="mt-5"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                placeholder="麵屋/會員名稱搜尋"
              ></v-text-field>
            </v-toolbar>
          </template>

          <template #[`item.store`]="{ item }">
            <v-img class="mx-auto" :src="item.store.image" height="50" width="50"></v-img>
            <p class="text-center">{{ item.store.name }}</p>
          </template>
          <template #[`item.image`]="{ value }">
            <v-img class="mx-auto" :src="value" height="100" width="100"></v-img>
          </template>
          <template #[`item.star`]="{ value }">
            <span class="mx-auto">{{ value }}</span>
          </template>
          <template #[`item.depiction`]="{ value }">
            <span class="mx-auto">{{ value }}</span>
          </template>
          <template #[`item.createdAt`]="{ value }">
            <span class="mx-auto">{{ new Date(value).toLocaleString() }}</span>
          </template>
          <template #[`item.del`]="{ item }">
            <v-btn
              variant="text"
              density="comfortable"
              icon="mdi-delete"
              @click="del(item._id)"
            ></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { reactive, computed, ref } from 'vue'
import Swal from 'sweetalert2'

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const stores = reactive([])
const search = ref('')
const headers = computed(() => {
  return [
    {
      title: '會員',
      align: 'center',
      key: 'user',
      sortable: true,
      width: '80',
      value: (item) => `${item.user.account} ( ${item.user.name} ) `,
    },
    {
      title: '麵屋名稱',
      align: 'center',
      key: 'store',
      sortable: true,
      width: '100',
      value: 'store.name',
    },
    { title: '評論圖片', align: 'center', key: 'image', sortable: false, width: '150' },
    { title: '分數', align: 'center', key: 'star', sortable: true, width: '30' },
    { title: '描述', align: 'center', key: 'depiction', sortable: false, width: '150' },
    { title: '新增時間', align: 'center', key: 'createdAt', sortable: true, width: '100' },
    { title: '刪除', align: 'center', key: 'del', sortable: false, width: '30' },
  ]
})

const getStores = async () => {
  try {
    const { data } = await apiAuth.get('/score/all')
    stores.push(...data.result)
  } catch (error) {
    console.error('取得評價列表失敗:' + error)
    createSnackbar({
      text: error?.response?.data?.message || '取得評價列表失敗',
      snackbarProps: {
        color: 'red',
        timeout: 2000,
      },
    })
  }
}
getStores()

const del = async (id) => {
  const result = await Swal.fire({
    title: '確定要刪除嗎?',
    text: '你將不能復原這筆資料',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '刪除',
    confirmButtonColor: '#E94444',
    cancelButtonText: '取消',
    cancelButtonColor: '#999999',
  })
  console.log('result:', result)
  if (result.isConfirmed) {
    try {
      await apiAuth.delete('/score/' + id)
      const index = stores.findIndex((item) => item._id === id)
      stores.splice(index, 1)
      // createSnackbar({
      //   text: '刪除成功',
      //   snackbarProps: {
      //     color: 'success',
      //     timeout: 2000,
      //   },
      // })

      Swal.fire({
        title: '已刪除',
        draggable: true,
        showConfirmButton: false,
        icon: 'success',
        timer: 1500,
      })
    } catch (error) {
      console.error('刪除失敗:' + error)
      createSnackbar({
        text: error?.response?.data?.message || '刪除失敗',
        snackbarProps: {
          color: 'red',
          timeout: 2000,
        },
      })
    }
  }
}
</script>
