import axios from 'axios'

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

export const useAxios = () => {
  return { api }
}
