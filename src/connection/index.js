/**
 * Created by 熊超超 on 2017/4/19.
 */
import axios from 'axios'
// import { showLoading, hideLoading } from 'react-redux-loading-bar'
import store from '$store'
import md5 from '$assets/js/md5'
import moment from '$assets/js/moment'
import viewUtils from '$assets/js/viewUtils'
// 测试
const appId = 'cf994ba13476292b3ad36f5cf394d31f'
const appKey = 'e9f381f62e9a491089416ff7e24f60cc'
const myPhone = '15013325856'

// // 生产
// const appId = '85d7cf5dd32ce88341afa11ea3b5b35c'
// const appKey = 'c0aca03574984446a39e821e6a5ef0bb'
// const myPhone = '15013325856'
// const myPhone = '13430329922'

// 登录用户密码
export const kLoginAccount = '13800138000'
export const kPassword = 'foss123456'

const contactInfoVO = {    // 全局联系人方式
  contactBackupPhone: myPhone,
  contactName: '测试',
  contactPhone: myPhone,
  ticketLimitTime: moment().add(30, 'm').format('YYYY-MM-DD kk:mm')
}

// 创建一个axios实例
const axiosInstance = axios.create({
  baseURL: '/unification-api',
  headers: {'Content-Type': 'application/json', appId: appId, appKey: appKey},
  timeout: 45000// 请求超时时间
})
// 注册请求拦截器
axiosInstance.interceptors.request.use(config => {
  config.data.identification = {
    countryCode: 'CN',
    userID: appId
  }
  config.data = JSON.stringify(config.data)
  config.headers.sign = createSign(config.url, config.data)
  // store.dispatch({type: 'loadingTipsShow'})
  return config
}, err => {
  return Promise.reject(err)
})
// 注册响应拦截器
axiosInstance.interceptors.response.use(response => {
  store.dispatch({type: 'loadingTipsHidden'})
  return response
}, err => {
  store.dispatch({type: 'loadingTipsHidden'})
  viewUtils.toast('网络连接不可用')
  // setTimeout(() => {
  // }, 500)
  // store.dispatch(hideLoading())
  return Promise.reject(err)
})

function createSign (url, data) {
  return md5.md5(process.env.HOST + url + data + appId + appKey)
}

export default axiosInstance
export {contactInfoVO}
