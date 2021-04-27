import axios from 'axios'
import store from '@/ulink_comshop/store'
import { getToken } from '@/ulink_comshop/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 17000 // request timeout

})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    config.params = {
      i: process.env.VUE_APP_BASE_UNIACID,
      t: 0,
      v: '12.4.0',
      from: 'wxapp',
      c: 'entry',
      a: 'wxapp',
      do: 'index',
      m: 'lionfish_comshop',
      ...config.params
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    /* Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })*/
    return Promise.reject(error)
  }
)

export default service

