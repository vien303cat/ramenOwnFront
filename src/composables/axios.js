import axios from 'axios'
import { useUserStore } from '@/stores/user'

// 通常寫法
//  axios.post('http://localhost:4000/user')
//  axios.post(process.env.api + '/user/')

// 有設定baseURL
// axios.post('/user')
// axios.post('/user/login')

// axios.defaults.baseURL = import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})


// axios 攔截器
// 1.axios.get / axios.post
// 2.interceptors.request ((config:請求設定) => {} )
// 3.送出
// 4.interceptors.response(成功處理,失敗處理 )
// 5.回傳 .then().catch()
apiAuth.interceptors.request.use((config) => {
  const user = useUserStore()
  config.headers.Authorization = `Bearer ${user.token}`
  return config
})

export const useAxios = () => {
  return { api , apiAuth }
}
