/**
 * Created by 张森峰 on 2017/5/2.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SVG from 'react-svg-inline'
import usericon from '$assets/img/icon_user.svg'
import L from '$i18n'

export default class UserHeaderLoggedIn extends Component {
  static propTypes = {
    userMessage: PropTypes.object,
    nameCHS1: PropTypes.string,
    nameCHS2: PropTypes.string,
    cardType: PropTypes.string,
    integral: PropTypes.number,
    cardNumber: PropTypes.number
  }
  render () {
    return (
      <div className='user-logged'>
        <div className='user-logged-header p-v-90'>
          <div className='user-logged-header-icon'>
            <SVG svg={usericon} fill='' />
          </div>
          <div className='user-logged-header-message'>
            <div className='p-t-40 f-22'>
              <div className='user-logged-header-border p-l-70 p-b-55'>{this.props.userMessage.nameCHS1 + this.props.userMessage.nameCHS2}</div>
            </div>
            <div className='p-l-70 p-l-30 p-b-15 f-14'>
              <div>{this.props.userMessage.cardType}&nbsp;<span>{this.props.userMessage.cardNumber}</span></div>
            </div>
            <div className='p-l-70 p-v-30 f-14' data-flex='dir:left'>
              <div>{L.getString('USER_USER_HEADER_LOGGEDIN_INTEGRAL')}</div>
              <div>&nbsp;&nbsp;{this.props.userMessage.integral}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
