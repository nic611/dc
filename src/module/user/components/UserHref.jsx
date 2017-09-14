/**
 * Created by 张森峰 on 2017/4/27.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../model/userModel'
import routerUtils from '$assets/js/routerUtils'

import SVG from 'react-svg-inline'
import arrowLeft from '$assets/img/arrow-left.svg'
import viewUtils from '$assets/js/viewUtils'
import L from '$i18n'

class UserHref extends Component {
  static propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    data: PropTypes.object
  }
  href () {
    if (this.props.data.userLogInState) {
      if (this.props.url === '') {
        viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
      } else {
        routerUtils.go(this.props.url)
      }
    } else {
      routerUtils.go('/login')
    }
  }
  render () {
    return (
      <div className='user-href-list p-l-70 p-r-55' data-flex='dir:left main:justify' onClick={() => this.href()}>
        <div className='f-14 p-v-30'>{this.props.title}</div>
        <div className='user-href-list-icon p-t-30'>
          <SVG svg={arrowLeft} fill='#adadad' className='icon-70 p-r-25' />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.get('userModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHref)
