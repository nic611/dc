/**
 * Created by 张森峰 on 2017/5/9.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import L from '$i18n'

export default class PassengerAddGender extends Component {
  static propTypes = {
    passengerAddGender: PropTypes.number,
    passengerAddGenderMale: PropTypes.func,
    passengerAddGenderFemale: PropTypes.func
  }
  maleRadio = () => {
    if (this.props.passengerAddGender === 1) {
      return <div className='passenger-add-gender-icon1 p-h-10' />
    } else {
      return <div className='passenger-add-gender-icon2 p-h-10' />
    }
  }
  femaleRadio = () => {
    if (this.props.passengerAddGender === 2) {
      return <div className='passenger-add-gender-icon1 p-h-10' />
    } else {
      return <div className='passenger-add-gender-icon2 p-h-10' />
    }
  }
  render () {
    return (
      <div className='passenger-add-gender m-v-20 f-14 p-l-70 p-v-40 p-r-75' data-flex='dir:left'>
        <div className='p-h-20' data-flex-box='1'><span>*</span>{L.getString('USER_PASSENGER_ADD_GENDER')}</div>
        <div data-flex-box='0'>
          <div data-flex='dir:left' onClick={this.props.passengerAddGenderMale}>
            {this.maleRadio()}
            <div className='p-h-30 m-r-100'>{L.getString('USER_PASSENGER_ADD_GENDER_MALE')}</div>
          </div>
        </div>
        <div data-flex-box='0'>
          <div data-flex='dir:left' onClick={this.props.passengerAddGenderFemale}>
            {this.femaleRadio()}
            <div className='p-l-30'>{L.getString('USER_PASSENGER_ADD_GENDER_FEMALE')}</div>
          </div>
        </div>
      </div>
    )
  }
}
