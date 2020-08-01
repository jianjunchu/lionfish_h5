import axios from 'axios'
import store from '@/lionfish_comshop/store'
import { getToken } from '@/lionfish_comshop/utils/auth'

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
      i: 3,
      t: 0,
      v: '12.4.0',
      from: 'wxapp',
      c: 'entry',
      a: 'wxapp',
      do: 'index',
      m: 'lionfish_comshop',
      sign: '60dcd9b5925c119972907bbf22255441',
      token: '78584c3f5c573fac6a47d3cb98ec7e04',
      ...config.params
    }

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
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

