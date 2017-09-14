/**
 * Created by Administrator on 2017/5/3.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'
import moment from '$assets/js/moment'

const data = Immutable.fromJS({
  startSite: '北京',
  endSite: '天津',
  date: moment().format('MM月DD日 YYYY年'),
  dateFormat: moment().format('YYYY-MM-DD'),
  flight: '',
  flag: 1 // 1表示按起降地在上  2表示按航班号在上
})
export const actions = {
  handleChange: (value) => ({type: 'handleChange', value}),
  exchangeCity: () => ({type: 'exchangeCity'}),
  selectForCity: (city, code, flag) => ({type: 'selectForCity', city, code, flag}),
  calendarSelectedDynamicDay: (calendar) => ({type: 'calendarSelectedDynamicDay', calendar}),
  selectHomeDate: (flag) => ({type: 'selectHomeDate', flag})
}

export const reducer = createdReducer(data, {
  handleChange (state, action) {
    return state.set('flight', action.value)
  },
  selectHomeDate (state, action) {
    return state.set('flag', action.flag)
  },
  calendarSelectedDynamicDay (state, action) {
    return state.set('date', moment(action.calendar.activeData).format('MM月DD日 YYYY年'))
        .set('dateFormat', moment(action.calendar.activeData).format('YYYY-MM-DD'))
  },
  exchangeCity (state, action) {
    let temp1 = state.get('endSite')
    let temp2 = state.get('startSite')
    return state.set('startSite', temp1).set('endSite', temp2)
  },
  selectForCity (state, action) {
    if (action.flag === '0') {
      return state.set('startSite', action.city)
    } else {
      return state.set('endSite', action.city)
    }
  }
})
