/**
 * Created by 张森峰 on 2017/4/25.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../model/orderModel'

import '../resources/orderHistoryTab.css'
import L from '$i18n'

class HeaderTab extends Component {
  static propTypes = {
    actions: PropTypes.object,
    data: PropTypes.object
  }
  ticketOrder = () => {
    this.props.actions.ticketOrder()
    this.props.actions.allPayment()
  }
  allOrder = () => {
    this.props.actions.allOrder()
    this.props.actions.allPayment()
  }
  render () {
    return (
      <div className='orderhistory-tab-header f-14 f-b' data-flex='dir:left box:mean'>
        <div className={this.props.data.orderType === 1 ? 'active' : ''} onClick={this.ticketOrder}>{L.getString('ORDER_HISTORY_HEADER_TAB1')}</div>
        <div className={this.props.data.orderType === 2 ? 'active' : ''} onClick={this.allOrder}>{L.getString('ORDER_HISTORY_HEADER_TAB2')}</div>
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
)(HeaderTab)
