/**
 * Created by wq on 2017/5/19.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from '$assets/js/moment'
import viewUtils from '$assets/js/viewUtils'
import SVG from 'react-svg-inline'
import flightIconArrowUp from '$assets/img/icon_order_down.svg'
import L from '$i18n'

export default class OrderDetailDep extends Component {
  static propTypes = {
    // data: PropTypes.object,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    getTime: PropTypes.func,
    flight: PropTypes.object
  }
  render () {
    return (
      <div>
        <h3 className="p-v-30 p-l-30">{this.props.title} {moment(this.props.flight.get('flightDate')).format('YYYY-MM-DD')}</h3>
        <div className="info-box bg-white p-h-30">
          <div className="p-v-25" data-flex="main:justify">
            <span>{this.props.subTitle}</span>
            <span>{viewUtils.getCityNameByCode(this.props.flight.get('arrCode'))}</span>
          </div>
          <div className="p-v-25" data-flex="main:justify">
            <span>航班号/机型</span>
            <span>{this.props.flight.get('flightNo')}/{this.props.flight.get('planeType')}</span>
          </div>
          <div className="p-v-25" data-flex="main:justify">
            <span>时间</span>
            <span>{this.props.getTime(this.props.flight)}</span>
          </div>
          <div className="p-v-25" data-flex="main:justify">
            <span>票价信息</span>
            <div data-flex="cross:center" onClick={() => viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))}>
              显示详情
              <SVG svg={flightIconArrowUp} className='icon-40 m-l-20' />
            </div>
          </div>
          <div className="p-v-25" data-flex="main:justify">
            <span>使用条件</span>
            <div data-flex="cross:center" onClick={() => viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))}>
              显示详情
              <SVG svg={flightIconArrowUp} className='icon-40 m-l-20' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
