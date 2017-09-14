/**
 * Created by Administrator on 2017/5/4.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as flightActions } from '../model/flightModel'
import BookRoundTrip from './BookRoundTrip'
import BookBankCard from './BookBankCard'
import '../resources/bookAccount.css'
import Btn from '$base/btn'
import viewUtils from '$assets/js/viewUtils'
import routerUtils from '$assets/js/routerUtils'

class BookPay extends Component {
  static propTypes = {
    flightModel: PropTypes.object,
    flightActions: PropTypes.object,
    appBarActions: PropTypes.object
  }
  componentWillMount () {
    this.props.appBarActions.changeAppBar(this.props.flightModel.depName + '-' + this.props.flightModel.arrName)
    this.props.appBarActions.changeFooterBar(true)
    this.props.flightActions.initFlightStartInfo()
  }
  passengerList () {
    let list = this.props.flightModel.passenger.map((item, i) => {
      return (
        <p key={'payList-' + i} className="m-b-30"><span className="m-r-50">{item.name}</span><span className="m-r-75">{(item.adult === 0) ? '成人' : '儿童'}</span><span>{item.IDCard}</span></p>
      )
    })
    return list
  }
  cardPay () {
    viewUtils.hideDock()
    routerUtils.go('/bookCardPay')
  }
  render () {
    return (
      <div className="f-14">
        <BookRoundTrip from={this.props.flightModel.depName} to={this.props.flightModel.arrName} tripType={this.props.flightModel.tripType} dataGo={this.props.flightModel.salesSegmentFlightList[0].salesFlightList} dataReturn={this.props.flightModel.tripType === 2 ? this.props.flightModel.salesSegmentFlightListBack[0].salesFlightList : this.props.flightModel.salesSegmentFlightList[0].salesFlightList} />
        <p className="p-v-30 p-h-70 pay-hint m-b-30 f-12">该订单将在30分钟内有效，请尽快支付</p>
        <div className="bg-white p-v-30">
          <div className="pay-middle p-h-70">
            <p className="p-b-30 f-b">乘机人：</p>
            {this.passengerList()}
          </div>
          <div className="p-h-70 p-t-30 f-b">
            <div data-flex="cross:center main:justify">
              金额总计：
              <span className="f-18">￥{this.props.flightModel.salesFlightPATFareGroupList[0].salesFlightPATFareVO.totalPrice}</span>
              <span className="p-color acc-hide">查看明细</span>
            </div>
          </div>
        </div>
        <div className="m-h-65 m-t-80">
          <Btn title="确认支付" action={() => viewUtils.dock(<BookBankCard cardPay={() => this.cardPay()} />)} />
        </div>
        <div className="p-h-65 m-v-55">
          <Btn className="overBtn" title="稍后支付" action={() => routerUtils.go('/book')} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  flightModel: state.get('flightModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  flightActions: bindActionCreators(flightActions, dispatch),
  appBarActions: bindActionCreators(appBarActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookPay)
