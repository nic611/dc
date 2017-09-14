/**
 * Created by wq on 2017/5/17.
 */
import React, {Component} from 'react'
import SVG from 'react-svg-inline'
import iconDynamicR from '$assets/img/icon_dynamic_right.svg'
import L from '$i18n'
import viewUtils from '$assets/js/viewUtils'

export default class DynamicFlightDelay extends Component {
  render () {
    return (
      <div className="flight-item f-b" data-flex="cross:center main:justify">
        <div data-flex="cross:center" data-flex-box="1">
          <div className="flight-reason-hint f-20">{L.getString('DYNAMIC_FLIGHT_DELAY')}</div>
          <div>
            <p className="f-12 p-h">{L.getString('DYNAMIC_FLIGHT_DELAY')}{L.getString('DYNAMIC_REASON')}</p>
            <p className="p-c p-h">出发机场小面积延误</p>
          </div>
        </div>
        <SVG data-flex-box="0" svg={iconDynamicR} className="icon-60" fill="#8e8e8e" onClick={() => viewUtils.alert('正在建设中')} />
      </div>
    )
  }
}
