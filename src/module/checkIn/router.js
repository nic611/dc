/**
 * Created by Administrator on 2017/4/24.
 */
export default [
  {
    path: '/check',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/CheckInHome').default)
      }, 'group-check')
    }
  },
  {
    path: '/checkFlight',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/CheckInFlight').default)
      }, 'group-check')
    }
  },
  {
    path: '/checkSelect',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/CheckInSelect').default)
      }, 'group-check')
    }
  },
  {
    path: '/checkSuccess',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/CheckInSuccess').default)
      }, 'group-check')
    }
  }
]
