/**
 * Created by 熊超超 on 2017/4/28.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'
import moment from '$assets/js/moment'
import * as api from '../api'
import {takeLatest, fork, put, call, select} from 'redux-saga/effects'
import routerUtils from '$assets/js/routerUtils'

const mockDate = []
for (let i = 0; i < 180; i++) {
  // mockDate.push({DateFormat: moment().add(i, 'd').format('YYYY-MM-DD'), LowestPrice: (Math.random() * 1000 + 200).toFixed()})
  mockDate.push({dateFormat: moment().add(1, 'M').add(i, 'd').format('YYYY-MM-DD'), lowestPrice: ''})
}

const data = Immutable.fromJS({
  depName: '贵阳', // 出发机场的中文名称
  depCode: 'KWE', // 出发机场
  arrName: '铜仁', // 到达机场的中文名称
  arrCode: 'TEN', // 到达机场
  calendarStartDate: moment().add(1, 'M').locale('en').format('YYYY-MM-DD'),
  calendarBackDate: moment().add(1, 'M').locale('en').format('YYYY-MM-DD'),
  flightDate: moment().add(1, 'M').locale('en').format('DDMMMYY').toUpperCase(), // 出发日期
  returnDate: moment().add(1, 'M').add(1, 'd').locale('en').format('DDMMMYY').toUpperCase(), // 返回日期
  flightStartDate: moment().add(1, 'M').format('M月DD日 YYYY年'), // 出发日期中文
  flightBackDate: moment().add(1, 'd').add(1, 'M').format('M月DD日 YYYY年'), // 返回日期中文
  adultCount: 1, // 成人乘客数量
  childCount: 0, // 儿童乘客数量
  tripType: 1, // 航程类型 [1 单程”,2 往返, 3.多程]
  ticketType: 'start',
  carrier: 'GY',   // 承运公司二字码
  directFlight: 'true',  // 是否只查询直达航班true/false
  initPrices: 'true',   // 是否同时查询shopping运价（公布，私有），默认为 true(true/false)
  initTaxes: 'true',   // 是否同时查询税费信息，默认为 true(true/false)
  infantNum: '0',
  cabinC: '经济舱', // B:商务舱,C:经济舱
  cabinB: '公务舱/头等舱',
  salesFlightPATFareGroupList: [],
  salesSegmentFlightList: [],   // 2 预定查询接口返回参数   去程
  salesSegmentFlightListBack: [],   // 回程
  flightStartVO: {},  // 去程信息拼装, 方便请求创建订单
  flightReturnVO: {}, // 返程信息拼装, 方便请求创建订单
  priceStartVO: {},  // 去程费用信息拼装, 方便请求价格接口
  priceReturnVO: {}, // 返程费用拼装, 方便请求价格接口
  itemStartVO: {}, // 去程价格信息拼装
  itemReturnVO: {}, // 回程价格信息拼装
  priceCalendar: mockDate,
  orderParams: {},
  orderPay: [],
  orderTicket: [],  // 出票接口响应
  order: [],
  contactPhone: '15013325856', // 联系人电话暂时写死
  ticketLimitTime: moment().add(30, 'm').format('YYYY-MM-DD kk:mm'),  // 留票时间暂时存创建订单时间+30min
  passenger: [
    {
      name: '测试',
      IDCard: '420118596558963321',
      phone: '15013325856',
      adult: 0
    }
  ],
  price: {
    adult: '1910',
    aviationFund: '100',
    fuelOil: '100',
    insurance: '60',
    sum: '2170',
    flag: 1  // 1是勾选  0是不勾选
  },
  luggage: {
    flag: 1  // 1是勾选  0是不勾选
  },
  bookCardPay: {
    cardNum: '',
    month: '',
    year: '',
    CVN2: ''
  },
  // orderTicketInput: {}, //
  orderPagesNo: 1
})

export const actions = {
  changeTripType: (selectIndex) => ({type: 'changeTripType', selectIndex}),
  swapCity: () => ({type: 'swapCity'}),
  swapCabin: () => ({type: 'swapCabin'}),
  selectCity: (city, code, flag) => ({type: 'selectCity', city, code, flag}),
  changePsg: (psgType, n) => ({type: 'changePsg', psgType, n}),
  calendarSelectedDay: (calendar, kind) => ({type: 'calendarSelectedDay', calendar, kind}),
  getFlightDate: daysParams => ({type: 'getFlightDate', daysParams}),
  getFlightDateSuccess: data => ({type: 'getFlightDateSuccess', data}),
  getBookResult: params => ({type: 'getBookResult', params}),
  getBookResultSuccess: data => ({type: 'getBookResultSuccess', data}),
  getBookResultReturn: params => ({type: 'getBookResultReturn', params}),
  getBookResultReturnSuccess: data => ({type: 'getBookResultReturnSuccess', data}),
  getPricing: params => ({type: 'getPricing', params}),
  getPricingSuccess: data => ({type: 'getPricingSuccess', data}),
  initFlightStartInfo: info => ({type: 'initFlightStartInfo', info}),
  initFlightBackInfo: info => ({type: 'initFlightBackInfo', info}),
  initPriceStartInfo: info => ({type: 'initPriceStartInfo', info}),
  initPriceBackInfo: info => ({type: 'initPriceBackInfo', info}),
  toggleSalesSegmentFlightExpand: (i, expand) => ({type: 'toggleSalesSegmentFlightExpand', i, expand}),
  toggleSalesSegmentFlightExpandBack: (i, expand) => ({type: 'toggleSalesSegmentFlightExpandBack', i, expand}),
  deletePassengerItem: (data, i) => ({type: 'deletePassengerItem', data, i}),
  changeAccountCheckState: (title) => ({type: 'changeAccountCheckState', title}),
  creatOrder: params => ({type: 'creatOrder', params}),
  creatOrderSuccess: () => ({type: 'creatOrderSuccess', data}),
  orderPay: () => ({type: 'orderPay'}),
  orderPaySuccess: () => ({type: 'orderPaySuccess', data}),
  orderTicketInput: (data) => ({type: 'orderTicketInput', data}),
  orderTicket: (data) => ({type: 'orderTicket', data}),
  orderTicketSuccess: () => ({type: 'orderTicketSuccess', data}),
  flightPassengerAdd: data => ({type: 'flightPassengerAdd', data}),
  cardNumChange: data => ({type: 'cardNumChange', data}),
  cardPayMonthChange: data => ({type: 'cardPayMonthChange', data}),
  cardPayYearChange: data => ({type: 'cardPayYearChange', data}),
  cardPayCVN2Change: data => ({type: 'cardPayCVN2Change', data}),
  resetBookCardPay: () => ({type: 'resetBookCardPay'}),
  addOrderPageNo: () => ({type: 'addOrderPageNo'})
}

export const reducer = createdReducer(data, {
  addOrderPageNo (state, action) {
    let no = state.get('orderPagesNo')
    // console.log(no)
    no = parseInt(no) + 1
    return state.set('orderPagesNo', no)
  },
  orderTicketInput (state, action) {
    // console.log(action.data)
    return state.set('orderParams', action.data)
  },
  changeTripType (state, action) {
    return state.set('tripType', action.selectIndex).set('ticketType', action.selectIndex === 1 ? 'start' : 'return')
  },
  swapCity (state, action) {
    let cityFrom = state.get('depName')
    let cityFromCode = state.get('depCode')
    let cityTo = state.get('arrName')
    let cityToCode = state.get('arrCode')
    return state.set('depName', cityTo).set('arrName', cityFrom).set('depCode', cityToCode).set('arrCode', cityFromCode)
  },
  swapCabin (state, action) {
    let C = state.get('cabinC')
    let B = state.get('cabinB')
    return state.set('cabinC', B).set('cabinB', C)
  },
  selectCity (state, action) {
    if (action.flag === 0) {
      return state.set('depName', action.city).set('depCode', action.code)
    } else {
      return state.set('arrName', action.city).set('arrCode', action.code)
    }
  },
  calendarSelectedDay (state, action) {
    let type = action.kind
    if (type === 'start') {
      return state.set('flightStartDate', moment(action.calendar.activeData).add(1, 'M').format('M月DD日 YYYY年')).set('flightDate', moment(action.calendar.activeData).add(1, 'M').locale('en').format('DDMMMYY').toUpperCase()).set('calendarStartDate', moment(action.calendar.activeData).add(1, 'M').locale('en').format('YYYY-MM-DD'))
    } else {
      return state.set('flightBackDate', moment(action.calendar.activeData).format('M月DD日 YYYY年')).set('returnDate', moment(action.calendar.activeData).locale('en').format('DDMMMYY').toUpperCase()).set('calendarBackDate', moment(action.calendar.activeData).locale('en').format('YYYY-MM-DD'))
    }
  },
  changePsg (state, action) {
    return state.update(action.psgType, v => {
      if (action.psgType === 'adultCount') {
        return Math.max(Math.min(v + action.n, 5 - state.get('childCount')), 0)
      } else if (action.psgType === 'childCount') {
        return Math.max(Math.min(v + action.n, 5 - state.get('adultCount')), 0)
      }
    })
  },
  initFlightStartInfo (state, action) {
    return state.set('flightStartVO', Immutable.fromJS(action.info))
  },
  initFlightBackInfo (state, action) {
    return state.set('flightReturnVO', Immutable.fromJS(action.info))
  },
  initPriceStartInfo (state, action) {
    return state.set('priceStartVO', Immutable.fromJS(action.info))
  },
  initPriceBackInfo (state, action) {
    return state.set('priceReturnVO', Immutable.fromJS(action.info))
  },
  toggleSalesSegmentFlightExpand (state, action) {
    const salesSegmentFlightList = state.get('salesSegmentFlightList').toJS()
    if (!action.expand) { // 如果是展开，那么要收起其他的
      salesSegmentFlightList.forEach(item => { item.expand = false })
    }
    // 切换点击的条目的状态
    salesSegmentFlightList[action.i].expand = !action.expand
    return state.set('salesSegmentFlightList', Immutable.fromJS(salesSegmentFlightList))
  },
  toggleSalesSegmentFlightExpandBack (state, action) {
    const salesSegmentFlightListBack = state.get('salesSegmentFlightListBack').toJS()
    if (!action.expand) { // 如果是展开，那么要收起其他的
      salesSegmentFlightListBack.forEach(item => { item.expand = false })
    }
    // 切换点击的条目的状态
    salesSegmentFlightListBack[action.i].expand = !action.expand
    return state.set('salesSegmentFlightListBack', Immutable.fromJS(salesSegmentFlightListBack))
  },
  deletePassengerItem (state, action) {
    let newPassenger = state.get('passenger').splice(action.i, 1)
    return state.set('passenger', newPassenger)
  },
  changeAccountCheckState (state, action) {
    let checkState = state.getIn([action.title, 'flag'])
    if (checkState === 0) {
      return state.setIn([action.title, 'flag'], 1)
    } else {
      return state.setIn([action.title, 'flag'], 0)
    }
  },
  // todo 临时增加的方法，后期去除
  changePriceCalendar (state, action) {
    const date = moment(action.date).subtract(3, 'd')
    const data = []
    for (let i = 0; i < 7; i++) {
      data.push({dateFormat: date.add(1, 'd').format('YYYY-MM-DD'), lowestPrice: ''})
    }
    return state  // .set('priceCalendar', Immutable.fromJS(data))
  },
  getFlightDateSuccess (state, action) {
    return state
    // if (!action.data || action.data.length === 0) {
    //   const date = moment(action.date).subtract(3, 'd')
    //   const data = []
    //   for (let i = 0; i < 7; i++) {
    //     data.push({dateFormat: date.add(1, 'd').format('YYYY-MM-DD'), lowestPrice: ''})
    //   }
    //   return state.set('priceCalendar', Immutable.fromJS(data))
    // }
    // return state.set('priceCalendar', Immutable.fromJS(action.data))
  },
  getBookResultSuccess (state, action) {
    return state.set('salesSegmentFlightList', Immutable.fromJS(action.data))
  },
  getBookResultReturnSuccess (state, action) {
    return state.set('salesSegmentFlightListBack', Immutable.fromJS(action.data))
  },
  getPricingSuccess (state, action) {
    return state.set('salesFlightPATFareGroupList', Immutable.fromJS(action.data))
  },
  creatOrderSuccess (state, action) {
    return state.set('orderParams', Immutable.fromJS(action.data))
  },
  orderPaySuccess (state, action) {
    return state.set('orderPay', Immutable.fromJS(action.data))
  },
  orderTicketSuccess (state, action) {
    routerUtils.go('/orderHistory')
    return state.set('orderTicket', Immutable.fromJS(action.data))
  },
  flightPassengerAdd (state, action) {
    let newPassenger = {
      name: action.data.nameCHS1 + action.data.nameCHS2,
      IDCard: action.data.documentNum,
      phone: action.data.mobile,
      adult: 0
    }
    return state.update('passenger', v => v.push(newPassenger))
  },
  cardNumChange (state, action) {
    return state.setIn(['bookCardPay', 'cardNum'], action.data)
  },
  cardPayMonthChange (state, action) {
    return state.setIn(['bookCardPay', 'month'], action.data)
  },
  cardPayYearChange (state, action) {
    return state.setIn(['bookCardPay', 'year'], action.data)
  },
  cardPayCVN2Change (state, action) {
    return state.setIn(['bookCardPay', 'CVN2'], action.data)
  },
  resetBookCardPay (state, action) {
    let newBookCardPay = {
      cardNum: '',
      month: '',
      year: '',
      CVN2: ''
    }
    return state.set('bookCardPay', Immutable.fromJS(newBookCardPay))
  }
})

function* runGetFlightDate (action) {
  const {res, err} = yield call(api.getFlightDate, action.daysParams)
  if (res) {
    // todo 接口有数据后删除此行并打开下面一行的注释
    // yield put({type: 'getFlightDateSuccess', data: mockDate})
    yield put({type: 'getFlightDateSuccess', data: res.data.priceCalendarList})
  } else {
    console.log('失败' + err)
  }
}

function* runGetBookResult (action) {
  const {res, err} = yield call(api.getBookResult, action.params)
  if (res) {
    yield put({type: 'getBookResultSuccess', data: res.data.salesSegmentFlightList})
  } else {
    console.log('失败' + err)
  }
}

function* runGetBookResultReturn (action) {
  const {res, err} = yield call(api.getBookResultReturn, action.params)
  if (res) {
    yield put({type: 'getBookResultReturnSuccess', data: res.data.salesSegmentFlightList})
  } else {
    console.log('失败' + err)
  }
}

function* runGetPricing (action) {
  const {res, err} = yield call(api.getPricing, action.params)
  if (res) {
    yield put({type: 'getPricingSuccess', data: res.data.salesFlightPATFareGroupList})
  } else {
    console.log('失败' + err)
  }
}

function* runCreatOrder (action) {
  const priceInfo = yield select(state => state.getIn(['flightModel', 'salesFlightPATFareGroupList']).toJS())
  const {res, err} = yield call(api.creatOrder, {order: action.params, priceInfo})
  if (res) {
    yield put({type: 'creatOrderSuccess', data: res.data})
  } else {
    console.log('失败' + err)
  }
}

function* runOrderPay (action) {
  const {res, err} = yield call(api.orderPay, action.params)
  if (res) {
    yield put({type: 'orderPaySuccess', data: res.data.orderPay})
  } else {
    console.log('失败' + err)
  }
}

function* runOrderTicket (action) {
  const {res, err} = yield call(api.orderTicket, action.data)
  if (res) {
    yield put({type: 'orderTicketSuccess', data: res.data.orderTicket})
  } else {
    console.log('失败' + err)
  }
}

function* watchGetFlightDate () {
  yield takeLatest('getFlightDate', runGetFlightDate)
}

function* watchGetBookResult () {
  yield takeLatest('getBookResult', runGetBookResult)
}

function* watchGetBookResultReturn () {
  yield takeLatest('getBookResultReturn', runGetBookResultReturn)
}

function* watchGetPricing () {
  yield takeLatest('getPricing', runGetPricing)
}

function* watchCreatOrder () {
  yield takeLatest('creatOrder', runCreatOrder)
}

function* watchOrderPay () {
  yield takeLatest('orderPay', runOrderPay)
}

function* watchOrderTicket () {
  yield takeLatest('orderTicket', runOrderTicket)
}

export function* sagas () {
  yield fork(watchGetFlightDate)
  yield fork(watchGetBookResult)
  yield fork(watchGetBookResultReturn)
  yield fork(watchGetPricing)
  yield fork(watchCreatOrder)
  yield fork(watchOrderPay)
  yield fork(watchOrderTicket)
}
