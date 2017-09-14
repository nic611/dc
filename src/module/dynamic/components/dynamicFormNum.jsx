/**
 * Created by Administrator on 2017/4/24.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as dynamicHomeAction } from '../model/dynamicHomeModel'
import SVG from 'react-svg-inline'
import iconFlyFrom from '$assets/img/icon_book_flyfrom.svg'
import iconCalendar from '$assets/img/icon_book_calendar.svg'
import '../resources/dynamicForm.css'
import routerUtils from '$assets/js/routerUtils'
import L from '$i18n'

class DynamicFormNum extends Component {
  static propTypes = {
    dynamicHome: PropTypes.object,
    appBarActions: PropTypes.object,
    dynamicHomeAction: PropTypes.object
  }
  selectDate (flag) {
    this.props.appBarActions.changeAppBar('出发日期')
    this.props.dynamicHomeAction.selectHomeDate(flag)
    routerUtils.go('/calenderV/dynamic/start')
  }
  render () {
    return (
      <div className="f-14 book-return-item">
        <div className="m-v-30" data-flex="cross:center main:justify">
          <SVG svg={iconFlyFrom} className="icon-60" fill="#C93E3D" />
          <div data-flex-box="0" className="f-16 m-h-30 num-item-l">{L.getString('DYNAMIC_FLIGHT')}</div>
          <div data-flex-box="2" className="a-r p-b-25 p-r-25 book-city">
            <input value={this.props.dynamicHome.flight} onChange={(e) => this.props.dynamicHomeAction.handleChange(e.target.value)} className="d-input f-16 a-r" type="text" placeholder="如 GY1980" />
          </div>
        </div>
        <div className="num-item" data-flex="cross:center main:justify">
          <SVG svg={iconCalendar} className="icon-60" fill="#C93E3D" data-flex-box="0" />
          <div data-flex-box="0" className="f-16 m-h-30 num-item-l">{L.getString('DYNAMIC_START_DATE')}</div>
          <div data-flex-box="2" className="f-16 a-r p-b-25 p-r-25 book-city f-dark" onClick={() => this.selectDate(2)}>{this.props.dynamicHome.date}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dynamicHome: state.get('dynamicHomeModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  dynamicHomeAction: bindActionCreators(dynamicHomeAction, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicFormNum)
