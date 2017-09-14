/**
 * Created by 张森峰 on 2017/4/25.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'
import * as api from '../api'
import {takeLatest, fork, put, call, select} from 'redux-saga/effects'
import viewUtils from '$assets/js/viewUtils'
// import L from '$i18n'

const data = Immutable.fromJS({
  orderType: 1,
  paymentType: 1,
  aircraftType: '中型机', // 此为测试数据，接口没有返回此数据
  cabinType: '经济舱',  // 此为测试数据，接口没有返回此数据
  food: '有餐食',  // 此为测试数据，接口没有返回此数据
  // orderMessage: [
  //   {
  //     titleData: {
  //       orderState: L.getString('ORDER_MODEL_ORDER_STATE1'),
  //       year: '2016',
  //       month: '10',
  //       day: '27',
  //       hour: '13',
  //       minute: '21',
  //       second: '46',
  //       price: '2000分',
  //       priceType: 2
  //     },
  //     messageData: {
  //       year: '2016',
  //       month: '10',
  //       day: '27',
  //       startingCity: '上海',
  //       endingCity: '北京',
  //       startingTime: '09:45',
  //       startingAirport: '上海虹桥',
  //       endingTime: '11:30',
  //       endingAirport: '北京首都'
  //     },
  //     flightData: {
  //       flightNumber: '多彩航空GY123',
  //       aircraftType: '中型机',
  //       cabinType: '经济舱',
  //       food: '有餐食'
  //     }
  //   }
    // {
    //   titleData: {
    //     orderState: L.getString('ORDER_MODEL_ORDER_STATE2'),
    //     year: '2016',
    //     month: '10',
    //     day: '27',
    //     hour: '13',
    //     minute: '21',
    //     second: '46',
    //     price: '￥870',
    //     priceType: 1
    //   },
    //   messageData: {
    //     year: '2016',
    //     month: '10',
    //     day: '27',
    //     startingCity: '北京',
    //     endingCity: '上海',
    //     startingTime: '09:45',
    //     startingAirport: '北京首都',
    //     endingTime: '11:30',
    //     endingAirport: '上海虹桥'
    //   },
    //   flightData: {
    //     flightNumber: '多彩航空GY234',
    //     aircraftType: '中型机',
    //     cabinType: '经济舱',
    //     food: '有餐食'
    //   }
    // },
    // {
    //   titleData: {
    //     orderState: L.getString('ORDER_MODEL_ORDER_STATE1'),
    //     year: '2016',
    //     month: '10',
    //     day: '27',
    //     hour: '13',
    //     minute: '21',
    //     second: '46',
    //     price: '￥1120',
    //     priceType: 1
    //   },
    //   messageData: {
    //     year: '2016',
    //     month: '10',
    //     day: '27',
    //     startingCity: '上海',
    //     endingCity: '北京',
    //     startingTime: '09:45',
    //     startingAirport: '上海虹桥',
    //     endingTime: '11:30',
    //     endingAirport: '北京首都'
    //   },
    //   flightData: {
    //     flightNumber: '多彩航空GY345',
    //     aircraftType: '中型机',
    //     cabinType: '经济舱',
    //     food: '有餐食'
    //   }
    // },
    // {
    //   titleData: {
    //     orderState: L.getString('ORDER_MODEL_ORDER_STATE3'),
    //     year: '2016',
    //     month: '10',
    //     day: '27',
    //     hour: '13',
    //     minute: '21',
    //     second: '46',
    //     price: '￥930',
    //     priceType: 1
    //   },
    //   messageData: {
    //     year: '2016',
    //     month: '10',
    //     day: '27',
    //     startingCity: '广州',
    //     endingCity: '西安',
    //     startingTime: '09:45',
    //     startingAirport: '广州白云',
    //     endingTime: '11:30',
    //     endingAirport: '西安咸阳'
    //   },
    //   flightData: {
    //     flightNumber: '多彩航空GY432',
    //     aircraftType: '中型机',
    //     cabinType: '经济舱',
    //     food: '有餐食'
    //   }
    // },
    // {
    //   titleData: {
    //     orderState: L.getString('ORDER_MODEL_ORDER_STATE4'),
    //     year: '2016',
    //     month: '10',
    //     day: '27',
    //     hour: '13',
    //     minute: '21',
    //     second: '46',
    //     price: '￥780',
    //     priceType: 1
    //   },
    //   messageData: {
    //     year: '2016',
    //     month: '10',
    //     day: '27',
    //     startingCity: '上海',
    //     endingCity: '北京',
    //     startingTime: '09:45',
    //     startingAirport: '上海虹桥',
    //     endingTime: '11:30',
    //     endingAirport: '北京首都'
    //   },
    //   flightData: {
    //     flightNumber: '多彩航空GY321',
    //     aircraftType: '中型机',
    //     cabinType: '经济舱',
    //     food: '有餐食'
    //   }
    // }
  // ],
  orderList: [],
  cancleTickStatus: [], // 取消订单的返回结果
  orderDetail: null, // 订单详情的返回结果
  detailOrderNo: ''
})

export const actions = {
  ticketOrder: () => ({type: 'ticketOrder'}),
  allOrder: () => ({type: 'allOrder'}),
  allPayment: () => ({type: 'allPayment'}),
  cashPayment: () => ({type: 'cashPayment'}),
  integralPayment: () => ({type: 'integralPayment'}),
  orderHistoryPay: () => ({type: 'orderHistoryPay'}),
  getOrderHistoryData: () => ({type: 'getOrderHistoryData'}),
  getOrderHistoryDataSuccess: data => ({type: 'getOrderHistoryDataSuccess', data}),
  cancleTick: tickParams => ({type: 'cancleTick', tickParams}),
  cancleTickSuccess: data => ({type: 'cancleTickSuccess', data}),
  getOrderDetail: data => ({type: 'getOrderDetail', data}),
  getOrderDetailSuccess: data => ({type: 'getOrderDetailSuccess', data}),
  setDetailOrderNo: data => ({type: 'setDetailOrderNo', data})
  // modifyOrderStatusStr: str => ({type: 'modifyOrderStatusStr', str})
}

export const reducer = createdReducer(data, {
  setDetailOrderNo (state, action) {
    return state.set('detailOrderNo', action.data.orderNo)
  },
  ticketOrder (state, action) {
    return state.update('orderType', v => 1)
  },
  allOrder (state, action) {
    return state.update('orderType', v => 2)
  },
  allPayment (state, action) {
    return state.update('paymentType', v => 1)
  },
  cashPayment (state, action) {
    return state.update('paymentType', v => 2)
  },
  integralPayment (state, action) {
    return state.update('paymentType', v => 3)
  },
  orderHistoryPay (state, action) {
    console.log('orderHistoryPay')
  },
  getOrderHistoryDataSuccess (state, action) {
    // let list = state.get('orderList')
    // list = list.push(...action.data)
    return state.set('orderList', Immutable.fromJS(action.data.reverse()))
  },
  // 取消订单的结果回调
  cancleTickSuccess (state, action) {
    let list = state.get('orderList').toJS()
    list.forEach((item, i) => {
      if (item.orderNo === action.data.orderNo) {
        item.orderStatus = action.data.orderStatus
      }
    })
    return state.set('cancleTickStatus', Immutable.fromJS(action.data))
        .set('orderList', Immutable.fromJS(list))
        .setIn(['orderDetail', 'baseBookInfoVO', 'orderStatus'], action.data.orderStatus)
  },
  getOrderDetailSuccess (state, action) {
    return state.set('orderDetail', Immutable.fromJS(action.data))
  }
})

function* runGetOrderHistoryData (action) {
  const flightModel = yield select(state => state.get('flightModel').toJS())
  const {res, err} = yield call(api.getOrderHistoryData, flightModel)
  if (res) {
    yield put({type: 'getOrderHistoryDataSuccess', data: res.data.orderListNodeList})
  } else {
    console.log('失败' + err)
  }
}
// 取消订单，避免自动取消生产的订单
function* runCancleTicke (action) {
  const {res, err} = yield call(api.cancleTick, action.tickParams)
  if (res) {
    yield put({type: 'cancleTickSuccess', data: res.data})
  } else {
    console.log('取消订单失败' + err)
  }
}
function* runGetOrderDetail (action) {
  // console.log(action.data)
  yield put({type: 'getOrderDetailSuccess', data: null})
  const {res, err} = yield call(api.getOrderDetail, action.data)
  if (res) {
    // console.log(res)
    if (!res.data.orderDetailVO) {
      viewUtils.toast('网络异常~')
      // console.log(111)
      return
    }
    yield put({type: 'getOrderDetailSuccess', data: res.data.orderDetailVO})
  } else {
    console.log('失败' + err)
  }
}
function* watchGetOrderHistoryData () {
  yield takeLatest('getOrderHistoryData', runGetOrderHistoryData)
}
function* watchCancleTicke () {
  yield takeLatest('cancleTick', runCancleTicke)
}
function* watchGetOrderDetail () {
  yield takeLatest('getOrderDetail', runGetOrderDetail)
}
export function* sagas () {
  yield fork(watchGetOrderHistoryData)
  yield fork(watchCancleTicke)
  yield fork(watchGetOrderDetail)
}
