/**
 * Created by wq on 2017/5/16.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-svg-inline'
import iconFlyLogo from '$assets/img/icon_fly_logo.svg'
import iconDynamicR from '$assets/img/icon_dynamic_right.svg'
import L from '$i18n'

export default class DynamicListItem extends Component {
  static propTypes = {
    dynamicFlightList: PropTypes.array,
    getDetail: PropTypes.func
  }
  getItem () {
    let list = this.props.dynamicFlightList.map((item, i) => {
      return (
        <div className="m-b-30 flight-list-box" key={'list' + i} onClick={() => this.props.getDetail(item)} data-flex="cross:center main:justify">
          <div className="flight-list-item" data-flex-box="1" data-flex="cross:center">
            <div className="item-l">
              <div data-flex="cross:center">{L.getString('DYNAMIC_FLIGHT')}:<SVG svg={iconFlyLogo} className="icon-60 m-r-10" />{item.flight}</div>
              <div>{L.getString('DYNAMIC_PLAN')}{L.getString('DYNAMIC_TAKEOFF')}:{item.startTimeP}</div>
              <div>{L.getString('DYNAMIC_PLAN')}{L.getString('DYNAMIC_ARRIVE')}:{item.endTimeP}</div>
            </div>
            <div>
              <div>{L.getString('DYNAMIC_FLYSITE')}:{item.flySite}</div>
              <div>{L.getString('DYNAMIC_REALITY')}{L.getString('DYNAMIC_TAKEOFF')}:{item.startTimeR}</div>
              <div>{L.getString('DYNAMIC_REALITY')}{L.getString('DYNAMIC_ARRIVE')}:{item.endTimeR}</div>
            </div>
          </div>
          <div className="m-l-30" data-flex-box="0" data-flex="cross:center">
            <span className={'f-b' + (item.state === '0' ? ' fly-ing' : (item.state === '1' ? ' fly-no' : ' fly-delay'))}>{(item.state === '0') ? L.getString('DYNAMIC_FLYING') : (item.state === '1' ? L.getString('DYNAMIC_PLAN') : L.getString('DYNAMIC_DELAY'))}</span>
            <SVG svg={iconDynamicR} className="icon-50 m-l-10" fill="#8E8E8E" />
          </div>
        </div>
      )
    })
    return list
  }
  render () {
    return (
      <div className="p-h-30 p-v-30">
        {this.getItem()}
        <div className="empty">&nbsp;</div>
      </div>
    )
  }
}
