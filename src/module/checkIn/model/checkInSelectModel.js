/**
 * Created by Administrator on 2017/5/5.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'

const data = Immutable.fromJS({
  name: '',
  startDate: '',
  startTime: '',
  flight: '',
  startSite: '贵阳',
  endSite: '天津',
  aircraft: ' ',
  seat: [
    ['&', 'A', 'B', 'C', '&', '&', 'D', 'E', 'F'],
    ['31', '!', '!', '!', '|', '|', '!', '!', '!'],
    ['32', '!', '!', '!', '|', '|', '!', '!', '!'],
    ['33', '!', '!', '!', '|', '|', '#', '#', '#'],
    ['34', '$', '$', '$', '|', '|', '#', '#', '#'],
    ['&', '&', '&', '&', '*', '*', '&', '&', '&'],
    ['35', '!', '!', '!', '|', '|', '!', '!', '!'],
    ['36', '!', '!', '!', '|', '|', '!', '!', '!'],
    ['37', '!', '!', '!', '|', '|', '!', '!', '!'],
    ['38', '!', '!', '!', '|', '|', '!', '!', '!']
  ], // 字母表示水平坐标， 数字表示垂直坐标   ！表示可预订座位   @表示你选择的座位  #表示已定出的座位  $表示不可定的座位
  checkInSeat: ''
})
export const actions = {
  initSeat: () => ({type: 'initSeat'}),
  showInfo: (items, info) => ({type: 'showInfo', items, info}),
  checkIn: (j, i) => ({type: 'checkIn', j, i}),
  removeCheckIn: (j, i) => ({type: 'removeCheckIn', j, i})
}
export const reducer = createdReducer(data, {
  initSeat (state, action) {
    let seat = state.get('seat').toJS()
    seat.forEach((items, i) => {
      items.forEach((item, j) => {
        if (item === '@') {
          seat[i][j] = '!'
        }
      })
    })
    return state.set('seat', Immutable.fromJS(seat)).set('checkInSeat', '')
  },
  showInfo (state, action) {
    // console.log(action)
    return state.set('name', action.info.name)
        .set('startDate', action.info.startDate)
        .set('startTime', action.items.startTimeP)
        .set('flight', action.items.flight)
        .set('aircraft', action.items.aircraft)
  },
  checkIn (state, action) {
    // console.log(action)
    let seat = state.get('seat').toJS()
    seat.forEach((items, i) => {
      items.forEach((item, j) => {
        if (item === '@') {
          seat[i][j] = '!'
        }
      })
    })
    seat[action.j][action.i] = '@'
    let checkInSeat = seat[action.j][0] + seat[0][action.i]
    // console.log(checkInSeat)
    return state.set('seat', Immutable.fromJS(seat)).set('checkInSeat', checkInSeat)
  },
  removeCheckIn (state, action) {
    // console.log(action)
    let seat = state.get('seat').toJS()
    seat[action.j][action.i] = '!'
    return state.set('seat', Immutable.fromJS(seat)).set('checkInSeat', '')
  }
})
