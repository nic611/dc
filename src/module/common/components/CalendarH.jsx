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
import routerUtils from '$assets/js/routerUtils'

export default class CalendarH extends Component {
  static propTypes = {
    items: PropTypes.array,
    chooseDate: PropTypes.string
  }
  state = {
    disableNext: false, // 禁用右移按钮
    disablePrev: false, // 禁用左移按钮
    initialSlide: 1
  }
  componentWillMount () {
    const chooseDate = this.props.chooseDate
    const initialSlide = this.props.items.findIndex((item) => item.dateFormat === chooseDate) + 1
    this.setState({
      initialSlide: initialSlide
    })
  }
  goNext = () => this.swiper && this.swiper.slideNext()
  goPrev = () => this.swiper && this.swiper.slidePrev()
  prev = (activeIndex, previousIndex) => {
    if (!this.swiper) {
      return
    }
    // 向前的时候，如果向后按钮是禁用状态，则启用
    if (this.state.disableNext) {
      this.swiper.unlockSwipeToNext()
      this.setState({disableNext: false})
    }
    // 移动到第2个后，锁住向前移动
    if (activeIndex === 1) {
      this.swiper.lockSwipeToPrev()
      this.setState({disablePrev: true})
    }
  }
  next = (activeIndex, previousIndex) => {
    if (!this.swiper) {
      return
    }
    // 向后的时候，如果向前按钮是禁用状态，则启用
    if (this.state.disablePrev) {
      this.swiper.unlockSwipeToPrev()
      this.setState({disablePrev: false})
    }
    // 移动到倒数第2个后，锁住向后移动
    if (activeIndex === this.count - 2) {
      this.swiper.lockSwipeToNext()
      this.setState({disableNext: true})
    }
  }
  clickCalender (type) {
    if (!this.swiper.animating) { // 只有在滑动动画介绍的时候点击才会跳转
      routerUtils.go('/calenderV/book/' + type)
    }
  }
  getItems = () => {
    const showItem = [{dateFormat: '', lowestPrice: ''}, ...this.props.items, {dateFormat: '', lowestPrice: ''}]
    this.count = showItem.length
    return showItem.map((item, i) => <div key={'slider-' + i} data-flex="cross:center">
      <div data-flex="dir:top cross:center" className="m-r-20">
        <span className="data">{moment(item.dateFormat).format('MM-DD ddd')}</span>
        <span className="text-prev">上一天</span>
        <span className="text-next">下一天</span>
        <span>{item.lowestPrice ? '￥' + item.lowestPrice : null}</span>
      </div>
      <div onClick={() => this.clickCalender('start')}>
        <SVG svg={calendar} fill="#C93F3C" className="icon-64" />
      </div>
    </div>)
  }
  render () {
    const params = {
      slidesPerView: 3,
      slideToClickedSlide: true,
      centeredSlides: true,
      observer: true,
      onlyExternal: true,
      initialSlide: this.state.initialSlide,
      onInit: (swiper) => {
        this.swiper = swiper
        if (this.state.initialSlide <= 1) {
          this.swiper.lockSwipeToPrev()
          this.setState({disablePrev: true})
        }
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
