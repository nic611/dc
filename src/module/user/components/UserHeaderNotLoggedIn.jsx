/**
 * Created by 张森峰 on 2017/4/27.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SVG from 'react-svg-inline'
import setting from '$assets/img/setting.svg'
import Btn from '$base/btn'
import L from '$i18n'

export default class UserHeaderNotLoggedIn extends Component {
  static propTypes = {
    userSetting: PropTypes.func,
    toLogIn: PropTypes.func
  }
  render () {
    return (
      <div className='user-header'>
        <div className='p-t-30 p-l-55' onClick={() => this.props.userSetting()}>
          <SVG svg={setting} className='icon-60' />
        </div>
        <p className='user-header-p f-16 m-v-95 p-t-10'>{L.getString('USER_USER_HEADER_NOT_LOGGEDIN_TEXT')}</p>
        <div className='user-header-button'>
          <Btn title='登录/注册' action={() => this.props.toLogIn()} />
        </div>
      </div>
    )
  }
}
