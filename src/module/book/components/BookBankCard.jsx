import React, { Component } from 'react'
import SVG from 'react-svg-inline'
import iconAlipayLogo from '$assets/img/icon_book_alipay_logo.svg'
import iconBankLogo from '$assets/img/icon_book_bank_logo.svg'
import iconWechatLogo from '$assets/img/icon_book_wechat_logo.svg'
import iconYeepayLogo from '$assets/img/icon_book_yeepay_logo.svg'
import '../resources/bookBankCard.css'
import viewUtils from '$assets/js/viewUtils'
import L from '$i18n'
import PropTypes from 'prop-types'

export default class BookBankCard extends Component {
  static propTypes = {
    // data: PropTypes.object,  // 单条订单信息
    cardPay: PropTypes.func // 从订单管理OrderHistory过来的方法
  }
  goAliPay () {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  goWeChatPay () {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  goEproPay () {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  componentWillUnmount () {
    // 组件销毁的时候调用handler将组件的值传给需要用的组件
    // this.props.handler(this.state.name)
  }
  render () {
    return (
      <div className="book-bankcard-view p-t-30">
        <ul>
          <li onClick={() => this.goAliPay()} className="p-b-30" data-flex="cross:center main:center"><SVG svg={iconAlipayLogo} className="icon-60 m-r-30" />支付宝</li>
          <li onClick={() => this.props.cardPay()} className="p-v-30" data-flex="cross:center main:center"><SVG svg={iconBankLogo} className="icon-60 m-r-30" />银行卡</li>
          <li onClick={() => this.goWeChatPay()} className="p-v-30" data-flex="cross:center main:center"><SVG svg={iconWechatLogo} className="icon-60 m-r-30" fill="#41B035" />微信</li>
          <li onClick={() => this.goEproPay()} className="p-v-30" data-flex="cross:center main:center"><SVG svg={iconYeepayLogo} className="icon-60 m-r-30" fill="#2AA239" />易宝</li>
        </ul>
      </div>
    )
  }
}
