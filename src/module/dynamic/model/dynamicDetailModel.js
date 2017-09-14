/**
 * Created by Administrator on 2017/5/5.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'
import moment from '$assets/js/moment'

const data = Immutable.fromJS({
  flight: '',
  dateFormat: '',
  date: '',
  flag: '',   // 2延误  1非延误
  startAir: '龙洞堡国际机场T2',
  startWeather: '0',
  startT: '18',
  startTimeP: '',
  startDateP: '2017-06-01',
  startTimeR: '',
  checkInCounter: '--',
  boardGate: '25E',
  endAir: '滨海国际机场T2',
  endWeather: '0',
  endT: '22',
  endTimeP: '',
  endDateP: '2017-06-01',
  endTimeR: '',
  luggage: '23',
  exiting: '--',
  beforeFight: 'GY7135',
  beforeStartSite: '贵阳',
  beforeEndSite: '天津'
})

export const actions = {
  getDetail: (itemData, listDate) => ({type: 'getDetail', itemData, listDate})
}

export const reducer = createdReducer(data, {
  getDetail (state, action) {
    // console.log(action)
    return state.set('flight', action.itemData.flight)
        .set('flag', action.itemData.state).set('startTimeP', action.itemData.startTimeP)
        .set('startTimeR', action.itemData.startTimeR)
        .set('endTimeP', action.itemData.endTimeP)
        .set('endTimeR', action.itemData.endTimeR)
        .set('date', moment(action.listDate.dateFormat).format('YYYY-MM-DD dddd'))
        .set('dateFormat', action.listDate.dateFormat)
  }
})
