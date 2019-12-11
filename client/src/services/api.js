import axios from 'axios'
import { getToken, logout } from './autenticar'

const api = axios.create({
  baseURL: 'http://127.0.0.1:9090'
})

api.interceptors.request.use(async config => {
  const token = getToken()
  if (token !== 'undefined' && !!token) {
    config.headers.Authorization = token
  }
  return config
})

api.interceptors
  .response
  .use(async response => {
    return Promise.resolve(response)
  }, async error => {
    const { response } = await error
    console.log(error.response)
    if (!response || response.status === 401 || response.status === 403) { logout() }
    return Promise.reject(response)
  })

export default api
