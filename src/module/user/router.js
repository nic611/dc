/**
 * Created by 张森峰 on 2017/4/27.
 */
export default [
  {
    path: '/user',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/User').default)
      }, 'user')
    }
  },
  {
    path: '/logIn',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/LogIn').default)
      }, 'logIn')
    }
  },
  {
    path: '/passenger',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Passenger').default)
      }, 'passenger')
    }
  },
  {
    path: '/passengerAdd',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/PassengerAdd').default)
      }, 'passengerAdd')
    }
  }
]
