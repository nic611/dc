/**
 * Created by 熊超超 on 2017/4/23.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import SVG from 'react-svg-inline'
import iconBook from '$assets/img/iconBook.svg'
import iconDynamics from '$assets/img/iconDynamics.svg'
import iconCheckIn from '$assets/img/iconCheckIn.svg'
import iconProfile from '$assets/img/iconProfile.svg'
import routerUtils from '$assets/js/routerUtils'
import { actions } from '../model/appBarModel'
import { bindActionCreators } from 'redux'
import L from '$i18n'

class FooterBar extends Component {
  static propTypes = {
    footerBar: PropTypes.object
  }
  state = {
    activeIndex: 0,
    activeColor: '#4A3931',
    menu: [
      {title: L.getString('FOOTER_BAR_BOOK'), color: '#8D8D8D', icon: iconBook, path: '/'},
      {title: L.getString('FOOTER_BAR_DYNAMIC'), color: '#8D8D8D', icon: iconDynamics, path: '/dynamic'},
      {title: L.getString('FOOTER_BAR_CHECKIN'), color: '#8D8D8D', icon: iconCheckIn, path: '/check'},
      {title: L.getString('FOOTER_BAR_MY'), color: '#8D8D8D', icon: iconProfile, path: '/user'}
    ]
  }
  componentDidUpdate () {
    // 控制footerBr的显示或隐藏
    const appBottom = document.querySelector('.app-bottom')
    const mainView = document.querySelector('.main-view')
    const appContent = document.querySelector('.app-content')
    if (this.props.footerBar.hidden) {
      appBottom && (appBottom.style.display = 'none')
      mainView && (mainView.className = 'main-view noFooterBar')
      appContent && (appContent.className = 'app-content noFooterBar')
    } else {
      appBottom && (appBottom.style.display = '')
      mainView && (mainView.className = 'main-view')
      appContent && (appContent.className = 'app-content')
    }
    // 根据路由来控制激活的tab
  }
  clickMenu = (path, i) => {
    routerUtils.go(path)
  }
  render () {
    let items = []
    let {activeIndex} = {...this.props.footerBar}
    this.state.menu.forEach((m, i) =>
      items.push(<div onClick={() => this.clickMenu(m.path, i)} data-flex="dir:top main:center cross:center" key={'footerBar-menu-' + i}>
        <span><SVG svg={m.icon} className="icon-60" fill={activeIndex === i ? this.state.activeColor : m.color} /></span>
        <span style={{color: activeIndex === i ? this.state.activeColor : m.color}}>{m.title}</span>
      </div>)
    )
    return (
      <div className="app-bottom" data-flex-box="0" data-flex="dir: top box:mean cross:center">
        { items }
      </div>
    )
  }
}
const mapStateToProps = state => ({
  footerBar: state.getIn(['appBarModel', 'footerBar']).toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterBar)
