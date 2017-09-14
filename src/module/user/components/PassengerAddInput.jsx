/**
 * Created by 张森峰 on 2017/5/1.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../model/passengerModel'

import L from '$i18n'

class PassengerAddInput extends Component {
  static propTypes = {
    title: PropTypes.string,
    inputType: PropTypes.string,
    placeholder: PropTypes.string,
    actions: PropTypes.object,
    data: PropTypes.object
  }
  inputChange = (event) => {
    switch (this.props.title) {
      case L.getString('USER_PASSENGER_ADD_INPUT_FAMILY_NAME_CHS'):
        this.props.actions.nameCHS1Change(event.target.value)
        break
      case L.getString('USER_PASSENGER_ADD_INPUT_NAME_CHS'):
        this.props.actions.nameCHS2Change(event.target.value)
        break
      case L.getString('USER_PASSENGER_ADD_INPUT_FAMILY_NAME_EN'):
        this.props.actions.nameEN1Change(event.target.value)
        break
      case L.getString('USER_PASSENGER_ADD_INPUT_NAME_EN'):
        this.props.actions.nameEN2Change(event.target.value)
        break
      case L.getString('USER_PASSENGER_ADD_INPUT_MOBILE'):
        this.props.actions.passengerAddMobileChange(event.target.value)
        break
    }
  }
  value () {
    switch (this.props.title) {
      case L.getString('USER_PASSENGER_ADD_INPUT_FAMILY_NAME_CHS'):
        return this.props.data.nameCHS1
      case L.getString('USER_PASSENGER_ADD_INPUT_NAME_CHS'):
        return this.props.data.nameCHS2
      case L.getString('USER_PASSENGER_ADD_INPUT_FAMILY_NAME_EN'):
        return this.props.data.nameEN1
      case L.getString('USER_PASSENGER_ADD_INPUT_NAME_EN'):
        return this.props.data.nameEN2
      case L.getString('USER_PASSENGER_ADD_INPUT_MOBILE'):
        return this.props.data.passengerAddMobile
    }
  }
  render () {
    return (
      <div className='passenger-add-message-input f-14 p-l-70 p-v-40 p-r-75' data-flex='dir:left'>
        <div className='p-l-20' data-flex-box='0'><span>*</span>{this.props.title}</div>
        <input className='f-14' data-flex-box='1' type={this.props.inputType} placeholder={this.props.placeholder} onChange={(event) => this.inputChange(event)} value={this.value(event)} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.get('passengerModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassengerAddInput)
