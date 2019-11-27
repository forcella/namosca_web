import axios from 'axios'
import { getToken } from './autenticar'

const api = axios.create({
  baseURL: 'http://127.0.0.1:9090'
})

api.interceptors.request.use(async config => {
  console.log(config.headers.Authorization)
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
