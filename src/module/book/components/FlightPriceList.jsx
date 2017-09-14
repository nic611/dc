/**
 * Created by 张森峰 on 2017/5/9.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-svg-inline'
import flightIconAlert from '$assets/img/icon_book_detailinfo.svg'
import BookCar from './BookCar'
import viewUtils from '$assets/js/viewUtils'

export default class FlightPriceList extends Component {
  static propTypes = {
    showThis: PropTypes.bool,
    salesCabinList: PropTypes.array,
    ticketsAlertMessage: PropTypes.func,
    flightModel: PropTypes.object,
    takeOrder: PropTypes.func,
    toLogIn: PropTypes.func,
    salesFlightDate: PropTypes.object,
    userLogInState: PropTypes.bool
  }
  getCabinListLayout () {
    return this.props.salesCabinList.map((salesCabin, i) => {
      // 舱位显示逻辑
      let cabinType = ''
      if (salesCabin.code === 'W') {
        cabinType = '超级飞享'
      } else if (salesCabin.code === 'Y' || salesCabin.code === 'B' || salesCabin.code === 'M' || salesCabin.code === 'H' || salesCabin.code === 'K' ||
        salesCabin.code === 'L' || salesCabin.code === 'J' || salesCabin.code === 'Q' || salesCabin.code === 'R') {
        cabinType = '自由飞享'
      } else {
        cabinType = '实惠飞享'
      }
      let discount = ''
      if (salesCabin.physicCode) {
        discount = (590 / salesCabin.publishAmount).toFixed(1)
      } else {
        discount = '--'
      }
      // 最低票价筛选
      return <div key={'CabinList-' + i} className='flight-cabin-list-item br-50 m-h-25 m-t-25 p-v-40 p-l-45' data-flex='dir:left main:justify'>
        <div>
          <div className='f-14 p-b-20 p-r-20' data-flex='dir:left'>
            <div>{cabinType}</div>
            <div className='p-h-20'>{salesCabin.code}舱</div>
            <div className='p-h-10'>{discount === '1.0' ? '(全价)' : discount + '折'}</div>
            <div onClick={() => this.props.ticketsAlertMessage()}>
              <SVG svg={flightIconAlert} className='icon-50' />
            </div>
          </div>
          <div data-flex='dir:left'>
            <div className='f-ldark p-r-20 f-11'>变更手续费</div>
            <div className='flight-cabin-list-item-price p-r-20 f-11'>¥10</div>
            <div className='f-ldark p-r-20 f-11'>退票手续费</div>
            <div className='flight-cabin-list-item-price p-r-20 f-11'>¥20</div>
          </div>
        </div>
        <div data-flex='dir:left'>
          <div data-flex='flight-cabin-list-item-overflow dir:top main:center'>
            <div className='f-18 p-r-30 a-c'>{salesCabin.status === 'Q' ? '￥--' : '￥' + salesCabin.publishAmount}</div>
            <div className='f-14 p-r-30 a-c'>{salesCabin.status === 'Q' ? '已售罄' : (salesCabin.status === 'A' ? '剩余9+张' : '剩余' + salesCabin.status + '张')}</div>
          </div>
          <div className='flight-cabin-list-item-button br-10 a-c f-18 m-r-50' onClick={() => this.props.userLogInState ? viewUtils.dock(<BookCar flightModel={this.props.flightModel} salesCabinList={this.props.salesCabinList[i]} salesFlightDate={this.props.salesFlightDate} takeOrder={this.props.takeOrder} />) : this.props.toLogIn()}>订</div>
        </div>
      </div>
    })
  }

  render () {
    return (
      <div className={'flight-cabin-list p-b-25' + (this.props.showThis ? '' : ' hidden')}>
        {this.getCabinListLayout()}
      </div>
    )
  }
}
