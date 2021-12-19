import axios from 'axios'
import appConstant from '../constant/app-constant'

const myAxios = axios.create({
  baseURL: appConstant.URL,
  timeout: 10000
})

myAxios.interceptors.request.use(config => {
  console.log(config.url)
  const token = localStorage.getItem("a-token")
  const refreshToken = localStorage.getItem("b-token")
  config.headers["Authorization"] = `Bearer ${token}`
  config.headers["AuthorizationX"] = `${refreshToken}`
  return config
}, (error) => {
  console.log("intercepted error req")
})

myAxios.interceptors.response.use(response => {
  // TODO: If response contain new access token, replace it in local storage
  const newToken = response.headers["authorization"]
  if (newToken) {
    localStorage.setItem("a-token", newToken)
  }
  return response
}, (error) => {
  console.log("intercepted error resp")
  if (error.response.status === 401 || error.response.status === 403) {
    localStorage.clear()
    document.location.href = "/"
  }
  return Promise.reject(error)
})

export { myAxios }
