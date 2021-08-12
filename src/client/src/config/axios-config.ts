import axios from 'axios'
import appConstant from '../constant/app-constant'

const myAxios = axios.create({
  baseURL: appConstant.URL,
  timeout: 10000
})

myAxios.interceptors.request.use(config => {
  console.log(config.url);

  return config
}, (error) => {
  // TODO: Display toast message or popup of internal error
  console.log("intercepted error req");
})

myAxios.interceptors.response.use(response => {
  return response
}, (error) => {
  console.log("intercepted error resp");
})

export { myAxios }
