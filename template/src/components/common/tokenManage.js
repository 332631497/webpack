import axios from 'axios'
import VueCookies from 'vue-cookies'
import Utilities from '@/components/common/Utilities'
import Config from '@/components/common/config'
// 默认的 KEY 与 iv 与后端保持一致 ，不采用后端传值密钥
const KEY = '2008929794whhtsl'// 密钥
const IV = '20199292hhmyzzjh'// 偏移量
/**
 * 前端token管理方法
 * createBy:      lc
 * createTime:    2019/9/24 11:52:27
 */
export default{
  init (option) {
    let isRefreshing = true // 是否刷新refresh_token 的开关
    axios.interceptors.request.use(
      // 添加请求拦截器，在请求头中加token
      config => {
        let token = VueCookies.get(Config.get('atKey'))
        console.log('token = ' + token)
        if (token) { // token有效时 才添加请求头，否则对于放开的url路径 会优先验证失效的token，导致请求失败401
          config.headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json' // token失效时  重复调用post请求 415 ，设置请求头解决该问题
          }
        }
        return config
      },
      error => {
        console.log(' --------请求错误信息--------- ')
        console.log(error)
        return Promise.reject(error)
      }
    )
    // 刷新token方法
    function refreshTokenRequst () {
      console.log('刷新token')
      VueCookies.remove(Config.get('atKey'), '/') // 刷新token前先删除access_token 防止解析无效token返回401
      let rt = Utilities.Decrypt(localStorage.getItem(Config.get('rtKey')), KEY, IV)
      rt = rt.split('').reverse().join('')
      let data = {refresh_token: rt}
      axios.request({
        baseURL: '',
        // url: '/manager/public/refreshToken',
        url: option.refreshTokenUrl,
        method: 'POST',
        headers: {'Authorization': null},
        data
      }).then((response) => {
        console.log('刷新token 返回结果')
        console.log(response)
        data = response.data
        console.log('refresh_token data = ' + data)
        if (data && data.access_token) { // 能够刷新token时 更新cookie中信息
          VueCookies.set(Config.get('atKey'), data.access_token, data.expires_in + 's', '/')
          localStorage.setItem(Config.get('rtKey'), data.refresh_token)
          onAccessTokenFetched() // 重新调用添加到数组中的请求
          isRefreshing = true // 打开刷新开关
        } else { // 返回异常，删除token 跳转到登录页面
          // {"error":"invalid_grant","error_description":"Invalid refresh token: 121313"}
          VueCookies.remove(Config.get('atKey'), '/')
          localStorage.removeItem(Config.get('rtKey'))
          localStorage.removeItem('LT')
          // 跳转登录页
          // window.location.href = '/'
          window.location.href = option.loginUrl
        }
      })
    }
    axios.interceptors.response.use((response) => {
      console.log(' -----调用成功----- ')
      console.log(response.data)
      return response
    }, (err) => { // 这里是返回状态码不为200时候的错误处理
      console.log(' -----调用出错----- ')
      if (err.response) {
        // debugger
        console.log(err.response.data)
        // 获取当前失败的请求
        const config = err.response.config
        if (err.response.status === 401) { // 如果状态是401 刷新token 重新发送请求
          if (isRefreshing) { // 使用开关 防止重复刷新
            refreshTokenRequst()
          }
          isRefreshing = false // 关闭开关
          // 正在刷新token，将返回一个未执行resolve的promise
          return new Promise((resolve) => {
            addSubscriber(() => {
              resolve(axios(config))
            })
          })
        }
      }
      return Promise.reject(err)
    })
    // 依次调用请求，并清空
    let subscribers = []
    function onAccessTokenFetched () {
      subscribers.forEach((callback) => {
        callback()
      })
      subscribers = []
    }
    // 添加请求到队列
    function addSubscriber (callback) {
      subscribers.push(callback)
    }
  }
}
