/**
 * Created by 张森峰 on 2017/4/24.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions } from '../model/passengerModel'

import PassengerList from './PassengerList'
import routerUtils from '$assets/js/routerUtils'
import '../resources/passenger.css'
import L from '$i18n'

class Passenger extends Component {
  static propTypes = {
    appBarActions: PropTypes.object,
    data: PropTypes.object,
    passengerAddMessageDeleteState: PropTypes.bool,
    actions: PropTypes.object
  }
  componentDidMount () {
    this.props.appBarActions.changeAppBar(L.getString('USER_PASSENGER_COMMON_PASSENGER'), false, [{text: L.getString('USER_PASSENGER_DELETE'), action: () => this.del()}])
    this.props.appBarActions.changeFooterBar(true)
    this.props.actions.passengerAddMessageDeleteStateFalse()
    this.props.actions.resetPassengerMessage()
    this.props.actions.passengerAddUnloading()
    this.props.actions.passengerAddMainViewTypeChange(0)
  }
  del = () => {
    this.props.actions.passengerAddMessageDeleteStateChange()
    this.props.appBarActions.changeAppBar(L.getString('USER_PASSENGER_COMMON_PASSENGER'), false, this.props.data.passengerAddMessageDeleteState ? [{text: L.getString('USER_PASSENGER_DELETE'), action: () => this.del()}] : [{text: L.getString('USER_PASSENGER_COMPLETED'), action: () => this.del()}])
  }
  toPassengerAddView = () => {
    this.props.actions.passengerAddMainViewTypeChange(0)
    routerUtils.go('passengerAdd')
  }
  deletePassenger = () => {
    let passengerMessage = this.props.data.passengerMessage
    let indexArray = []
    passengerMessage.forEach((item, index) => {
      if (item.checkboxState) {
        indexArray.push(index)
      }
    })
    indexArray.sort((a, b) => b - a)
    if (indexArray.length >= 1) {
      this.props.actions.deletePassenger(indexArray)
      this.props.actions.passengerAddMessageDeleteStateFalse()
      this.props.appBarActions.changeAppBar(L.getString('USER_PASSENGER_COMMON_PASSENGER'), false, this.props.data.passengerAddMessageDeleteState ? [{text: L.getString('USER_PASSENGER_DELETE'), action: () => this.del()}] : [{text: L.getString('USER_PASSENGER_COMPLETED'), action: () => this.del()}])
    }
  }
  button = () => {
    if (this.props.data.passengerAddMessageDeleteState) {
      return (
        <div className='passenger-button' data-flex-box='0' onClick={() => this.deletePassenger()}>{L.getString('USER_PASSENGER_DELETE_BUTTON')}</div>
      )
    } else {
      return (
        <div className='passenger-button' data-flex-box='0' onClick={() => this.toPassengerAddView()}>{L.getString('USER_PASSENGER_ADD_PASSENGER')}</div>
      )
    }
  }
  render () {
    return (
      <div className='passenger' data-flex='dir:top'>
        <div className='passenger-body' data-flex-box='1'>
          {
            this.props.data.passengerMessage.map((item, index) => {
              return (<PassengerList {...item} key={'PassengerMessage' + index} index={index} />)
            })
          }
        </div>
        {this.button()}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.get('passengerModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Passenger)
