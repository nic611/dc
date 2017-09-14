/**
 * Created by Administrator on 2017/4/27.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as checkInSelectActions } from '../model/checkInSelectModel'
import { actions as checkInSuccessActions } from '../model/checkInSuccessModel'
import CheckInSeat from './CheckInSeat'
import CheckInSeatList from './CheckInSeatList'
import CheckInSeatUser from './CheckInSeatUser'
import routerUtils from '$assets/js/routerUtils'
import viewUtils from '$assets/js/viewUtils'
import '../resources/checkInSelect.css'
import L from '$i18n'

class checkInSelect extends Component {
  static propTypes = {
    checkInSelect: PropTypes.object,
    appBarActions: PropTypes.object,
    checkInSelectActions: PropTypes.object,
    checkInSuccessActions: PropTypes.object
  }
  componentDidMount () {
    this.props.checkInSelectActions.initSeat()
    this.props.appBarActions.changeAppBar(L.getString('CHECKIN_SELECT'))
    this.props.appBarActions.changeFooterBar(true)
  }
  checkInResult () {
    let checkInSeat = this.props.checkInSelect.checkInSeat
    if (checkInSeat) {
      this.props.checkInSuccessActions.checkInResult(this.props.checkInSelect)
      routerUtils.go('/checkSuccess')
    } else {
      viewUtils.alert('未选座，请先进行选座~')
    }
  }
  render () {
    return (
      <div>
        <CheckInSeatUser checkInSelect={this.props.checkInSelect} />
        <CheckInSeat />
        <CheckInSeatList seat={this.props.checkInSelect.seat} checkIn={this.props.checkInSelectActions.checkIn} removeCheckIn={this.props.checkInSelectActions.removeCheckIn} />
        <div className="check-seat f-18" onClick={() => this.checkInResult()}>选&nbsp;座</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  checkInSelect: state.get('checkInSelectModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  checkInSelectActions: bindActionCreators(checkInSelectActions, dispatch),
  checkInSuccessActions: bindActionCreators(checkInSuccessActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(checkInSelect)
