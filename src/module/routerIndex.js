/**
 * Created by 熊超超 on 2017/4/18.
 */

import Demo1 from '$module/demo1/router'
import Demo2 from '$module/demo2/router'
import Book from '$module/book/router'
import MainView from '$cc/MainView'
import BookHome from '$module/book/components/BookHome'
import Dynamic from '$module/dynamic/router'
import CheckIn from '$module/checkIn/router'
import Order from '$module/order/router'
import User from '$module/user/router'

export default [
  {
    path: '/',
    component: MainView,
    onEnter (nextState, replace, next) {
      checkAuth(null, nextState, replace, next)
    },
    onChange (prevState, nextState, replace, next) {
      checkAuth(prevState, nextState, replace, next)
    },
    indexRoute: {
      component: BookHome
    },
    childRoutes: [
      Demo1, Demo2, ...Book, ...Dynamic, ...CheckIn, ...Order, ...User
    ]
  }
]
const checkAuth = (prevState, nextState, replace, next) => {
  const tokenInfo = localStorage.getItem('tokenInfo')
  if (tokenInfo) {
    next()
  } else {
    // todo 待加入权限认证
    // replace('/')
    next()
  }
}
