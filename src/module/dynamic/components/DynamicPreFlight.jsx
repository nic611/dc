/**
 * Created by wq on 2017/5/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import L from '$i18n'
import SVG from 'react-svg-inline'
import iconDynamicR from '$assets/img/icon_dynamic_right.svg'
import viewUtils from '$assets/js/viewUtils'

export default class DynamicPreFlight extends Component {
  static propTypes = {
    dynamicDetail: PropTypes.object
  }
  render () {
    return (
      <div className="flight-before p-h" data-flex="cross:center main:justify">
        <div>
          <p className="f-12">{L.getString('DYNAMIC_BEFORE_FLIGHT')}：{this.props.dynamicDetail.beforeFight}</p>
          <p>{this.props.dynamicDetail.beforeStartSite}-{this.props.dynamicDetail.beforeEndSite}</p>
        </div>
        <div data-flex="cross:center">
          <div className="a-r">
            <p className="f-12">{L.getString('DYNAMIC_ARRIVE')}</p>
            <p className="f-12">提前25分钟到达</p>
          </div>
          <SVG svg={iconDynamicR} className="icon-60 m-l-25" fill="#8e8e8e" onClick={() => viewUtils.alert('正在建设中')} />
        </div>
      </div>
    )
  }
}
