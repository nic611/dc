/**
 * Created by 张森峰 on 2017/4/26.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import viewUtils from '$assets/js/viewUtils'
import L from '$i18n'
import moment from '$assets/js/moment'

export default class OrderHistoryList extends Component {
  static propTypes = {
    item: PropTypes.object,
    data: PropTypes.object,
    getOrderStatus: PropTypes.func,
    buttonDisplay: PropTypes.func,
    goDetail: PropTypes.func
  }
  judgeItem = () => {
    const paymentType = this.props.data.paymentType
    const orderStatus = parseInt(this.props.item.orderStatus)
    if (paymentType === 2) {
      if (orderStatus !== 4) {
        return ' hidden'
      }
    } else if (paymentType === 3) {
      if (orderStatus !== 1 && orderStatus !== 2) {
        return ' hidden'
      }
    }
  }
  render () {
    return (
      <div className={'m-b-15 br-15' + this.judgeItem()}>
        <div onClick={() => this.props.goDetail(this.props.item)}>
          <div className='orderhistory-list-title' data-flex='dir:left main:justify'>
            <div className='orderhistory-list-title-left'>
              <div className='orderhistory-list-title-left-type f-16'>{this.props.getOrderStatus(this.props.item.orderStatus)}</div>
              <div className='orderhistory-list-title-left-time'>{L.getString('ORDER_HISTORY_LIST_ORDER_TIME')}：{this.props.item.orderCreateTime}</div>
            </div>
            <div className='orderhistory-list-title-right f-18 f-b'>￥{this.props.item.totalPayAmount}</div>
          </div>
          <div className='orderhistory-list-message'>
            <div className='orderhistory-list-message-header f-14 f-b' data-flex="main:justify">
              <div>{moment(this.props.item.flightList[0].flightDate).format('YYYY年MM月DD日')}</div>
              <div>{viewUtils.getCityByCode(this.props.item.flightList[0].depCode)}-{viewUtils.getCityByCode(this.props.item.flightList[0].arrCode)}</div>
            </div>
            <div className='orderhistory-list-message-body' data-flex='dir:left box:mean main:justify'>
              <div className='orderhistory-list-message-body-city'>
                <div className='f-16 f-b m-v-10'>{viewUtils.getCityNameByCode(this.props.item.flightList[0].depCode)}</div>
              </div>
              <div className='orderhistory-list-message-body-icon' data-flex='dir:top box:mean'>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
              </div>
              <div className='orderhistory-list-message-body-city'>
                <div className='f-16 f-b m-v-10'>{viewUtils.getCityNameByCode(this.props.item.flightList[0].arrCode)}</div>
              </div>
            </div>
          </div>
          <div className='orderhistory-list-flight' data-flex='dir:left'>
            <div>{L.getString('APP_NAME')}{this.props.item.flightList[0].flightNo}</div>
            <div>{this.props.data.aircraftType}</div>
            <div>{this.props.data.cabinType}</div>
            <div>{this.props.data.food}</div>
          </div>
        </div>
        {this.props.buttonDisplay(this.props.item.orderStatus, this.props.item)}
      </div>
    )
  }
}
