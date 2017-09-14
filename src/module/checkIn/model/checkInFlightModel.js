/**
 * Created by Administrator on 2017/5/5.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'

const data = Immutable.fromJS({
  checkState: 1,
  name: '张三',
  startDate: '2017-06-03',
  list: [
    {
      flight: 'GY7137',
      aircraft: 'E舱',
      checkInSeat: '38E',
      startAir: '龙洞堡国际机场T2',
      startTimeP: '09:45',
      endAir: '滨海国际机场T2',
      endTimeP: '11:30',
      checkInFlag: 1 // 0是未值机  1是值机
    },
    {
      flight: 'GY7122',
      aircraft: 'M舱',
      checkInSeat: '--',
      startAir: '滨海国际机场T2',
      startTimeP: '12:45',
      endAir: '龙洞堡国际机场T2',
      endTimeP: '18:30',
      checkInFlag: 0
    }
  ]
})
export const actions = {
  changeCheck: () => ({type: 'changeCheck'})
}
export const reducer = createdReducer(data, {
  changeCheck (state, action) {
    let checkState = state.get('checkState')
    if (checkState === 0) {
      return state.set('checkState', 1)
    } else {
      return state.set('checkState', 0)
    }
  }
})
