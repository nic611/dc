/**
 * Created by Administrator on 2017/4/27.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as checkInFlightActions } from '../model/checkInFlightModel'
import { actions as checkInSelectActions } from '../model/checkInSelectModel'
import routerUtils from '$assets/js/routerUtils'
import '../resources/checkInFlight.css'
import Btn from '$base/btn'
import CheckInList from './CheckInList'
import CheckInUser from './CheckInUser'
import L from '$i18n'

class CheckInFlight extends Component {
  static propTypes = {
    checkInFlight: PropTypes.object,
    appBarActions: PropTypes.object,
    checkInFlightActions: PropTypes.object,
    checkInSelectActions: PropTypes.object
  }
  fightList () {
    let list = this.props.checkInFlight.list.map((item, i) => {
      return (
        <CheckInList key={'list-' + i} itemData={item} toCheckIn={this.toCheckIn} />
      )
    })
    return <div className="p-h-25 p-b-25">{list}</div>
  }
  toCheckIn = (item) => {
    if (item.checkInFlag === 0) {
      this.props.checkInSelectActions.showInfo(item, this.props.checkInFlight)
      routerUtils.go('/checkSelect')
    }
  }
  changeCheck = () => {
    this.props.checkInFlightActions.changeCheck()
  }
  componentDidMount () {
    this.props.appBarActions.changeAppBar(L.getString('CHECKIN_GET_FLIGHT'))
    this.props.appBarActions.changeFooterBar(true)
  }
  render () {
    return (
      <div>
        <div className="p-t-40">
          <div className="m-h-15 bg-white br-15">
            <CheckInUser changeCheck={this.changeCheck} checkState={this.props.checkInFlight.checkState} name={this.props.checkInFlight.name} startDate={this.props.checkInFlight.startDate} />
            {this.fightList()}
          </div>
        </div>
        <div className="check-btn m-b-55">
          <div className="p-h-65 m-t-55">
            <Btn title={L.getString('CHECKIN_SEAT')} action={() => this.toCheckIn(this.props.checkInFlight.list[1])} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  checkInFlight: state.get('checkInFlightModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  checkInFlightActions: bindActionCreators(checkInFlightActions, dispatch),
  checkInSelectActions: bindActionCreators(checkInSelectActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckInFlight)
