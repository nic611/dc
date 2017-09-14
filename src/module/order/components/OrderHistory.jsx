/**
 * Created by 张森峰 on 2017/4/25.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as orderHistoryActions } from '../model/orderModel'
import { actions as flightActions } from '../../book/model/flightModel'
import Btn from '$base/btn'
import BookBankCard from '../../book/components/BookBankCard'
import viewUtils from '$assets/js/viewUtils'
import routerUtils from '$assets/js/routerUtils'
// import HeaderTab from './OrderHistoryHeaderTab'
import PaymentTab from './OrderHistoryPaymentTab'
import OrderHistoryList from './OrderHistoryList'
import L from '$i18n'
import { actions as commonAction } from '$common/model/commonModel'
import '../resources/orderHistoryList.css'
// import ScrollerView from '$base/ScrollerView'

class OrderHistory extends Component {
  static propTypes = {
    appBarActions: PropTypes.object,
    orderHistoryActions: PropTypes.object,
    data: PropTypes.object,
    flightActions: PropTypes.object,
    commonAction: PropTypes.object
  }
  componentWillMount () {
    // 获取订单列表的数据
    this.props.commonAction.loadingTipsShow()
    this.props.orderHistoryActions.getOrderHistoryData()
    // this.props.orderHistoryActions.cancleTick('B201705151000012')
  }
  componentDidMount () {
    this.props.appBarActions.changeAppBar(L.getString('ORDER_HISTORY_APPBAR_AIRTICKET'))
    this.props.appBarActions.changeFooterBar(true)
  }
  // loadNext = () => {
  //   console.log('add')
  //   this.props.flightActions.addOrderPageNo()
  //   this.props.orderHistoryActions.getOrderHistoryData()
  // }
  goDetail = (item) => {
    // console.log(item)
    // this.props.orderHistoryActions.setDetailOrderNo(item)
    routerUtils.go('/orderDetail/' + item.orderNo)
  }
  itemRender = () => {
    let items = this.props.data.orderList.map((item, index) => {
      return <OrderHistoryList item={item} data={this.props.data} key={index} getOrderStatus={this.getOrderStatus} buttonDisplay={this.buttonDisplay} goDetail={this.goDetail} />
    })
    return items
  }
  orderHistoryBody () {
    if (this.props.data.orderList.length === 0) {
      return <div className='orderhistory-nolist f-28' data-flex='main:center cross:center'>{L.getString('ORDER_HISTORY_NOLIST')}</div>
    } else {
      return (
        <div className={'orderhistory-list'}>
          {/* <ScrollerView loadNext={this.loadNext} scrollerNode=".orderhistory-list"> */}
          {this.itemRender()}
          {/* </ScrollerView> */}
        </div>
      )
    }
  }
  cardPay = (item) => {
    this.props.flightActions.orderTicketInput(item)
    viewUtils.hideDock()
    routerUtils.go('/bookCardPay')
  }
  pay = (item) => {
    viewUtils.dock(<BookBankCard data={item} cardPay={() => this.cardPay(item)} />)
    // viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
    // this.props.actions.orderHistoryPay()
  }
  // cancelOrder (orderNo) {
  //   this.props.commonAction.loadingTipsShow()
  //   this.props.orderHistoryActions.cancleTick(orderNo)
  // }
  buttonDisplay = (status, item) => {
    if (parseInt(status) === 2 || parseInt(status) === 1) {
      return (
        <div className='orderhistory-list-button'>
          <Btn title={L.getString('ORDER_HISTORY_LIST_PAY')} action={() => this.pay(item)} />
        </div>
      )
    // } else
    // if (status !== '7') {
    //   return (
    //     <div className='orderhistory-list-button'>
    //       <Btn title='取消订单' action={() => viewUtils.confirm('是否要取消', () => this.cancelOrder(item.orderNo))} />
    //     </div>
    //   )
    }
  }
  getOrderStatus = (OrderStatus) => {
    // <!-- 1已提交待审核 2已确认未支付 3已支付未出票 4已支付已出票 5支付失败 6已确认正在支付 7已取消 1234代表组合-->
    if (parseInt(OrderStatus) === 1) {
      // return this.props.orderHistoryActions.modifyOrderStatusStr('已确认未支付')
      return '已确认未支付'
    } else if (parseInt(OrderStatus) === 2) {
      // return this.props.orderHistoryActions.modifyOrderStatusStr('已确认未支付')
      return '已确认未支付'
    } else if (parseInt(OrderStatus) === 3) {
      // return this.props.orderHistoryActions.modifyOrderStatusStr('已支付未出票')
      return '已支付未出票'
    } else if (parseInt(OrderStatus) === 4) {
      // return this.props.orderHistoryActions.modifyOrderStatusStr('已支付已出票')
      return '已支付已出票'
    } else if (parseInt(OrderStatus) === 5) {
      // return this.props.orderHistoryActions.modifyOrderStatusStr('支付失败')
      return '支付失败'
    } else if (parseInt(OrderStatus) === 6) {
      // return this.props.orderHistoryActions.modifyOrderStatusStr('已确认正在支付')
      return '已确认正在支付'
    } else if (parseInt(OrderStatus) === 7) {
      // return this.props.orderHistoryActions.modifyOrderStatusStr('已取消')
      return '已取消'
    }
  }
  render () {
    return (
      <div className='orderhistory'>
        <div className='orderhistory-tab'>
          {/* <HeaderTab /> */}
          <PaymentTab />
        </div>
        {this.orderHistoryBody()}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.get('orderModel').toJS()
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
)(OrderHistory)
