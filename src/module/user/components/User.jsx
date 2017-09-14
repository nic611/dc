/**
 * Created by 张森峰 on 2017/4/27.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as userActions } from '../model/userModel'
import { actions as passengerActions } from '../model/passengerModel'

import UserHeaderNotLoggedIn from './UserHeaderNotLoggedIn'
import UserHeaderLoggedIn from './UserHeaderLoggedIn'
import UserHref from './UserHref'
import L from '$i18n'
import viewUtils from '$assets/js/viewUtils'
import routerUtils from '$assets/js/routerUtils'

import '../resources/user.css'

class User extends Component {
  static propTypes = {
    appBarActions: PropTypes.object,
    data: PropTypes.object,
    userActions: PropTypes.object,
    passengerActions: PropTypes.object,
    userMessage: PropTypes.object
  }
  componentDidMount () {
    this.props.appBarActions.changeAppBar(L.getString('FOOTER_BAR_MY'), true)
    this.props.appBarActions.changeFooterBar(false, 3)
    this.props.passengerActions.passengerComeFromChange('user')
  }
  userSetting () {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  toLogIn () {
    routerUtils.go('/login')
  }
  loginType () {
    if (this.props.data.userLogInState) {
      return <UserHeaderLoggedIn userMessage={this.props.data.userMessage} />
    } else {
      return <UserHeaderNotLoggedIn userSetting={() => this.userSetting()} toLogIn={() => this.toLogIn()} />
    }
  }
  signOut () {
    this.props.userActions.userLogInStateChange(false)
  }
  render () {
    return (
      <div className='user m-b-20'>
        {this.loginType()}
        <div className='user-tab f-16 p-v-30 p-l-70'>{L.getString('USER_USER_PERSONAL_CENTER')}</div>
        <div className='user-href'>
          {
            this.props.data.href.map((item) => {
              return <UserHref {...item} key={item.id} />
            })
          }
        </div>
        <div className={'user-logout f-16 m-t-60 p-v-30' + (this.props.data.userLogInState ? '' : ' hidden')} onClick={() => this.signOut()}>{L.getString('USER_USER_SIGN_OUT')}</div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.get('userModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
  passengerActions: bindActionCreators(passengerActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
