/**
 * Created by 熊超超 on 2017/4/16.
 */
export default {
  path: '/redux',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      window.$store.reducerRegistry.register({demo2Model: require('./model/demo2Model').reducer})
      window.$store.runSaga(require('./model/demo2Model').sagas)
      cb(null, require('./components/Home').default)
    }, 'group-demo2')
  },
  childRoutes: [
    {
      path: 'demo',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/Demo').default)
        }, 'group-demo2')
      }
    }
  ]
}
