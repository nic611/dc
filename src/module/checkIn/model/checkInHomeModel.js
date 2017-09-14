/**
 * Created by Administrator on 2017/5/5.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'

const data = Immutable.fromJS({
  input: ''
})
export const actions = {
  getTicketNum: (input) => ({type: 'getTicketNum', input}),
  initInput: () => ({type: 'initInput'})
}
export const reducer = createdReducer(data, {
  getTicketNum (state, action) {
    return state.set('input', action.input)
  },
  initInput (state, action) {
    return state.set('input', '')
  }
})
