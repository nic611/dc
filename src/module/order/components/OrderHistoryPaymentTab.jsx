/**
 * Created by 张森峰 on 2017/4/26.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../model/orderModel'

import '../resources/orderHistoryTab.css'
import L from '$i18n'

class PaymentTab extends Component {
  static propTypes = {
    actions: PropTypes.object,
    data: PropTypes.object
  }
  allPayment = () => {
    this.props.actions.allPayment()
  }
  cashPayment = () => {
    this.props.actions.cashPayment()
    // this.props.actions.orderListDistinguish()
  }
  integralPayment = () => {
    this.props.actions.integralPayment()
    // this.props.actions.orderListDistinguish()
  }
  render () {
    return (
      <div className='orderhistory-tab-payment f-14' data-flex='dir:left box:mean'>
        <div className={this.props.data.paymentType === 1 ? 'active' : ''} onClick={this.allPayment}>{L.getString('ORDER_HISTORY_PAYMENT_TAB_ALL')}</div>
        <div className={this.props.data.paymentType === 2 ? 'active' : ''} onClick={this.cashPayment}>{L.getString('ORDER_MODEL_ORDER_STATE1')}</div>
        <div className={this.props.data.paymentType === 3 ? 'active' : ''} onClick={this.integralPayment}>{L.getString('ORDER_MODEL_ORDER_STATE2')}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.get('orderModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentTab)
