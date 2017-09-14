/**
 * Created by 熊超超 on 2017/4/23.
 */
export default [
  {
    path: '/book',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/BookHome').default)
      }, 'group-book')
    }
  },
  {
    path: '/citySelector(/:type)',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../common/components/CitySelector').default)
      }, 'group-book')
    }
  },
  {
    path: '/flight(/:type)',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Flight').default)
      }, 'group-book')
    }
  },
  {
    path: '/calenderV(/:view/:type)',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../common/components/CalendarV').default)
      }, 'group-book')
    }
  },
  {
    path: '/bookAccount',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/BookAccount').default)
      }, 'group-book')
    }
  },
  {
    path: '/bookPay',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/BookPay').default)
      }, 'group-book')
    }
  },
  {
    path: '/bookCardPay',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/BookCardPay').default)
      }, 'group-book')
    }
  }
]
