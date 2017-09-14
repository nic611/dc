/**
 * Created by Administrator on 2017/4/27.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as checkInHomeActions } from '../model/checkInHomeModel'
import Btn from '$base/btn'
import CheckInForm from './CheckInForm'
import '../resources/checkInHome.css'
import viewUtils from '$assets/js/viewUtils'
import routerUtils from '$assets/js/routerUtils'
import L from '$i18n'

class CheckInHome extends Component {
  static propTypes = {
    checkInHome: PropTypes.object,
    checkInHomeActions: PropTypes.object,
    userData: PropTypes.object,
    appBarActions: PropTypes.object
  }
  handleChange = (value) => {
    this.props.checkInHomeActions.getTicketNum(value)
  }
  getFlight () {
    let input = this.props.checkInHome.input
    if (this.props.userData.userLogInState) {
      if (input !== '') {
        let regIdCard18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        let regIdCard15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
        let ticketNum = /^\d{13}$/
        if (regIdCard18.test(input) || regIdCard15.test(input)) {
          routerUtils.go('/checkFlight')
        } else {
          if (ticketNum.test(input)) {
            routerUtils.go('/checkFlight')
          } else {
            viewUtils.alert('请输入正确的订座证件号或者13位客票号~')
          }
        }
      } else {
        viewUtils.alert('请输入订座证件号或者13位客票号~')
      }
    } else {
      routerUtils.go('/login')
    }
  }
  componentDidMount () {
    this.props.checkInHomeActions.initInput()
    this.props.appBarActions.changeAppBar(L.getString('CHECKIN_GET_FLIGHT'), true)
    this.props.appBarActions.changeFooterBar(false, 2)
  }
  render () {
    return (
      <div>
        <CheckInForm handleChange={this.handleChange} />
        <div className="check-btn">
          <div className="p-h-65 m-t-55">
            <Btn title={L.getString('CHECKIN_GET_FLIGHT')} action={() => this.getFlight()} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  checkInHome: state.get('checkInHomeModel').toJS(),
  userData: state.get('userModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  checkInHomeActions: bindActionCreators(checkInHomeActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckInHome)
