export const TOKEN_KEY = '@token'
export const isAuthenticated = () => getToken() !== 'undefined' && !!getToken()
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const login = token => {
  console.log(token)
  localStorage.setItem(TOKEN_KEY, token)
}
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
}
