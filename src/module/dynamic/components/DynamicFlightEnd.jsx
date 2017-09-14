/**
 * Created by wq on 2017/5/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-svg-inline'
import iconDynamicWeather from '$assets/img/icon_dynamic_weather.svg'
import iconDynamicR from '$assets/img/icon_dynamic_right.svg'
import L from '$i18n'
import viewUtils from '$assets/js/viewUtils'

export default class DynamicFlightEnd extends Component {
  static propTypes = {
    dynamicDetail: PropTypes.object
  }
  render () {
    return (
      <div className="flight-item">
        <div className="flight-top" data-flex="cross:center main:justify">
          <span className="f-b">{this.props.dynamicDetail.endAir}</span>
          <div data-flex="cross:center">
            <SVG svg={iconDynamicWeather} className="icon-60 m-r-25" fill="#444344" />
            <span>{this.props.dynamicDetail.endT} ℃</span>
            <SVG svg={iconDynamicR} className="icon-60 m-l-25" fill="#8e8e8e" onClick={() => viewUtils.alert('正在建设中')} />
          </div>
        </div>
        <p className="p-h f-12">{L.getString('DYNAMIC_PLAN')}{L.getString('DYNAMIC_ARRIVE')}&nbsp;{this.props.dynamicDetail.endTimeP}&nbsp;{this.props.dynamicDetail.endDateP}</p>
        <div className="p-h a-c flight-middle" data-flex="cross:center main:justify">
          <div>
            <p className="f-12">{L.getString('DYNAMIC_PREDICT')}{L.getString('DYNAMIC_ARRIVE')}</p>
            <p className="f-18 p-c f-b">{this.props.dynamicDetail.endTimeR}</p>
          </div>
          <div>
            <p className="f-12">{L.getString('DYNAMIC_LUGGAGE')}</p>
            <p className="f-18 f-b">{this.props.dynamicDetail.luggage}</p>
          </div>
          <div>
            <p className="f-12">{L.getString('DYNAMIC_EXIT')}</p>
            <p className="f-b">{this.props.dynamicDetail.exiting}</p>
          </div>
        </div>
      </div>
    )
  }
}
