/**
 * Created by 张森峰 on 2017/5/1.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions } from '../model/passengerModel'

import SVG from 'react-svg-inline'
import arrowLeft from '$assets/img/arrow-left.svg'
import PassengerAddInput from './PassengerAddInput'
import PassengerAddGender from './PassengerAddGender'
import viewUtils from '$assets/js/viewUtils'
import routerUtils from '$assets/js/routerUtils'

import L from '$i18n'
import '../resources/passenger.css'

class PassengerAdd extends Component {
  static propTypes = {
    appBarActions: PropTypes.object,
    data: PropTypes.object,
    actions: PropTypes.object
  }
  componentDidMount () {
    if (this.props.data.passengerAddMainViewType === 0) {
      this.props.appBarActions.changeAppBar(L.getString('USER_PASSENGER_ADD_PASSENGER'))
    } else {
      this.props.appBarActions.changeAppBar(L.getString('USER_PASSENGER_ADD_EDIT_PASSENGER'))
    }
    this.props.appBarActions.changeFooterBar(true)
  }
  documentNumberTypeChange = (v) => {
    this.props.actions.documentNumberTypeChange(v)
    this.props.actions.divHidden()
  }
  passengerAddGenderMale = () => {
    this.props.actions.passengerAddGenderMale()
  }
  passengerAddGenderFemale = () => {
    this.props.actions.passengerAddGenderFemale()
  }
  passengerAddDocumentNumberChange = (event) => {
    this.props.actions.passengerAddDocumentNumberChange(event.target.value)
  }
  addPassenger = () => {
    let data = this.props.data
    if (data.passengerAddDocumentNumber === '') {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_DOCUMENT_NUMBER_EMPTY'))
    } else if ((data.documentNumberType === 0) && !(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/).test(data.passengerAddDocumentNumber)) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_DOCUMENT_NUMBER_ERROR'))
    } else if (data.passengerAddGender === 0) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_GENDER_EMPTY'))
    } else if (data.nameCHS1 === '') {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_FAMILY_NAME_CHS_EMPTY'))
    } else if ((/[^\u4e00-\u9fa5]+/.test(data.nameCHS1)) || data.nameCHS1.length >= 20) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_FAMILY_NAME_CHS_ERROR'))
    } else if (data.nameCHS2 === '') {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_NAME_CHS_EMPTY'))
    } else if ((/[^\u4e00-\u9fa5]+/.test(data.nameCHS2)) || data.nameCHS2.length >= 20) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_NAME_CHS_ERROR'))
    } else if (data.passengerAddMobile === '') {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_MOBILE_ERROR'))
    } else if (!/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(data.passengerAddMobile)) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_MOBILE_ERROR'))
    } else if (data.nameEN1.length >= 1 && !/^[a-z]+$/i.test(data.nameEN1)) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_FAMILY_NAME_EN_ERROR'))
    } else if (data.nameEN2.length >= 1 && !/^[a-z]+$/i.test(data.nameEN2)) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_NAME_EN_ERROR'))
    } else {
      let passengerAddMessageData = {
        documentNumberType: data.documentNumberType,
        documentNum: data.passengerAddDocumentNumber,
        nameCHS1: data.nameCHS1,
        nameCHS2: data.nameCHS2,
        nameEN1: data.nameEN1,
        nameEN2: data.nameEN2,
        mobile: data.passengerAddMobile,
        gender: data.passengerAddGender,
        checkboxState: false
      }
      this.props.actions.passengerAddUnloading()
      this.props.actions.addPassenger(passengerAddMessageData)
      routerUtils.back()
    }
  }
  editPassenger = () => {
    let data = this.props.data
    if (data.passengerAddDocumentNumber === '') {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_DOCUMENT_NUMBER_EMPTY'))
    } else if ((data.documentNumberType === 0) && !(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/).test(data.passengerAddDocumentNumber)) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_DOCUMENT_NUMBER_ERROR'))
    } else if (data.passengerAddGender === 0) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_GENDER_EMPTY'))
    } else if (data.nameCHS1 === '') {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_FAMILY_NAME_CHS_EMPTY'))
    } else if ((/[^\u4e00-\u9fa5]+/.test(data.nameCHS1)) || data.nameCHS1.length >= 20) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_FAMILY_NAME_CHS_ERROR'))
    } else if (data.nameCHS2 === '') {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_NAME_CHS_EMPTY'))
    } else if ((/[^\u4e00-\u9fa5]+/.test(data.nameCHS2)) || data.nameCHS2.length >= 20) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_NAME_CHS_ERROR'))
    } else if (data.passengerAddMobile === '') {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_MOBILE_ERROR'))
    } else if (!/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(data.passengerAddMobile)) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_MOBILE_ERROR'))
    } else if (data.nameEN1.length >= 1 && !/^[a-z]+$/i.test(data.nameEN1)) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_FAMILY_NAME_EN_ERROR'))
    } else if (data.nameEN2.length >= 1 && !/^[a-z]+$/i.test(data.nameEN2)) {
      viewUtils.alert(L.getString('USER_PASSENGER_ADD_NAME_EN_ERROR'))
    } else {
      let passengerAddMessageData = {
        documentNumberType: data.documentNumberType,
        documentNum: data.passengerAddDocumentNumber,
        nameCHS1: data.nameCHS1,
        nameCHS2: data.nameCHS2,
        nameEN1: data.nameEN1,
        nameEN2: data.nameEN2,
        mobile: data.passengerAddMobile,
        gender: data.passengerAddGender,
        checkboxState: false
      }
      let passengerEditData = {}
      passengerEditData.data = passengerAddMessageData
      passengerEditData.index = this.props.data.passengerEditIndex
      this.props.actions.passengerAddUnloading()
      this.props.actions.editPassenger(passengerEditData)
      routerUtils.back()
    }
  }
  divShow = () => {
    this.props.actions.divShow()
  }
  divHidden = () => {
    this.props.actions.divHidden()
  }
  button = () => {
    if (this.props.data.passengerAddMainViewType === 0) {
      return <div className='passenger-add-button' data-flex-box='0' onClick={() => this.addPassenger()}>{L.getString('USER_PASSENGER_ADD_SAVE')}</div>
    } else {
      return <div className='passenger-add-button' data-flex-box='0' onClick={() => this.editPassenger()}>{L.getString('USER_PASSENGER_ADD_SAVE')}</div>
    }
  }
  documentTypeControl = () => {
    if (this.props.data.documentNumberChosen) {
      return (
        <div className='passenger-add-documentNumber-type-chosen f-14' data-flex='dir:top main:right' onClick={() => this.divHidden()}>
          <div onClick={() => this.documentNumberTypeChange(0)}>{L.getString('USER_PASSENGER_ADD_ID_NUMBER')}</div>
          <div onClick={() => this.documentNumberTypeChange(1)}>{L.getString('USER_PASSENGER_ADD_PASSPORT')}</div>
          <div onClick={() => this.documentNumberTypeChange(2)}>{L.getString('USER_PASSENGER_ADD_ORDER_DOCUMENT')}</div>
        </div>
      )
    }
  }
  render () {
    return (
      <div className='passenger-add' data-flex='dir:top'>
        <div className='passenger-add-documentNumber f-14 p-l-70 p-v-40 p-r-75' data-flex='dir:left'>
          <div className='passenger-add-documentNumber-type' data-flex='dir:left' data-flex-box='0' onClick={() => this.divShow()}>
            <div className='p-h-20'><span>*</span>{this.props.data.documentNumberType === 0 ? '身份证' : (this.props.data.documentNumberType === 1 ? '护照' : '其他')}</div>
            <div className='passenger-add-documentNumber-icon'>
              <SVG className='icon-50' svg={arrowLeft} />
            </div>
          </div>
          <input className='f-14' data-flex-box='1' type='text' placeholder='请输入证件号' value={this.props.data.passengerAddDocumentNumber} onChange={(event) => this.passengerAddDocumentNumberChange(event)} />
        </div>
        <PassengerAddGender passengerAddGender={this.props.data.passengerAddGender} passengerAddGenderMale={() => this.passengerAddGenderMale()} passengerAddGenderFemale={() => this.passengerAddGenderFemale()} />
        <div className='passenger-add-message' data-flex-box='1'>
          <div className='passenger-add-message-necessary'>
            {
              this.props.data.passengerAddMessageNecessary.map((item, index) => {
                return <PassengerAddInput {...item} key={'passengerAddMessageNecessary' + index} />
              })
            }
          </div>
          <div className='passenger-add-message-unnecessary'>
            {
              this.props.data.passengerAddMessageUnNecessary.map((item, index) => {
                return <PassengerAddInput {...item} key={'passengerAddMessageunNecessary' + index} />
              })
            }
          </div>
        </div>
        {this.button()}
        {this.documentTypeControl()}
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
)(PassengerAdd)
