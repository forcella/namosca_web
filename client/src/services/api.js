import axios from 'axios'
import { getToken, logout } from './autenticar'

const api = axios.create({
  baseURL: 'http://127.0.0.1:9090'
})

api.interceptors.request.use(async config => {
  console.log(config)
  const token = getToken()
  if (token !== 'undefined' && !!token) {
    config.headers.Authorization = token
  }
  return config
})

api.interceptors
  .response
  .use(async response => {
    return response
  }, async error => {
    console.log(error)
    // if (error.status === 401 || error.status === 403) { logout() }
    logout()
  })

export default api
