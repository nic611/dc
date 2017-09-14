/**
 * Created by Administrator on 2017/4/26.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as dynamicHomeAction } from '../model/dynamicHomeModel'
import { actions as citySelectAction } from '../../common/model/citySelectorModel'
import SVG from 'react-svg-inline'
import iconFlyFrom from '$assets/img/icon_book_flyfrom.svg'
import iconFlyTo from '$assets/img/icon_book_flyto.svg'
import iconCalendar from '$assets/img/icon_book_calendar.svg'
import iconExchange from '$assets/img/icon_book_exchange.svg'
import '../resources/dynamicForm.css'
import routerUtils from '$assets/js/routerUtils'
import L from '$i18n'

class DynamicFormSite extends Component {
  static propTypes = {
    dynamicHome: PropTypes.object,
    appBarActions: PropTypes.object,
    dynamicHomeAction: PropTypes.object,
    citySelectAction: PropTypes.object
  }
  exchange = () => {
    this.props.dynamicHomeAction.exchangeCity()
  }
  selectCity = (city, flag) => {
    this.props.citySelectAction.selectToCity(city, flag)
    routerUtils.go('/citySelector/dynamic')
  }
  selectDate (flag) {
    this.props.appBarActions.changeAppBar('出发日期')
    this.props.dynamicHomeAction.selectHomeDate(flag)
    routerUtils.go('/calenderV/dynamic/start')
  }
  render () {
    return (
      <div className="f-14 book-return-item">
        <div data-flex="box:last cross:center">
          <div>
            <div data-flex="cross:center" className="m-v-30">
              <SVG svg={iconFlyFrom} className="icon-60" fill="#C93E3D" data-flex-box="0" />
              <div data-flex-box="0" className="f-16 m-h-30">{L.getString('DYNAMIC_START_CITY')}</div>
              <div data-flex-box="2" className="f-20 a-r p-b-25 p-r-25 book-city f-dark" onClick={() => this.selectCity(this.props.dynamicHome.startSite, '0')}>{this.props.dynamicHome.startSite}</div>
            </div>
            <div data-flex="cross:center" className="m-v-30">
              <SVG svg={iconFlyTo} className="icon-60" fill="#C93E3D" data-flex-box="0" />
              <div data-flex-box="0" className="f-16 m-h-30">{L.getString('DYNAMIC_END_CITY')}</div>
              <div data-flex-box="2" className="f-20 a-r p-b-25 p-r-25 book-city f-dark" onClick={() => this.selectCity(this.props.dynamicHome.endSite, '1')}>{this.props.dynamicHome.endSite}</div>
            </div>
          </div>
          <div data-flex="dir:top" data-flex-box="0" className="m-l-50" onClick={() => this.exchange()}>
            <SVG svg={iconExchange} className="icon-80" fill="#A8A8A8" />
          </div>
        </div>
        <div data-flex="cross:center" className="m-v-30">
          <SVG svg={iconCalendar} className="icon-60" fill="#C93E3D" data-flex-box="0" />
          <div data-flex-box="0" className="f-16 m-h-30">{L.getString('DYNAMIC_START_DATE')}</div>
          <div data-flex-box="2" className="f-16 a-r p-b-25 book-date p-r-25" onClick={() => this.selectDate(1)}>{this.props.dynamicHome.date}</div>
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
  dynamicHomeAction: bindActionCreators(dynamicHomeAction, dispatch),
  citySelectAction: bindActionCreators(citySelectAction, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicFormSite)
