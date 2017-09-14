/**
 * Created by 熊超超 on 2017/4/28.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import moment from '$assets/js/moment'
import '../resources/calenderV.css'
import { actions } from '$common/model/commonModel'
import { actions as dynamicHomeActions } from '../../dynamic/model/dynamicHomeModel'
import { actions as bookCityActions } from '../../book/model/flightModel'
import { actions as appBarActions } from '$common/model/appBarModel'
import routerUtils from '$assets/js/routerUtils'

class CalendarV extends Component {
  static propTypes = {
    appBarActions: PropTypes.object,
    priceCalendar: PropTypes.array,
    calendar: PropTypes.object,
    actions: PropTypes.object,
    bookCityActions: PropTypes.object,
    dynamicHomeActions: PropTypes.object,
    params: PropTypes.object
  }
  state = {
    months: this.initDate(),
    holidays: this.props.calendar.holidays
  }
  componentWillMount () {
    this.props.appBarActions.changeFooterBar(true)
  }
  initDate () {
    // 将价格和指定范围的日历组合
    let groups = [] // 月份组
    let group = {y: '', m: ''}
    let priceCalendar = this.props.priceCalendar
    const today = moment() // 今天
    let priceFirst = moment()
    let priceLast = moment()
    if (priceCalendar.length > 0) {
      priceFirst = moment(priceCalendar[0].dateFormat) // 价格日历的最早一天
      priceLast = moment(priceCalendar[priceCalendar.length - 1].dateFormat) // 价格日历的最后一天
    }
    console.log(priceFirst)
    console.log(priceLast)
    let start = moment(today.toDate()).set('date', 1).add(1, 'M')
    let end = moment(start.toDate()).add(this.props.calendar.verticalRange, 'y')
    // 计算 价格日历的最早一天 与 日历的第一天的差距
    let diff = Math.max(priceFirst.diff(start, 'days'), 0)
    // 填充价格日历前面天数
    for (let i = 0; i <= diff; i++) {
      let item = {
        date: start.format('YYYY-MM-DD'),
        y: start.get('year'),
        m: start.get('month') + 1,
        d: start.get('date'),
        w: start.weekday(),
        disabled: start.isBefore(today),
        price: ''
      }
      if (item.m !== group.m) {
        groups.push(group)
        group = {
          m: item.m,
          y: item.y,
          items: [item]
        }
      } else {
        group.items.push(item)
      }
      start.add(1, 'd')
    }
    // 填充价格日历
    priceCalendar.forEach(item => {
      item = {
        date: moment(item.dateFormat).format('YYYY-MM-DD'),
        y: moment(item.dateFormat).get('year'),
        m: moment(item.dateFormat).get('month') + 1,
        d: moment(item.dateFormat).get('date'),
        w: moment(item.dateFormat).weekday(),
        disabled: false,
        price: item.lowestPrice
      }
      if (item.m !== group.m) {
        groups.push(group)
        group = {
          m: item.m,
          y: item.y,
          items: [item]
        }
      } else {
        group.items.push(item)
      }
    })
    // 填充价格日历后面的天数
    start = priceLast
    start.add(1, 'd')
    while (end.isAfter(start)) {
      let item = {
        date: start.format('YYYY-MM-DD'),
        y: start.get('year'),
        m: start.get('month') + 1,
        d: start.get('date'),
        w: start.weekday(),
        disabled: false,
        price: ''
      }
      if (item.m !== group.m) {
        groups.push(group)
        group = {
          m: item.m,
          y: item.y,
          items: [item]
        }
      } else {
        group.items.push(item)
      }
      start.add(1, 'd')
    }
    groups.splice(0, 1)
    return groups
  }
  clickDay (day) {
    if (!day.disabled) {
      // console.log(day)
      this.props.actions.calendarActiveData(day.date)
      // todo 临时方法
      window.$store.dispatch({type: 'changePriceCalendar', date: day.date})
    }
  }
  calendarSelected = () => {
    const {view, type} = {...this.props.params}
    if (view === 'book') {
      this.props.bookCityActions.calendarSelectedDay(this.props.calendar, type)
    } else if (view === 'dynamic') {
      this.props.dynamicHomeActions.calendarSelectedDynamicDay(this.props.calendar)
    }
    routerUtils.back()
  }
  getDayLayout (days) {
    // 计算最低价
    let lowest = null
    const ps = days.filter(d => d.price).map(d => d.price)
    if (ps.length > 0) {
      lowest = Math.min.apply(null, ps) + ''
    }
    // 按星期在前面补空位
    let firstWeek = days[0].w
    for (let i = 0; i < firstWeek; i++) {
      days.unshift({placeholder: true})
    }
    return days.map((d, i) => d.placeholder
      ? <span key={'ph-' + Math.random()} className="dayBlock placeholder">&nbsp;</span>
      : <span onClick={() => this.clickDay(d)} key={'d-' + Math.random()} className={'dayBlock' + (lowest && lowest === d.price ? ' lowest' : '')}>
        {this.state.holidays[d.date] ? <span className="holidays">{this.state.holidays[d.date]}</span> : <span className="holidays">&nbsp;</span>}
        <span className={'day' + (d.disabled ? ' disabled' : '') + (d.date === this.props.calendar.activeData ? ' active' : '')}>{d.d}</span>
        {d.price
          ? <span className="price">{'￥' + d.price}</span>
          : <span className="price">&nbsp;</span>}
      </span>)
  }
  getMonthLayout () {
    return this.state.months.map((m, i) => <div className="month p-h-60" key={'m-' + i}>
      <div className="title p-v-20"><span className="m">{m.m}</span>月{m.y}年</div>
      <div className="monthData">
        { this.getDayLayout(m.items) }
      </div>
    </div>)
  }
  getWeekLayout () {
    let [...weeks] = '一二三四五六日'
    return weeks.map((item, i) => <span key={'week' + i}>{item}</span>)
  }

  render () {
    return (
      <div className="calenderV">
        <div className="weeks">
          <div className="p-h-60" data-flex="cross:center box:mean">
            {this.getWeekLayout()}
          </div>
        </div>
        <div className="data">
          {this.getMonthLayout()}
        </div>
        <div className="btn btn-fixed" onClick={this.calendarSelected}>确认</div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  flightModel: state.get('flightModel').toJS(),
  calendar: state.getIn(['commonModel', 'calendar']).toJS(),
  priceCalendar: state.getIn(['flightModel', 'priceCalendar']).toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  actions: bindActionCreators(actions, dispatch),
  bookCityActions: bindActionCreators(bookCityActions, dispatch),
  dynamicHomeActions: bindActionCreators(dynamicHomeActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarV)
