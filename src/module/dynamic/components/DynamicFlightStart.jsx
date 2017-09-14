/**
 * Created by wq on 2017/5/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-svg-inline'
import iconDynamicR from '$assets/img/icon_dynamic_right.svg'
import iconDynamicMap from '$assets/img/icon_dynamic_map.svg'
import iconDynamicWeather from '$assets/img/icon_dynamic_weather.svg'
import L from '$i18n'
import viewUtils from '$assets/js/viewUtils'

export default class DynamicFlightStart extends Component {
  static propTypes = {
    dynamicDetail: PropTypes.object
  }
  render () {
    return (
      <div className="flight-item">
        <div className="flight-top" data-flex="cross:center main:justify">
          <span className="f-b">{this.props.dynamicDetail.startAir}</span>
          <div data-flex="cross:center">
            <SVG svg={iconDynamicWeather} className="icon-60 m-r-25" fill="#444344" />
            <span>{this.props.dynamicDetail.startT} ℃</span>
            <SVG svg={iconDynamicR} className="icon-60 m-l-25" fill="#8e8e8e" onClick={() => viewUtils.alert('正在建设中')} />
          </div>
        </div>
        <p className="p-h f-12">{L.getString('DYNAMIC_PLAN')}{L.getString('DYNAMIC_TAKEOFF')}&nbsp;{this.props.dynamicDetail.startTimeP}&nbsp;{this.props.dynamicDetail.startDateP}</p>
        <div className="p-h a-c flight-middle" data-flex="cross:center main:justify">
          <div>
            <p className="f-12">{L.getString('DYNAMIC_PREDICT')}{L.getString('DYNAMIC_TAKEOFF')}</p>
            <p className="f-18 p-c f-b">{this.props.dynamicDetail.startTimeR}</p>
          </div>
          <div>
            <p className="f-12">{L.getString('DYNAMIC_CHECKIN')}{L.getString('DYNAMIC_COUNTER')}</p>
            <p className="f-b">{this.props.dynamicDetail.checkInCounter}</p>
          </div>
          <div>
            <p className="f-12">{L.getString('DYNAMIC_BOART_GATE')}</p>
            <p className="f-b" data-flex="cross:center">{this.props.dynamicDetail.boardGate}<SVG svg={iconDynamicMap} className="icon-60 m-l-10" fill="#30b5ff" /></p>
          </div>
        </div>
        <div className="flight-bottom f-12">预计起飞时间仅供参考，值机时间不变</div>
      </div>
    )
  }
}
