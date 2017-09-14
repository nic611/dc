/**
 * Created by 张森峰 on 2017/5/8.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-svg-inline'
import flightIconFlyLogo from '$assets/img/icon_fly_logo.svg'
import flightIconArrowUp from '$assets/img/icon_arrow_up.svg'
import flightIconArrowDown from '$assets/img/icon_order_down.svg'
import FlightPriceList from './FlightPriceList'
import viewUtils from '$assets/js/viewUtils'

export default class FlightList extends Component {
  static propTypes = {
    items: PropTypes.array,
    toggle: PropTypes.func,
    ticketsAlertMessage: PropTypes.func,
    takeOrder: PropTypes.func,
    flightModel: PropTypes.object,
    userLogInState: PropTypes.bool,
    toLogIn: PropTypes.func
  }
  getLowestPrice (price) {
    let lowestPrice = null
    const ls = price.filter(l => l.publishAmount).map(l => l.publishAmount)
    if (ls.length > 0) {
      lowestPrice = Math.min.apply(null, ls) + ''
    }
    return lowestPrice
  }
  getFlightListLayout () {
    return this.props.items.map((salesFlightGroup, i) => {
      const cabinList = []
      const lowestPrices = []
      const condition = salesFlightGroup.salesFlightList[0].salesCabinList.filter(l => l.publishAmount && (l.status === 'A' || Number(l.status)))
      const Wcabins = condition.filter(l => l.code === 'W').sort((a, b) => a.publishAmount - b.publishAmount)
      const Lcabins = condition.filter(l => ('YBMHKLJQR').indexOf(l.code) >= 0).sort((a, b) => a.publishAmount - b.publishAmount)
      const Ecabins = condition.filter(l => ('YBMHKLJQRW').indexOf(l.code) === -1).sort((a, b) => a.publishAmount - b.publishAmount)
      if (Wcabins.length > 0) {
        cabinList.push(Wcabins[0])
        lowestPrices.push(Number(Wcabins[0].status) || 10)
      }
      if (Lcabins.length > 0) {
        cabinList.push(Lcabins[0])
        lowestPrices.push(Number(Lcabins[0].status) || 10)
      }
      if (Ecabins.length > 0) {
        cabinList.push(Ecabins[0])
        lowestPrices.push(Number(Ecabins[0].status) || 10)
      }
      let lowestPrice = lowestPrices.length === 0 ? 0 : Math.min.apply(null, lowestPrices)
      lowestPrice === 10 && (lowestPrice = '9+')
      return <div key={'flightList-' + i}>
        <div className='flight-message-border p-l-45 p-r-55 p-t-60' data-flex='dir:left main:center cross:center'>
          <div data-flex='dir:left main:justify' data-flex-box='1'>
            <div className='p-b-35'>
              <div className='f-20' data-flex='main:center'>{salesFlightGroup.salesFlightList[0].salesDepartureVO.time.substring(0, 2)}:{salesFlightGroup.salesFlightList[0].salesDepartureVO.time.substring(2, 4)}</div>
              <div className='f-14' data-flex='main:center'>{viewUtils.getCityNameByCode(salesFlightGroup.salesFlightList[0].salesDepartureVO.airportCode)}{salesFlightGroup.salesFlightList[0].salesDepartureVO.terminal}</div>
            </div>
            <div className='flight-message-arrowright f-ldark m-h-10' data-flex='dir:top cross:center'>
              <div className='flight-message-arrowright-icon1' />
              <div />
            </div>
            <div>
              <div className='f-20' data-flex='main:center'>{salesFlightGroup.salesFlightList[0].salesArrivalVO.time.substring(0, 2)}:{salesFlightGroup.salesFlightList[0].salesArrivalVO.time.substring(2, 4)}</div>
              <div className='f-14' data-flex='main:center'>{viewUtils.getCityNameByCode(salesFlightGroup.salesFlightList[0].salesArrivalVO.airportCode)}{salesFlightGroup.salesFlightList[0].salesArrivalVO.terminal}</div>
            </div>
          </div>
          <div className='f-ldark m-t-70 p-l-40' data-flex='dir:left cross:center' data-flex-box='0'>
            {/* <div className='f-14'>8.4折</div> */}
            <div onClick={() => this.props.toggle(i, salesFlightGroup.expand)}>
              {salesFlightGroup.expand ? <SVG svg={flightIconArrowUp} className='icon-60' /> : <SVG svg={flightIconArrowDown} className='icon-60' />}
            </div>
          </div>
        </div>
        <div className={'flight-message-border f-ldark f-13 p-h-50 p-t-30 p-b-10'} data-flex='dir:left'>
          <div className='m-r-20' data-flex-box='0'>
            <SVG svg={flightIconFlyLogo} className='icon-60' />
          </div>
          <div className='p-r-20' data-flex-box='0'>{salesFlightGroup.salesFlightList[0].salesCarrierVO.flightNumber}</div>
          <span>|</span>
          <div className='m-l-20' data-flex-box='1'>{salesFlightGroup.salesFlightList[0].salesEquipmentVO.code}宽</div>
          <div data-flex-box='0'>{'最低' + Number(this.getLowestPrice(cabinList)).toFixed(1) + '(剩余' + lowestPrice + ')'}</div>
        </div>
        <FlightPriceList flightModel={this.props.flightModel} userLogInState={this.props.userLogInState} toLogIn={() => this.props.toLogIn()} salesFlightDate={salesFlightGroup.salesFlightList[0]} salesCabinList={cabinList} showThis={salesFlightGroup.expand} takeOrder={this.props.takeOrder} ticketsAlertMessage={() => this.props.ticketsAlertMessage()} />
      </div>
    })
  }

  render () {
    return (
      <div className='flight-message m-b-100 p-b-70'>
        {this.getFlightListLayout()}
      </div>
    )
  }
}
