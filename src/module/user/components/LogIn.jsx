/**
 * Created by 张森峰 on 2017/4/27.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions } from '../model/userModel'

import SVG from 'react-svg-inline'
import checkboxSelected from '$assets/img/checkbox-selected.svg'
import Btn from '$base/btn'
import viewUtils from '$assets/js/viewUtils'
import routerUtils from '$assets/js/routerUtils'

import L from '$i18n'
import '../resources/logIn.css'
import {kLoginAccount, kPassword} from '$connection'

class LogIn extends Component {
  static propTypes = {
    appBarActions: PropTypes.object,
    actions: PropTypes.object,
    data: PropTypes.object
  }
  componentDidMount () {
    this.props.appBarActions.changeAppBar(L.getString('USER_LOGIN_LOGIN'))
    this.props.appBarActions.changeFooterBar(false, 3)
  }
  logInUserNameChange = (event) => {
    this.props.actions.logInUserNameChange(event.target.value)
  }
  logInUserPasswordChange = (event) => {
    this.props.actions.logInUserPasswordChange(event.target.value)
  }
  keyUp = (event) => {
    if (event.keyCode === 13) {
      this.login()
    }
  }
  loginCheckboxStateChange = () => {
    this.props.actions.loginCheckboxStateChange()
  }
  login = () => {
    let inputName1 = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    let inputName2 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    if (this.props.data.logInUserName === '' || !(inputName1.test(this.props.data.logInUserName) || (inputName2.test(this.props.data.logInUserName)))) {
      viewUtils.alert(L.getString('VIEW_UTILS_ALERT2'))
    } else if (this.props.data.logInUserPassword === '' || this.props.data.logInUserPassword.length <= 5) {
      viewUtils.alert(L.getString('VIEW_UTILS_ALERT3'))
    } else {
      // 只能由账号13800138000登录
      if (this.props.data.logInUserName !== kLoginAccount) {
        viewUtils.alert('无此账号')
      } else if (this.props.data.logInUserPassword !== kPassword) {
        viewUtils.alert('密码错误')
      } else {
        this.props.actions.logInUserMessageUnloading()
        this.props.actions.userLogInStateChange(true)
        viewUtils.toast(L.getString('USER_LOGIN_LOGIN_SUCCESS'))
        routerUtils.back()
      }
    }
  }
  render () {
    return (
      <div className='login'>
        <div className='login-header p-l-60'>
          <div className='f-34 p-t-95'>{L.getString('USER_LOGIN_HEADER_TEXT1')}</div>
          <div className='f-16 f-b p-v-45'>{L.getString('USER_LOGIN_HEADER_TEXT2')}</div>
        </div>
        <div className='login-message p-h-100' data-flex='dir:top'>
          <input className='f-14 p-t-16' type='text' placeholder={'  ' + L.getString('USER_LOGIN_MOBILE') + '/' + L.getString('USER_LOGIN_E_MAIL')} onChange={(event) => this.logInUserNameChange(event)} onKeyUp={(event) => this.keyUp(event)} />
          <input className='f-14 p-t-16' type='password' placeholder={'  ' + L.getString('USER_LOGIN_PASSWORD')} onChange={(event) => this.logInUserPasswordChange(event)} onKeyUp={(event) => this.keyUp(event)} />
        </div>
        <div className='login-keepinglogin f-16 p-v-80 p-l-100 m-l-10' data-flex='dir:left' onClick={() => this.loginCheckboxStateChange()}>
          <div className={'login-keepinglogin-checkbox2 br-10' + (this.props.data.logInCheckboxState === 0 ? '' : ' hidden')} />
          <SVG svg={checkboxSelected} fill='#CA3F41' className={'login-keepinglogin-checkbox1 icon-60 br-10' + (this.props.data.logInCheckboxState === 0 ? ' hidden' : '')} />
          &nbsp;&nbsp;{L.getString('USER_LOGIN_KEEPING_LOGGEN')}
        </div>
        <div className='login-button'>
          <Btn title={L.getString('USER_LOGIN_LOGIN')} action={() => this.login()} />
        </div>
        <div className='login-other f-16 p-v-75'>
          <a className='p-h-95' href='javascript: void(0)' onClick={() => viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))}>{L.getString('USER_LOGIN_FORGOT_PASSWORD')}?</a>
          <a className='p-h-95' href='javascript: void(0)' onClick={() => viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))}>{L.getString('USER_LOGIN_REGISTER_NOW')}&nbsp;></a>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.get('userModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn)
