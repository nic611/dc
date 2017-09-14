/**
 * Created by Administrator on 2017/5/8.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'

const data = Immutable.fromJS({
  name: '',
  date: '',
  time: '',
  startSite: '',
  endSite: '',
  flight: '',
  aircraft: '',
  seat: '',
  cardNum: '----',
  rank: '--'
})
export const actions = {
  checkInResult: (data) => ({type: 'checkInResult', data})
}
export const reducer = createdReducer(data, {
  checkInResult (state, action) {
    console.log(action)
    return state.set('name', action.data.name)
        .set('date', action.data.startDate)
        .set('time', action.data.startTime)
        .set('startSite', action.data.startSite)
        .set('endSite', action.data.endSite)
        .set('flight', action.data.flight)
        .set('aircraft', action.data.aircraft)
        .set('seat', action.data.checkInSeat)
  }
})
