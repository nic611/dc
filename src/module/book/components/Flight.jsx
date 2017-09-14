/**
 * Created by 熊超超 on 2017/4/27.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { actions as flightActions } from '../model/flightModel'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as commonAction } from '$common/model/commonModel'
import CalendarH from '$cc/CalendarH'
import FlightList from './FlightList'
import FlightFooterBar from './FlightFooterBar'
import viewUtils from '$assets/js/viewUtils'
import L from '$i18n'
import routerUtils from '$assets/js/routerUtils'
import '../resources/flight.css'

class Flight extends Component {
  static propTypes = {
    appBarActions: PropTypes.object,
    flightModel: PropTypes.object,
    flightActions: PropTypes.object,
    commonAction: PropTypes.object,
    toggleSalesSegmentFlightExpand: PropTypes.func,
    toggleSalesSegmentFlightExpandBack: PropTypes.func,
    userData: PropTypes.object,
    params: PropTypes.object
  }
  componentWillMount () {
    if (this.props.flightModel.tripType === 1) {
      this.props.appBarActions.changeAppBar('航班选择')
      this.props.flightActions.getBookResult(this.props.flightModel)
    } else if (this.props.flightModel.tripType === 2) {
      this.props.appBarActions.changeAppBar('航班选择-去程')
      this.props.flightActions.getBookResult(this.props.flightModel)
      this.props.flightActions.getBookResultReturn(this.props.flightModel)
    }
    this.props.appBarActions.changeFooterBar(true)
    this.props.commonAction.loadingTipsShow()
  }
  toggle = (i, expand) => {
    if (this.props.params.type === 'return') {
      this.props.flightActions.toggleSalesSegmentFlightExpandBack(i, expand)
    } else {
      this.props.flightActions.toggleSalesSegmentFlightExpand(i, expand)
    }
  }
  ticketsAlertMessage = () => {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  footerBarOnClick1 = () => {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  footerBarOnClick2 = () => {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  footerBarOnClick3 = () => {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  takeOrder = (cabinInfo, flightInfo) => {
    viewUtils.hideDock()
    if (this.props.params.type === 'start') {
      const flightInfoStart = {
        arrCnName: viewUtils.getCityByCode(flightInfo.salesArrivalVO.airportCode),
        arrCode: flightInfo.salesArrivalVO.airportCode,
        arrTerm: flightInfo.salesArrivalVO.terminal,
        arrTime: flightInfo.salesArrivalVO.time,
        cabin: cabinInfo.code,
        depCnName: viewUtils.getCityByCode(flightInfo.salesDepartureVO.airportCode),
        depCode: flightInfo.salesDepartureVO.airportCode,
        depTerm: flightInfo.salesDepartureVO.terminal,
        depTime: flightInfo.salesDepartureVO.time,
        flightDate: flightInfo.salesDepartureVO.date,
        flightNo: flightInfo.salesCarrierVO.flightNumber,
        freebag: '20KG',
        indexInPnr: '4',
        meal: flightInfo.meals,
        oldCabinCode: '',
        planeType: flightInfo.salesEquipmentVO.code,
        segType: '0',
        seq: '1',
        stop: flightInfo.numberOfStops
      }
      const priceStartVO = {
        actionCode: 'LL',
        arrCode: flightInfo.salesArrivalVO.airportCode,
        cabin: cabinInfo.code,
        depCode: flightInfo.salesDepartureVO.airportCode,
        flightDate: this.props.flightModel.flightDate,
        flightNo: flightInfo.salesCarrierVO.flightNumber,
        planeType: flightInfo.salesEquipmentVO.code
      }
      this.props.flightActions.initFlightStartInfo(flightInfoStart)
      this.props.flightActions.initPriceStartInfo(priceStartVO)
    } else {
      const flightInfoReturn = {
        arrCnName: viewUtils.getCityByCode(flightInfo.salesArrivalVO.airportCode),
        arrCode: flightInfo.salesArrivalVO.airportCode,
        arrTerm: flightInfo.salesArrivalVO.terminal,
        arrTime: flightInfo.salesArrivalVO.time,
        cabin: cabinInfo.code,
        depCnName: viewUtils.getCityByCode(flightInfo.salesDepartureVO.airportCode),
        depCode: flightInfo.salesDepartureVO.airportCode,
        depTerm: flightInfo.salesDepartureVO.terminal,
        depTime: flightInfo.salesDepartureVO.time,
        flightDate: flightInfo.salesDepartureVO.date,
        flightNo: flightInfo.salesCarrierVO.flightNumber,
        freebag: '',
        indexInPnr: '',
        meal: flightInfo.meals,
        oldCabinCode: '',
        planeType: flightInfo.salesEquipmentVO.code,
        segType: '0',
        seq: '2',
        stop: flightInfo.numberOfStops
      }
      const priceReturnVO = {
        actionCode: 'LL',
        arrCode: flightInfo.salesArrivalVO.airportCode,
        cabin: cabinInfo.code,
        depCode: flightInfo.salesDepartureVO.airportCode,
        flightDate: this.props.flightModel.returnDate,
        flightNo: flightInfo.salesCarrierVO.flightNumber,
        planeType: flightInfo.salesEquipmentVO.code
      }
      this.props.flightActions.initFlightBackInfo(flightInfoReturn)
      this.props.flightActions.initPriceBackInfo(priceReturnVO)
      routerUtils.go('/bookAccount')
      return
    }
    if (this.props.flightModel.tripType === 1) {
      routerUtils.go('/bookAccount')
    } else if (this.props.flightModel.tripType === 2) {
      this.props.appBarActions.changeAppBar('航班选择-返程')
      routerUtils.go('/flight/return')
    }
  }
  toLogIn = () => {
    routerUtils.go('/login')
  }
  render () {
    return (
      <div className='flight'>
        {/* <CalendarH startDate="2017-04-22" endDate="2019-05-27" /> */}
        <CalendarH items={this.props.flightModel.priceCalendar} chooseDate={this.props.params.type === 'return' ? this.props.flightModel.calendarBackDate : this.props.flightModel.calendarStartDate} />
        <FlightList items={this.props.params.type === 'return' ? this.props.flightModel.salesSegmentFlightListBack : this.props.flightModel.salesSegmentFlightList}
          userLogInState={this.props.userData.userLogInState} toLogIn={() => this.toLogIn()} toggle={this.toggle} flightModel={this.props.flightModel}
          toggleSalesSegmentFlightExpand={this.props.params.type === 'return' ? this.props.flightActions.toggleSalesSegmentFlightExpandBack : this.props.flightActions.toggleSalesSegmentFlightExpand}
          takeOrder={this.takeOrder} ticketsAlertMessage={() => this.ticketsAlertMessage()} />
        <FlightFooterBar footerBarOnClick1={() => this.footerBarOnClick1()} footerBarOnClick2={() => this.footerBarOnClick2()} footerBarOnClick3={() => this.footerBarOnClick3()} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  flightModel: state.get('flightModel').toJS(),
  userData: state.get('userModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  flightActions: bindActionCreators(flightActions, dispatch),
  appBarActions: bindActionCreators(appBarActions, dispatch),
  commonAction: bindActionCreators(commonAction, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flight)
