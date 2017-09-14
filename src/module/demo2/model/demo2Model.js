/**
 * Created by 熊超超 on 2017/4/18.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'
import {takeEvery, fork, put, take, call} from 'redux-saga/effects'
import * as api from '../api'

const data = Immutable.fromJS({
  count: 0
})

export const actions = {
  increment: () => ({type: 'increment'}),
  sagaTest: () => ({type: 'sagaTest'}),
  hello: (n) => ({type: 'hello', n: n})
}

export const reducer = createdReducer(data, {
  increment (state, action) {
    // return state.set('count', state.get('count') + 1)
    return state.update('count', v => v + 1)
  }
})

function* runSagaTest (action) {
  // yield delay(1000)
  const {res, err} = yield call(api.testAxios)
  if (res) {
    console.log('成功')
  } else {
    console.log('失败' + err)
  }
  yield put({type: 'increment'})
}

function* runHelloSaga () {
  while (true) {
    // yield take('hello')
    let { n } = yield take('hello')
    console.log(`Hello Saga!${n}`)
  }
}

function* sagaTest () {
  yield takeEvery('sagaTest', runSagaTest)
}

export function* sagas () {
  yield fork(sagaTest)
  yield fork(runHelloSaga)
}
