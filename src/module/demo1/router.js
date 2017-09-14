/**
 * Created by cc on 2017/4/13.
 */
export default {
  path: '/demo1',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Home').default)
    }, 'group-demo1')
  },
  childRoutes: [
    {
      path: 'home',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/AView').default)
        }, 'group-demo1')
      }
    },
    {
      path: 'todo',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/TodoView').default)
        }, 'group-demo1')
      }
    }
  ]
}
