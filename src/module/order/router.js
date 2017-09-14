/**
 * Created by 张森峰 on 2017/4/25.
 */
export default [
  {
    path: '/orderHistory',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/OrderHistory').default)
      }, 'orderHistory')
    }
  },
  {
    path: '/orderDetail/:orderNo',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/OrderDetail').default)
      }, 'orderHistory')
    }
  }
]
