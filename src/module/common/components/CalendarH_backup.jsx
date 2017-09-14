/**
 * Created by 熊超超 on 2017/4/27.
 */
import React, {Component} from 'react'
import Swiper from 'react-id-swiper'
import 'react-id-swiper/src/styles/css/swiper.css'
import PropTypes from 'prop-types'
import moment from '$assets/js/moment'
import '../resources/calendarH.css'
import SVG from 'react-svg-inline'
import calendar from '$assets/img/icon_calendar.svg'
import nextIcon from '$assets/img/icon_date_next.svg'
import prevIcon from '$assets/img/icon_date_prev.svg'

export default class CalendarH extends Component {
  static propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string
  }
  state = {
    startDate: moment(this.props.startDate), // 开始时间
    endDate: moment(this.props.endDate), // 结束时间
    showStartDate: moment(moment(this.props.startDate).toDate().getTime()).subtract(1, 'd'), // 实际显示的开始时间
    maxItemCount: 365, // 最多允许拥有的slider的数量
    itemCount: 0, // 实际拥有的slider数量
    disableNext: false, // 禁用右移按钮
    disablePrev: true // 禁用左移按钮
  }
  goNext = () => {
    if (this.swiper) this.swiper.slideNext()
  }
  goPrev = () => {
    if (this.swiper) this.swiper.slidePrev()
  }
  getItems = () => {
    let items = []
    let {startDate, showStartDate, maxItemCount, endDate} = {...this.state}
    // 从开始日期开始，循环生成 maxItemCount 个slider
    // 跳过开始时间之前的
    if (showStartDate.diff(startDate, 'days') < -1) {
      showStartDate = moment(moment(this.props.startDate).toDate().getTime()).subtract(1, 'd')
    }
    let data = moment(showStartDate.toDate().getTime())
    console.log(data.format('YYYY-MM-DD'))
    for (let i = 0; i < maxItemCount; i++) {
      items.push(<div key={'d' + data.toDate().getTime()} data-flex="cross:center">
        <div data-flex="dir:top cross:center" className="m-r-20">
          <span className="data">{data.format('MM-DD ddd')}</span>
          <span>990+</span>
        </div>
        <SVG svg={calendar} fill="#C93F3C" className="icon-64" />
      </div>)
      // 不能添加在结束日期之后的
      if (data.isAfter(endDate)) {
        break
      }
      data.add(1, 'd')
    }
    this.state.itemCount = items.length
    return items
  }
  prev = (activeIndex, previousIndex) => {
    if (this.state.disableNext) {
      this.swiper.unlockSwipeToNext()
      this.setState({disableNext: false})
    }
    let {showStartDate, maxItemCount, startDate} = {...this.state}
    // 当前索引是倒数第1，把向左移动禁用，防止左边出现一个空白
    if (activeIndex <= 1) {
      this.swiper.lockSwipeToPrev()
      this.setState({disablePrev: true})
    }
    // 达到一定的阈值，将开始时间前调，重新渲染出新的slider
    if (activeIndex <= 2 && Math.abs(activeIndex - previousIndex) < 2 && showStartDate.diff(startDate, 'days') > -1) {
      console.log(activeIndex)
      // 把开始日期- （maxItemCount-5)天
      this.setState({showStartDate: showStartDate.subtract(maxItemCount - 5, 'd')})
      // 重新渲染后，将activeIndex移动到正确的位置
      setTimeout(() => {
        this.swiper.slideTo(maxItemCount - 3, 0)
      }, 0)
    }
  }
  next = (activeIndex, previousIndex) => {
    if (this.state.disablePrev) {
      this.swiper.unlockSwipeToPrev()
      this.setState({disablePrev: false})
    }
    let {showStartDate, maxItemCount, itemCount} = {...this.state}
    // 当前索引是倒数第2，把向右移动禁用，防止右边出现一个空白
    if (activeIndex >= this.state.itemCount - 2) {
      this.swiper.lockSwipeToNext()
      this.setState({disableNext: true})
    }
    // 如果实际的slider数量并没有超过最多允许的数量，那么不做动态增减操作
    if (itemCount < maxItemCount) {
      return
    }
    // 达到一定的阈值，将开始时间后调，重新渲染出新的slider
    if (activeIndex >= this.state.itemCount - 3 && Math.abs(activeIndex - previousIndex) < 2) {
      this.setState({showStartDate: showStartDate.add(maxItemCount - 5, 'd')})
      setTimeout(() => {
        this.swiper.slideTo(2, 0)
      }, 0)
    }
  }
  render () {
    const params = {
      slidesPerView: 3,
      slideToClickedSlide: true,
      centeredSlides: true,
      observer: true,
      onlyExternal: true,
      initialSlide: 1,
      onInit: (swiper) => {
        this.swiper = swiper
        this.swiper.lockSwipeToPrev()
      },
      onSlidePrevStart: swiper => {
        this.prev(swiper.activeIndex, swiper.previousIndex)
      },
      onSlideNextStart: swiper => {
        this.next(swiper.activeIndex, swiper.previousIndex)
      }
    }
    return (
      <div className="calendarH">
        <div className="slider-bg">&nbsp;</div>
        <Swiper {...params}>
          {this.getItems()}
        </Swiper>
        <SVG onClick={this.goPrev} svg={prevIcon} fill="#FFFFFF"
          className={'icon-64 prevIcon' + (this.state.disablePrev ? ' disabled' : '')} />
        <SVG onClick={this.goNext} svg={nextIcon} fill="#FFFFFF"
          className={'icon-64 nextIcon' + (this.state.disableNext ? ' disabled' : '')} />
      </div>
    )
  }
}
