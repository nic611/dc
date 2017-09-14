/**
 * Created by Administrator on 2017/4/25.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'
import moment from '$assets/js/moment'

const data = Immutable.fromJS({
  title: '',
  startSite: '',
  endSite: '',
  date: '',
  dateFormat: '',
  list: [
    {
      flight: 'GY7382',
      startTimeP: '09:45',
      startTimeR: '10:00',
      flySite: 'T2',
      state: '0',
      endTimeP: '11:30',
      endTimeR: '12:00',
      distance: '3h37m'
    },
    {
      flight: 'GY7383',
      startTimeP: '12:45',
      startTimeR: '12:50',
      flySite: 'T2',
      state: '1',
      endTimeP: '14:30',
      endTimeR: '14:30',
      distance: '3h37m'
    },
    {
      flight: 'GY7384',
      startTimeP: '15:45',
      startTimeR: '16:45',
      flySite: 'T2',
      state: '2',
      endTimeP: '17:30',
      endTimeR: '18:30',
      distance: '3h37m'
    }
  ]
})

export const actions = {
  getSiteList: (start, end, date) => ({type: 'getSiteList', start, end, date}),
  getNumList: (flight, date) => ({type: 'getNumList', flight, date})
}

export const reducer = createdReducer(data, {
  getSiteList (state, action) {
    return state.set('startSite', action.start)
        .set('endSite', action.end)
        .set('title', action.start + '-' + action.end)
        .set('date', moment(action.date).format('YYYY年MM月DD日 dddd'))
        .set('dateFormat', action.date)
  },
  getNumList (state, action) {
    return state.set('title', action.flight)
        .set('date', moment(action.date).format('YYYY年MM月DD日 dddd'))
        .set('dateFormat', action.date)
  }
})
