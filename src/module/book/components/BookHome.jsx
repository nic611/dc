/**
 * Created by 熊超超 on 2017/4/23.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as flightModelAction } from '../model/flightModel'
import { actions as citySelectAction } from '../../common/model/citySelectorModel'
import Tabs from '$base/tabs'
import BookForm from './BookForm'
import BookReturn from './BookReturn'
import BookMulti from './BookMulti'
import BookHistory from './BookHistory'
import '../resources/bookHome.css'
import iconBookSearch from '$assets/img/icon_book_search.svg'
import Btn from '$base/btn'
import routerUtils from '$assets/js/routerUtils'
import viewUtils from '$assets/js/viewUtils'
import L from '$i18n'

class BookHome extends Component {
  static propTypes = {
    appBarActions: PropTypes.object,
    flightModel: PropTypes.object,
    swapCity: PropTypes.func,
    swapCabin: PropTypes.func,
    flightModelAction: PropTypes.object,
    citySelectAction: PropTypes.object
  }
  componentWillMount () {
    this.props.appBarActions.changeAppBar('机票预订', true)
    this.props.appBarActions.changeFooterBar(false)
    this.props.flightModelAction.getFlightDate(this.props.flightModel)
  }
  swapCabin () {
    this.props.swapCabin()
  }
  swapCity = () => {
    this.props.swapCity()
  }
  selectCity = (city, code, flag) => {
    this.props.flightModelAction.selectCity(city, code, flag)
    this.props.citySelectAction.selectToCity(city, flag)
    routerUtils.go('/citySelector/book')
  }
  bookDate = (type) => {
    this.props.appBarActions.changeAppBar(type === 'start' ? '出发日期' : '返回日期')
    routerUtils.go('/calenderV/book/' + type)
  }
  handleAfter = (selectedIndex, $selectedPanel, $selectedTabMenu) => {
    this.props.flightModelAction.changeTripType(selectedIndex)
  }
  toFlightView = () => {
    routerUtils.go('/flight/start')
  }
  toFlightStartView = () => {
    const startDate = this.props.flightModel.flightStartDate
    const backDate = this.props.flightModel.flightBackDate
    const startYear = startDate.substr(startDate.length - 5, 4)
    const startDay = startDate.substr(startDate.length - 9, 2)
    const startMonth = startDate.substr(0, startDate.length - 10)
    const backYear = backDate.substr(backDate.length - 5, 4)
    const backDay = backDate.substr(backDate.length - 9, 2)
    const backMonth = backDate.substr(0, backDate.length - 10)
    if (startYear > backYear) {
      viewUtils.alert(L.getString('出发日期不得晚于返回日期'))
    } else if (startYear === backYear) {
      if (startMonth > backMonth) {
        viewUtils.alert(L.getString('出发日期不得晚于返回日期'))
      } else if (startMonth === backMonth) {
        if (startDay > backDay) {
          viewUtils.alert(L.getString('出发日期不得晚于返回日期'))
        } else {
          routerUtils.go('/flight/start')
        }
      } else {
        routerUtils.go('/flight/start')
      }
    } else {
      routerUtils.go('/flight/start')
    }
  }
  render () {
    return (
      <div className="book-bg">
        <div className="m-h-50 p-t-80 br-15 f-16">
          <Tabs className="tab-order" tabActive={this.props.flightModel.tripType} onAfterChange={this.handleAfter}>
            <Tabs.Panel title='单程'>
              <div className="bg-opacity tab-bottom p-h-40 p-v-10">
                <BookForm ref="single" bookDate={() => this.bookDate('start')} changeAppBar={this.props.appBarActions.changeAppBar} selectCity={this.selectCity} swapCity={this.props.flightModelAction.swapCity} swapCabin={this.props.flightModelAction.swapCabin} depName={this.props.flightModel.depName} depCode={this.props.flightModel.depCode} arrName={this.props.flightModel.arrName} arrCode={this.props.flightModel.arrCode} childCount={this.props.flightModel.childCount} adultCount={this.props.flightModel.adultCount} flightDate={this.props.flightModel.flightDate} flightStartDate={this.props.flightModel.flightStartDate} cabin={this.props.flightModel.cabinC} />
              </div>
              <div className="m-v-55">
                <Btn title="查询机票" icon={iconBookSearch} fill="#FFFFFF" action={() => this.toFlightView()} />
              </div>
            </Tabs.Panel>
            <Tabs.Panel title='往返'>
              <div className="bg-opacity tab-bottom p-h-40 p-v-10">
                <BookReturn ref="return" bookDate={() => this.bookDate('start')} bookDateReturn={() => this.bookDate('return')} changeAppBar={this.props.appBarActions.changeAppBar} selectCity={this.selectCity} swapCity={this.props.flightModelAction.swapCity} swapCabin={this.props.flightModelAction.swapCabin} depName={this.props.flightModel.depName} depCode={this.props.flightModel.depCode} arrName={this.props.flightModel.arrName} arrCode={this.props.flightModel.arrCode} childCount={this.props.flightModel.childCount} adultCount={this.props.flightModel.adultCount} flightDate={this.props.flightModel.flightDate} flightStartDate={this.props.flightModel.flightStartDate} flightBackDate={this.props.flightModel.flightBackDate} cabin={this.props.flightModel.cabinC} />
              </div>
              <div className="m-v-55">
                <Btn title="查询机票" icon={iconBookSearch} fill="#FFFFFF" action={() => this.toFlightStartView()} />
              </div>
            </Tabs.Panel>
            <Tabs.Panel title='多程'>
              <div className="bg-opacity tab-bottom p-h-40 p-v-10">
                <BookMulti ref="multi" />
              </div>
            </Tabs.Panel>
            <Tabs.Panel title='历史'>
              <div className="bg-opacity tab-bottom p-h-40 p-v-10">
                <BookHistory ref="history" />
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  flightModel: state.get('flightModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  flightModelAction: bindActionCreators(flightModelAction, dispatch),
  citySelectAction: bindActionCreators(citySelectAction, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookHome)
