/**
 * Created by 熊超超 on 2017/4/19.
 */

import { fork } from 'redux-saga/effects'
// import { sagas as demo2 } from './demo2/model/demo2Model'
import { sagas as flight } from './book/model/flightModel'
import { sagas as order } from './order/model/orderModel'

export default function* rootSaga () {
  // yield fork(demo2)
  yield fork(flight)
  yield fork(order)
}
