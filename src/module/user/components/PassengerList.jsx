/**
 * Created by 张森峰 on 2017/4/24.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../model/passengerModel'
import { actions as flightActions } from '../../book/model/flightModel'

import SVG from 'react-svg-inline'
import checkboxSelected from '$assets/img/checkbox-selected.svg'
import arrowLeft from '$assets/img/arrow-left.svg'
import routerUtils from '$assets/js/routerUtils'

class PassengerList extends Component {
  static propTypes = {
    actions: PropTypes.object,
    flightActions: PropTypes.object,
    data: PropTypes.object,
    selected: PropTypes.number,
    documentNumberType: PropTypes.number,
    nameCHS1: PropTypes.string,
    nameCHS2: PropTypes.string,
    nameEN1: PropTypes.string,
    nameEN2: PropTypes.string,
    mobile: PropTypes.string,
    gender: PropTypes.number,
    documentNum: PropTypes.string,
    checkboxState: PropTypes.bool,
    index: PropTypes.number,
    passengerAddMessageDeleteState: PropTypes.bool
  }
  passengerCheckboxStateChange = () => {
    let index = this.props.index
    this.props.actions.passengerCheckboxStateChange(index)
  }
  passengerAdd () {
    this.props.flightActions.flightPassengerAdd(this.props)
    routerUtils.back()
  }
  toPassengerAddView = () => {
    let data = {}
    this.props.actions.passengerAddMainViewTypeChange(1)
    data.documentNumberType = this.props.documentNumberType
    data.documentNum = this.props.documentNum
    data.nameCHS1 = this.props.nameCHS1
    data.nameCHS2 = this.props.nameCHS2
    data.nameEN1 = this.props.nameEN1
    data.nameEN2 = this.props.nameEN2
    data.mobile = this.props.mobile
    data.gender = this.props.gender
    data.index = this.props.index
    this.props.actions.toPassengerAddView(data)
    routerUtils.go('passengerAdd')
  }
  checkbox = () => {
    if (this.props.data.passengerAddMessageDeleteState) {
      if (this.props.checkboxState) {
        return (
          <div className='passenger-list-del m-r-55' data-flex='dir:left main:center cross:center' data-flex-box='0'>
            <SVG className='passenger-list-del-selected icon-60' fill='#adadad' svg={checkboxSelected} onClick={() => this.passengerCheckboxStateChange()} />
          </div>
        )
      } else {
        return (
          <div className='passenger-list-del m-r-55' data-flex='dir:left main:center cross:center' data-flex-box='0'>
            <div className='passenger-list-del-unselected' onClick={() => this.passengerCheckboxStateChange()} />
          </div>
        )
      }
    }
  }
  icon = () => {
    if (!this.props.data.passengerAddMessageDeleteState) {
      return (
        <div className='passenger-list-body-icon' data-flex-box='0' onClick={() => this.toPassengerAddView()}>
          <SVG svg={arrowLeft} fill='#adadad' className='icon-100' />
        </div>
      )
    }
  }
  render () {
    return (
      <div className={'passenger-list p-l-90 p-r-60 m-v-5' + (this.props.selected === 1 ? ' hidden' : '')} data-flex='dir:left'>
        {this.checkbox()}
        <div className='passenger-list-text' data-flex-box='1'>
          <div className='passenger-list-name p-t-60 p-b-40 f-18' onClick={() => ((this.props.data.passengerComeFrom === 'bookAccount') ? this.passengerAdd() : this.toPassengerAddView())}>{this.props.nameCHS1}{this.props.nameCHS2} {this.props.nameEN1}{(this.props.nameEN1 === '' || this.props.nameEN2 === '') ? <span>&nbsp;</span> : <span>/</span>}{this.props.nameEN2}</div>
          <div className='passenger-list-body' data-flex='dir:left'>
            <div className='f-14 p-t-10 p-b-40' data-flex='dir:left' data-flex-box='1' onClick={() => ((this.props.data.passengerComeFrom === 'bookAccount') ? this.passengerAdd() : this.toPassengerAddView())}>
              <div data-flex='dir:top'>
                <div className='f-14 p-r-40 p-v-10'>手机号</div>
                <div className='f-14 p-r-40 p-v-10'>{this.props.documentNumberType === 0 ? '身份证' : (this.props.documentNumberType === 1 ? '护照' : '其他')}</div>
              </div>
              <div data-flex='dir:top'>
                <div className='f-14 p-l-40 p-v-10'>{this.props.mobile}</div>
                <div className='f-14 p-l-40 p-v-10'>{this.props.documentNum}</div>
              </div>
            </div>
            {this.icon()}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.get('passengerModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  flightActions: bindActionCreators(flightActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassengerList)
