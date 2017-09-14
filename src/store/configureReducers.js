import { combineReducers } from 'redux-immutable'
import Immutable from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import {reducer as toastrReducer} from 'react-redux-toastr'

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null
})
/* export default combineReducers({
  ...reducers,
  loadingBar: loadingBarReducer,
  toastr: toastrReducer,
  // 绑定redux和react-router需要的reducer
  routing: (state = initialState, action) => {
    if (action.type === LOCATION_CHANGE) {
      return state.set('locationBeforeTransitions', action.payload)
    }
    return state
  }
}) */

export default function configureReducers (reducers) {
  return combineReducers({
    ...reducers,
    loadingBar: loadingBarReducer,
    toastr: toastrReducer,
    // 绑定redux和react-router需要的reducer
    routing: (state = initialState, action) => {
      if (action.type === LOCATION_CHANGE) {
        return state.set('locationBeforeTransitions', action.payload)
      }
      return state
    }
  })
}
