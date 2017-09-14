/**
 * Created by 熊超超 on 2017/4/23.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'

const data = Immutable.fromJS({
  appBar: {
    hideBackBtn: false,
    title: '多彩航空',
    actionBtns: []
  },
  footerBar: {
    hidden: false,
    activeIndex: 0 // 激活的tab
  }
})

export const actions = {
  changeAppBar: (title, hideBackBtn = false, actionBtns = []) => ({
    type: 'changeAppBar',
    appBar: {title, hideBackBtn, actionBtns}
  }), // 更新appBar
  changeFooterBar: (hidden, activeIndex = 0) => ({type: 'changeFooterBar', hidden, activeIndex})
}

export const reducer = createdReducer(data, {
  changeAppBar (state, action) {
    return state.set('appBar', Immutable.fromJS(action.appBar))
  },
  changeFooterBar (state, action) {
    return state.set('footerBar', Immutable.fromJS({hidden: action.hidden, activeIndex: action.activeIndex}))
  }
})
