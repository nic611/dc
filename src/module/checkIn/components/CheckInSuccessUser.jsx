/**
 * Created by wq on 2017/5/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import L from '$i18n'

export default class CheckInSuccessUser extends Component {
  static propTypes = {
    checkInSuccess: PropTypes.object
  }
  render () {
    return (
      <div className="m-h-15 br-15">
        <div className="p-v-20 p-l-50 bgRed" data-flex="cross:center">
          <div className="f-10">{L.getString('CHECKIN_PASSENGER_NAME')}<span className="f-14 m-l-15 m-r-40">{this.props.checkInSuccess.name}</span></div>
          <div className="success-name p-l-40">
            <p>{this.props.checkInSuccess.date} {this.props.checkInSuccess.time}</p>
            <p>{this.props.checkInSuccess.startSite}-{this.props.checkInSuccess.endSite}</p>
          </div>
        </div>
        <div className="p-v-20 p-h-50 bg-white">
          <div className="success-detail" data-flex="cross:center main:justify">
            <p>{L.getString('CHECKIN_FLIGHT_NUM')}</p>
            <p>{this.props.checkInSuccess.flight} / {this.props.checkInSuccess.aircraft}</p>
          </div>
          <div className="success-detail" data-flex="cross:center main:justify">
            <p>{L.getString('CHECKIN_SEAT_NUM')}</p>
            <p>{this.props.checkInSuccess.seat}</p>
          </div>
          <div className="success-detail" data-flex="cross:center main:justify">
            <p>{L.getString('CHECKIN_RANK_NUM')}</p>
            <p>{this.props.checkInSuccess.cardNum} / {this.props.checkInSuccess.rank}</p>
          </div>
        </div>
      </div>
    )
  }
}
