/**
 * Created by Administrator on 2017/4/24.
 */
export default [
  {
    path: '/dynamic',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/dynamicHome').default)
      }, 'group-dynamic')
    }
  },
  {
    path: '/dynamicList',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/dynamicList').default)
      }, 'group-dynamic')
    }
  },
  {
    path: '/dynamicDetail',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/dynamicDetail').default)
      }, 'group-dynamic')
    }
  }
]
