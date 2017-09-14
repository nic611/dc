/**
 * Created by 熊超超 on 2017/4/23.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'
import moment from '$assets/js/moment'

const data = Immutable.fromJS({
  base: {
    loading: false
  },
  dock: {
    view: null,
    isVisible: false
  },
  calendar: {
    activeData: moment().add(1, 'M').format('YYYY-MM-DD'),
    verticalRange: 1, // 竖向日历显示的范围 单位年
    holidays: {  // 节假日数据
      '2017-05-01': '劳动节'
    }
  }
})

export const actions = {
  showDock: view => ({type: 'showDock', view}),
  hideDock: view => ({type: 'hideDock'}),
  changeDockVisible: visible => ({type: 'changeDockVisible', visible}),
  calendarActiveData: activeData => ({type: 'calendarActiveData', activeData}),
  loadingTipsShow: () => ({type: 'loadingTipsShow'}),
  loadingTipsHidden: () => ({type: 'loadingTipsHidden'})
}

export const reducer = createdReducer(data, {
  calendarActiveData (state, action) {
    return state.setIn(['calendar', 'activeData'], action.activeData)
  },
  showDock (state, action) {
    return state.setIn(['dock', 'isVisible'], true)
      .setIn(['dock', 'view'], action.view)
  },
  hideDock (state, action) {
    return state.setIn(['dock', 'isVisible'], false)
      .setIn(['dock', 'view'], null)
  },
  changeDockVisible (state, action) {
    if (action.visible) {
      return state.setIn(['dock', 'isVisible'], action.visible)
    } else {
      return state.setIn(['dock', 'isVisible'], action.visible).setIn(['dock', 'view'], null)
    }
  },
  loadingTipsShow (state, action) {
    return state.setIn(['base', 'loading'], true)
  },
  loadingTipsHidden (state, action) {
    return state.setIn(['base', 'loading'], false)
  }
})
