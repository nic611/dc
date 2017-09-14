/**
 * Created by Administrator on 2017/5/4.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as flightActions } from '../model/flightModel'
import { actions as passengerActions } from '../../user/model/passengerModel'
import BookRoundTrip from './BookRoundTrip'
import SVG from 'react-svg-inline'
import iconDynamicR from '$assets/img/icon_dynamic_right.svg'
import iconBookDelete from '$assets/img/icon_book_delete.svg'
import iconBookAdd from '$assets/img/icon_book_add.svg'
import iconBookChecked from '$assets/img/icon_check_checked.svg'
import iconBookCheckNo from '$assets/img/icon_check_checkNo.svg'
import '../resources/bookAccount.css'
import Btn from '$base/btn'
import routerUtils from '$assets/js/routerUtils'
import viewUtils from '$assets/js/viewUtils'
import L from '$i18n'

class BookAccount extends Component {
  static propTypes = {
    flightModel: PropTypes.object,
    appBarActions: PropTypes.object,
    flightActions: PropTypes.object,
    passengerActions: PropTypes.object
  }
  componentWillMount () {
    this.props.flightActions.getPricing(this.props.flightModel)
  }
  componentDidMount () {
    this.props.appBarActions.changeAppBar(this.props.flightModel.depName + '-' + this.props.flightModel.arrName)
    this.props.appBarActions.changeFooterBar(true, 0)
  }
  addPassenger () {
    routerUtils.go('/passenger')
    this.props.passengerActions.passengerComeFromChange('bookAccount')
  }
  passengerList () {
    let list = this.props.flightModel.passenger.map((item, i) => {
      return (
        <div key={'passenger-' + i} data-flex="cross:center main:justify" className="p-v-30 p-h-70 account-twoB">
          <div data-flex="cross:center">
            <SVG svg={iconBookDelete} className="icon-60 m-r-50" fill="#C93E3D" onClick={() => viewUtils.confirm('是否要删除', () => this.props.flightActions.deletePassengerItem(item, i))} />
            <div>
              <p className="m-b-30">{item.name} {item.IDCard}</p>
              <p>联系电话：{item.phone}</p>
            </div>
          </div>
          <SVG svg={iconDynamicR} className="icon-60" fill="#A8A8A8" />
        </div>
      )
    })
    return list
  }
  reBookMessage = () => {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  LuggageRequirements = () => {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  creatOrder = () => {
    this.props.flightActions.creatOrder(this.props.flightModel)
    routerUtils.go('/bookPay')
  }
  getPriceDetail () {
    if (this.props.flightModel.salesFlightPATFareGroupList.length && this.props.flightModel.salesFlightPATFareGroupList.length > 0) {
      return this.props.flightModel.salesFlightPATFareGroupList.map((FareGroupList, i) => (
        <div key={'FareGroupList-' + i}>
          <div className="bg-white m-b-30">
            <div data-flex="cross:center main:justify" className="p-v-30 p-h-70 account-twoT">
              <span>价格明细</span>
              <span className="f-12 f-ldark" onClick={() => this.reBookMessage()}>退改签规定</span>
            </div>
            <div className="p-v-30 p-h-70">
              <ul className="m-b-30 account-ul f-12" data-flex="cross:center">
                <li>{FareGroupList.priceType === 'ADULT' ? '成人票价' : '儿童票价'}￥{FareGroupList.salesFlightPATFareVO.salesFlightPATFareBaseFareVO.amount}</li>
                <li>民航基金￥{FareGroupList.salesFlightPATFareVO.salesFlightPATFareTaxList[0].amount}</li>
                <li>燃油￥{FareGroupList.salesFlightPATFareVO.salesFlightPATFareTaxList[1].amount}</li>
                <li>保险￥0</li>
              </ul>
              <div data-flex="cross:center main:justify">
                <SVG data-flex-box='0' onClick={() => this.props.flightActions.changeAccountCheckState('price')} svg={(this.props.flightModel.price.flag === 0) ? iconBookCheckNo : iconBookChecked} className="icon-60 m-r-30" fill="#C93E3D" />
                <span data-flex-box='0'>邮寄行程单</span>
                <span className='a-r' data-flex-box='1'>合计：￥{FareGroupList.salesFlightPATFareVO.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      ))
    }
  }
  render () {
    return (
      <div className="f-14">
        <BookRoundTrip from={this.props.flightModel.depName} to={this.props.flightModel.arrName} tripType={this.props.flightModel.tripType} dataGo={this.props.flightModel.salesSegmentFlightList[0].salesFlightList} dataReturn={this.props.flightModel.tripType === 2 ? this.props.flightModel.salesSegmentFlightListBack[0].salesFlightList : this.props.flightModel.salesSegmentFlightList[0].salesFlightList} />
        <div className="bg-white m-b-30">
          <div data-flex="cross:center main:justify" className="p-v-30 p-h-70">
            <span>乘机人</span>
            <SVG svg={iconBookAdd} className="icon-60" fill="#C93E3D" onClick={() => this.addPassenger()} />
          </div>
          {this.passengerList()}
        </div>
        {this.getPriceDetail()}
        <div data-flex="cross:center main:justify" className="bg-white m-b-30 p-v-30 p-h-70" onClick={() => this.LuggageRequirements()}>
          <span>行李规定</span>
          <SVG svg={iconDynamicR} className="icon-60" fill="#A8A8A8" />
        </div>
        <div data-flex="cross:center" className="bg-white m-b-30 p-v-30 p-h-70">
          <SVG onClick={() => this.props.flightActions.changeAccountCheckState('luggage')} svg={(this.props.flightModel.luggage.flag === 0) ? iconBookCheckNo : iconBookChecked} className="icon-60 m-r-30" fill="#C93E3D" />
          <span>我已阅读并同意<span className="p-color" onClick={() => viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))}>预订条款</span></span>
        </div>
        <div className="m-h-65 m-v-55">
          <Btn title="确认订单" action={this.creatOrder} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  flightModel: state.get('flightModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  flightActions: bindActionCreators(flightActions, dispatch),
  passengerActions: bindActionCreators(passengerActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookAccount)
