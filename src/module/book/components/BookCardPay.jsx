/**
 * Created by 张森峰 on 2017/5/8.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as flightActions } from '../model/flightModel'
import Btn from '$base/btn'
import viewUtils from '$assets/js/viewUtils'
// import routerUtils from '$assets/js/routerUtils'
import L from '$i18n'
import '../resources/bookCardPay.css'

class BookCardPay extends Component {
  static propTypes = {
    data: PropTypes.object,
    appBarActions: PropTypes.object,
    flightActions: PropTypes.object
  }
  componentDidMount () {
    this.props.appBarActions.changeAppBar('银联在线支付')
    this.props.appBarActions.changeFooterBar(true)
    this.props.flightActions.resetBookCardPay()
  }
  mobile = () => {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  inputOnChange1 = (event) => {
    this.props.flightActions.cardNumChange(event.target.value)
  }
  inputOnChange2 = (event) => {
    this.props.flightActions.cardPayMonthChange(event.target.value)
  }
  inputOnChange3 = (event) => {
    this.props.flightActions.cardPayYearChange(event.target.value)
  }
  inputOnChange4 = (event) => {
    this.props.flightActions.cardPayCVN2Change(event.target.value)
  }
  CVN2 () {
    viewUtils.alert(L.getString('VIEW_UTILS_ALERT1'))
  }
  button = () => {
    let nowDate = new Date()
    let nowMonth = nowDate.getMonth() + 1
    let nowYear = nowDate.getFullYear()
    let inputMonth = parseInt(this.props.data.bookCardPay.month)
    let inputYear = parseInt(this.props.data.bookCardPay.year) + 2000
    if (this.props.data.bookCardPay.cardNum.length !== 16 && this.props.data.bookCardPay.cardNum.length !== 19) {
      viewUtils.alert('请输入16位或19位银行卡号')
    } else if (!/^(0?[1-9]|1[0-2])$/.test(this.props.data.bookCardPay.month)) {
      viewUtils.alert('请输入正确的月份')
    } else if (!/^\d{2}$/.test(this.props.data.bookCardPay.year)) {
      viewUtils.alert('请输入正确的年份')
    } else if ((inputYear < nowYear) || ((inputYear === nowYear) && (inputMonth < nowMonth))) {
      viewUtils.alert('信用卡已过期')
    } else if (!/^\d{3}$/.test(this.props.data.bookCardPay.CVN2)) {
      viewUtils.alert('请输入三位数的SVN2')
    } else {
      this.props.flightActions.orderTicket(this.props.data.orderParams) // 发起出票请求
      // routerUtils.go('/orderHistory')
    }
  }
  render () {
    return (
      <div className='bookCardPay'>
        <div className='top-alert f-16 p-h-80 m-b-85'>目前只支持信用卡支付</div>
        <div className='bookCardPay-body m-t-45 p-h-70'>
          <div className='bookCardPay-body-cardid p-t-25 p-r-20 f-16' data-flex='dir:left'>
            <div className='m-r-40' data-flex-box='0'>银行卡卡号</div>
            <input type='text' className='f-16' data-flex-box='1' placeholder='请输入您的银行卡卡号' onChange={(event) => this.inputOnChange1(event)} />
          </div>
          <div className='bookCardPay-body-date f-16 p-t-50' data-flex='dir:left'>
            <div className='b-t-10 m-r-100'>有效期</div>
            <input type='text' className='m-l-40 f-16' onChange={(event) => this.inputOnChange2(event)} />
            <div className='p-l-40 p-r-80'>月</div>
            <input type='text' className='f-16' onChange={(event) => this.inputOnChange3(event)} />
            <div className='p-l-40'>年</div>
          </div>
          <div className='p-t-45 p-b-60 a-c f-16'>请输入信用卡正面的有效期，如：09/13</div>
          <div className='bookCardPay-cvn2 f-16' data-flex='dir:left'>
            <div className='p-r-100' data-flex-box='0'>CVN2</div>
            <input type='text' className='p-r-40 f-16' data-flex-box='1' placeholder='' onChange={(event) => this.inputOnChange4(event)} />
            <div className='bookCardPay-cvn2-red p-h-40' data-flex-box='0' onClick={() => this.CVN2()}>什么是CVN2?</div>
          </div>
          <div className='f-16 p-t-45 p-b-65'>请输入信用卡背面的末三位数字</div>
        </div>
        <div className='bookCardPay-button m-h-60 m-t-85'>
          <Btn title='确认支付' action={() => this.button()} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.get('flightModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  flightActions: bindActionCreators(flightActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookCardPay)
