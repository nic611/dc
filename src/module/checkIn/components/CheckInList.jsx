/**
 * Created by 萝卜君 on 2017/5/12.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-svg-inline'
import iconFlyLogo from '$assets/img/icon_fly_logo.svg'
import iconCheckFromTo from '$assets/img/icon_check_fromto.svg'
import iconDynamicR from '$assets/img/icon_dynamic_right.svg'
import L from '$i18n'

export default class CheckInList extends Component {
  static propTypes = {
    itemData: PropTypes.object,
    toCheckIn: PropTypes.func
  }
  render () {
    return (
      <div className="check-info p-t-25">
        <p data-flex="cross:center">
          <SVG svg={iconFlyLogo} className="m-r-20 icon-60" fill="#EC9A0E" />
          {L.getString('APP_NAME')}{this.props.itemData.flight} | {this.props.itemData.aircraft}  座位号：{this.props.itemData.checkInSeat}
        </p>
        <div className="flight-box m-b-30">
          <div className="f-b a-c" data-flex="cross:center main:center">
            <p className="f-20 m-b-10">{this.props.itemData.startTimeP}</p>
            <div className="check-to m-h-85">
              <SVG svg={iconCheckFromTo} className="icon-from-to" fill="#595A5A" />
            </div>
            <p className="f-20 m-b-10">{this.props.itemData.endTimeP}</p>
          </div>
          <div className="flight-air">
            <div className="f-b a-c " data-flex="cross:center main:center">
              <p className="f-14 flight-p">{this.props.itemData.startAir}</p>
              <p className="f-14">{this.props.itemData.endAir}</p>
            </div>
          </div>
        </div>
        <div className="check-state m-b-30" data-flex="cross:center main:right" onClick={() => this.props.toCheckIn(this.props.itemData)}>
          <span className="f-b m-r-10">{this.props.itemData.checkInFlag ? L.getString('CHECKIN_HAS_CHECKIN') : L.getString('CHECKIN_GO_CHECKIN')}</span>
          <SVG svg={iconDynamicR} className="icon-right" fill="#ca403d" />
          <SVG svg={iconDynamicR} className="icon-right" fill="#ca403d" />
        </div>
      </div>
    )
  }
}
