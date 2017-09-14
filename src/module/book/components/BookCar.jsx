import React, { Component } from 'react'
import PropTypes from 'prop-types'
import viewUtils from '$assets/js/viewUtils'
import moment from '$assets/js/moment'
import Btn from '$base/btn'
import SVG from 'react-svg-inline'
import IconFly from '$assets/img/icon_book_flyfrom.svg'
import '../resources/flight.css'

export default class BookCar extends Component {
  static propTypes = {
    flightModel: PropTypes.object,
    salesCabinList: PropTypes.object,
    salesFlightDate: PropTypes.object,
    takeOrder: PropTypes.func
  }
  render () {
    return (
      <div data-flex='dir:top' className="flight-book-car-view p-h-50 p-b-50 p-t-55">
        <div className='p-l-30 p-b-15' data-flex-box='1'>
          <div className='flight-book-car-view-grey p-l-80 f-14 p-b-10'>{moment(this.props.salesFlightDate.salesDepartureVO.date).format('MMMDo YYYY年')}</div>
          <div data-flex='main:justify'>
            <div data-flex='dir:top' data-flex-box='0'>
              <div data-flex='dir:left'>
                <SVG svg={IconFly} fill='#C83F3E' className='icon-60' />
                <div className='f-16 p-l-10'>{this.props.flightModel.depName}—{this.props.flightModel.arrName}</div>
              </div>
              <div className='c-accent f-16 p-l-80'>{this.props.salesFlightDate.salesDepartureVO.time.substring(0, 2)}:{this.props.salesFlightDate.salesDepartureVO.time.substring(2, 4)} ~ {this.props.salesFlightDate.salesArrivalVO.time.substring(0, 2)}:{this.props.salesFlightDate.salesArrivalVO.time.substring(2, 4)}</div>
            </div>
            <div className='flight-book-car-view-text f-16 p-r-40 a-r' data-flex-box='1'>【超值特惠{this.props.salesCabinList.code}舱】</div>
          </div>
        </div>
        <div>
          <div className='flight-book-car-view-bottom p-l-90 p-r-70' data-flex='dir:left main:justify'>
            <div className='f-14' data-flex='cross:center'>
              <span className='flight-book-car-view-grey f-14 p-r-10'>成人 X {this.props.flightModel.adultCount}&nbsp;&nbsp;</span>
              <span className='flight-book-car-view-grey f-14'>儿童 X {this.props.flightModel.childCount}</span>
            </div>
            <div className='p-t-10' data-flex='dir:top'>
              <div className='f-26 c-accent'>￥{this.props.salesCabinList.publishAmount + 50}</div>
              <div className='gflight-book-car-view-grey a-r'>含税合计</div>
            </div>
          </div>
          <div className='p-h-80 p-t-10' data-flex='dir:left main:justify cross:center' >
            <Btn className='flight-book-car-view-button1' title="取&nbsp;&nbsp;消" action={() => viewUtils.hideDock()} />
            <Btn className='flight-book-car-view-button2' title="确&nbsp;&nbsp;定" action={() => this.props.takeOrder(this.props.salesCabinList, this.props.salesFlightDate)} />
          </div>
        </div>
      </div>
    )
  }
}
