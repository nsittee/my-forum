import { IResponseEntity } from './../shared/response.model';
import axios from 'axios'
import appConstant from '../constant/app-constant'

const SIGNIN_API = "/api/users/signin"

const myAxios = axios.create({
  baseURL: appConstant.URL,
  timeout: 10000
})

myAxios.interceptors.request.use(config => {
  console.log(config.url)
  const token = localStorage.getItem("a-token")
  config.headers["Authorization"] = `Bearer ${token}`
  return config
}, (error) => {
  console.log("intercepted error req")
})

// Implementation sample of refresh-token with axios from `https://www.bezkoder.com/react-refresh-token/`
myAxios.interceptors.response.use(
  response => {
    // TODO: If response contain new access token, replace it in local storage
    // const newToken = response.headers["authorization"]
    // if (newToken) {
    // localStorage.setItem("a-token", newToken)
    // }
    console.log('normal')
    return response
  }, async (err) => {
    const originalConfig = err.config // as AxiosRequestConfig
    console.log('error 1')
    if (err.response && originalConfig.url !== SIGNIN_API) {
      console.log('error 2')
      if (err.response.status === 401 && !originalConfig._retry) {
        console.log('error 3')
        originalConfig._retry = true;
        try {
          const refreshToken = localStorage.getItem("b-token")
          const newTokenResp = (await myAxios.post<IResponseEntity<string>>('/api/users/refresh-token', { refreshToken })).data
          console.log(newTokenResp.message)
          console.log(newTokenResp.data)
        } catch (_err) {
          return Promise.reject(_err)
        }
      } else {
        localStorage.clear()
        document.location.href = "/"
      }
    }
    return Promise.reject(err)
  })

export { myAxios }
