/**
 * Created by 张森峰 on 2017/4/27.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'

import L from '$i18n'

const data = Immutable.fromJS({
  userMessage: {
    nameCHS1: '张',
    nameCHS2: '三',
    nameEN1: 'Zhang',
    nameEN2: 'San',
    cardType: L.getString('USER_MODEL_PASSENGER_CARD_TYPE'),
    cardNumber: 5001928958,
    integral: 0.0
  },
  userLogInState: false, // 用户登录状态
  href: [
    {
      title: L.getString('USER_MODEL_USER_ORDER_LIST'),
      url: '/orderHistory',
      id: 1
    },
    {
      title: L.getString('USER_MODEL_USER_PASSENGER_LIST'),
      url: '/passenger',
      id: 2
    },
    {
      title: L.getString('USER_MODEL_USER_CREDIT_CARD'),
      url: '',
      id: 3
    },
    {
      title: L.getString('USER_MODEL_USER_ADDRESS'),
      url: '',
      id: 4
    },
    {
      title: L.getString('USER_MODEL_USER_COUPON'),
      url: '',
      id: 5
    }
  ],
  logInCheckboxState: 1, // 登陆页面“保持登录”多选框是否选中( 0: 未选中 / 1: 选中 )
  logInUserName: '',     // 登录页面“账号”input框的值
  logInUserPassword: ''  // 登录页面“密码”input框的值
})

export const actions = {
  userLogInStateChange: bool => ({type: 'userLogInStateChange', bool}),
  loginCheckboxStateChange: () => ({type: 'loginCheckboxStateChange'}),
  logInUserNameChange: value => ({type: 'logInUserNameChange', value}),
  logInUserPasswordChange: value => ({type: 'logInUserPasswordChange', value}),
  logInUserMessageUnloading: () => ({type: 'logInUserMessageUnloading'})
}

export const reducer = createdReducer(data, {
  userLogInStateChange (state, action) {
    return state.set('userLogInState', action.bool)
  },
  loginCheckboxStateChange (state, action) {
    return state.update('logInCheckboxState', v => 1 - v)
  },
  logInUserNameChange (state, action) {
    return state.set('logInUserName', action.value)
  },
  logInUserPasswordChange (state, action) {
    return state.set('logInUserPassword', action.value)
  },
  logInUserMessageUnloading (state, action) {
    return state.set('logInUserName', '')
    .set('logInUserPassword', '')
  }
})
