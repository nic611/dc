/**
 * Created by wq on 2017/5/19.
 */
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as orderHistoryActions } from '../model/orderModel'
import { actions as flightActions } from '../../book/model/flightModel'
import L from '$i18n'
import viewUtils from '$assets/js/viewUtils'
import '../resources/orderDetail.css'
// import iconDynamicR from '$assets/img/icon_dynamic_right.svg'
import Btn from '$base/btn'
import BookBankCard from '../../book/components/BookBankCard'
import routerUtils from '$assets/js/routerUtils'
import { actions as commonAction } from '$common/model/commonModel'
import OrderDetailDep from './OrderDetailDep'

class OrderDetail extends Component {
  static propTypes = {
    data: PropTypes.object,
    appBarActions: PropTypes.object,
    orderHistoryActions: PropTypes.object,
    params: PropTypes.object,
    flightActions: PropTypes.object,
    commonAction: PropTypes.object
  }
  componentWillMount () {
    // console.log('111')
    this.props.commonAction.loadingTipsShow()
    this.props.orderHistoryActions.getOrderDetail(this.props.params.orderNo)
  }
  componentDidMount () {
    this.props.appBarActions.changeAppBar(L.getString('ORDER_DETAIL'))
    this.props.appBarActions.changeFooterBar(true)
  }
  cardPay = (item) => {
    this.props.flightActions.orderTicketInput(item)
    viewUtils.hideDock()
    routerUtils.go('/bookCardPay')
  }
  pay = (item) => {
    viewUtils.dock(<BookBankCard data={item} cardPay={() => this.cardPay(item)} />)
  }
  cancelOrder (orderNo) {
    this.props.commonAction.loadingTipsShow()
    this.props.orderHistoryActions.cancleTick(orderNo)
  }
  judgeBtn = () => {
    // <!-- 1已提交待审核 2已确认未支付 3已支付未出票 4已支付已出票 5支付失败 6已确认正在支付 7已取消 1234代表组合-->
    const status = this.props.data.getIn(['baseBookInfoVO', 'orderStatus'])
    if (status === 2 || status === 1) {
      return (
        <div>
          <div className="m-h-65 m-v-55">
            <Btn title={L.getString('ORDER_HISTORY_LIST_PAY')} action={() => this.pay(this.props.data)} />
          </div>
          <div className="m-h-65 m-v-55">
            <Btn title='取消订单' action={() => viewUtils.confirm('是否要取消', () => this.cancelOrder(this.props.params.orderNo))} />
          </div>
        </div>
      )
    }
  }
  getTime = (flight) => {
    const depTime = flight.get('depTime')
    const arrTime = flight.get('arrTime')
    return depTime.substring(0, 2) + ':' + depTime.substring(2, 4) + '-' + arrTime.substring(0, 2) + ':' + arrTime.substring(2, 4)
  }
  judgeFlight1 = () => {
    if (this.props.data.get('flightVOs').get(0)) {
      return <OrderDetailDep title="去程信息" subTitle="到达" getTime={this.getTime} flight={this.props.data.get('flightVOs').get(0)} />
    }
  }
  judgeFlight2 = () => {
    if (this.props.data.get('flightVOs').get(1)) {
      return <OrderDetailDep title="回程信息" subTitle="到达" getTime={this.getTime} flight={this.props.data.get('flightVOs').get(1)} />
    }
  }
  render () {
    // console.log(this.props.data)
    if (!this.props.data) {
      return null
    }
    return (
      <div className="f-14">
        {this.judgeFlight1()}
        {this.judgeFlight2()}
        <div>
          <h3 className="p-v-30 p-l-30">乘机人信息</h3>
          <div className="bg-white p-h-30">
            <p className="p-v-25" data-flex="main:justify">
              <span>姓名：</span>
              <span>{this.props.data.get('travelerVOs').get(0).get('name')}</span>
            </p>
            <p className="p-v-25" data-flex="main:justify">
              <span>证件号码：</span>
              <span>{this.props.data.get('travelerVOs').get(0).get('docInfoVO').get('docNo')}</span>
            </p>
            <p className="p-v-25" data-flex="main:justify">
              <span>票号：</span>
              <span>{this.props.data.get('travelerVOs').get(0).get('ticketNo') === '' ? '--' : this.props.data.get('travelerVOs').get(0).get('ticketNo')}</span>
            </p>
          </div>
        </div>
        <div className="m-b-30">
          <h3 className="p-v-30 p-l-30">联系人信息</h3>
          <div className="bg-white p-h-30">
            <p className="p-v-25" data-flex="main:justify">
              <span>{this.props.data.getIn(['contactInfoVO', 'contactName'])}</span>
              <span>{this.props.data.getIn(['contactInfoVO', 'contactPhone'])}</span>
            </p>
          </div>
        </div>
        {this.judgeBtn()}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.getIn(['orderModel', 'orderDetail'])
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  orderHistoryActions: bindActionCreators(orderHistoryActions, dispatch),
  flightActions: bindActionCreators(flightActions, dispatch),
  commonAction: bindActionCreators(commonAction, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetail)
