import axios from 'axios'
import appConstant from '../constant/constant'

const myAxios = axios.create({
  baseURL: appConstant.URL,
  timeout: 10000
})

myAxios.interceptors.request.use(config => {
  console.log(config.url);

  return config
}, (error) => {
  // TODO: Display toast message or popup of internal error
})

export { myAxios }
