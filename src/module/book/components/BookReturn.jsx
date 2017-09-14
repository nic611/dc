/**
 * Created by nic on 2017/4/27.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-svg-inline'
import iconBookFlyFrom from '$assets/img/icon_book_flyfrom.svg'
import iconBookFlyTo from '$assets/img/icon_book_flyto.svg'
import iconBookCalendar from '$assets/img/icon_book_calendar.svg'
import iconBookPickMan from '$assets/img/icon_book_pickman.svg'
import iconBookMan from '$assets/img/icon_book_man.svg'
import iconBookBaby from '$assets/img/icon_book_baby.svg'
import iconBookCabin from '$assets/img/icon_book_cabin.svg'
import iconBookExchange from '$assets/img/icon_book_exchange.svg'
import '../resources/bookReturn.css'
import BookPassenger from './BookPassenger'
import viewUtils from '$assets/js/viewUtils'

export default class BookReturn extends Component {
  static propTypes = {
    swapCity: PropTypes.func,
    swapCabin: PropTypes.func,
    selectCity: PropTypes.func,
    depName: PropTypes.string,
    depCode: PropTypes.string,
    arrName: PropTypes.string,
    arrCode: PropTypes.string,
    flightStartDate: PropTypes.string,
    flightBackDate: PropTypes.string,
    adultCount: PropTypes.number,
    childCount: PropTypes.number,
    cabin: PropTypes.string,
    bookDate: PropTypes.func,
    bookDateReturn: PropTypes.func
  }
  render () {
    return (
      <div className="f-14 book-return-item">
        <div data-flex="box:last cross:center">
          <div>
            <div data-flex="cross:center" className="m-v-30">
              <SVG svg={iconBookFlyFrom} className="icon-60" fill="#C93E3D" data-flex-box="0" />
              <div data-flex-box="0" className="f-16 m-h-30">出发城市</div>
              <div data-flex-box="2" className="f-20 a-r p-b-30 p-r-50 book-city" onClick={() => this.props.selectCity(this.props.depName, this.props.depCode, 0)}>{this.props.depName}</div>
            </div>
            <div data-flex="cross:center" className="m-v-30">
              <SVG svg={iconBookFlyTo} className="icon-60" fill="#C93E3D" data-flex-box="0" />
              <div data-flex-box="0" className="f-16 m-h-30">到达城市</div>
              <div data-flex-box="2" className="f-20 a-r p-b-30 p-r-50 book-city" onClick={() => this.props.selectCity(this.props.arrName, this.props.arrCode, 1)}>{this.props.arrName}</div>
            </div>
          </div>
          <div data-flex="dir:top" data-flex-box="0" className="m-l-50">
            <SVG svg={iconBookExchange} className="icon-80" fill="#A8A8A8" onClick={() => this.props.swapCity()} />
          </div>
        </div>
        <div data-flex="cross:center" className="m-v-30">
          <SVG svg={iconBookCalendar} className="icon-60" fill="#C93E3D" data-flex-box="0" />
          <div data-flex-box="0" className="f-16 m-h-30">出发日期</div>
          <div data-flex-box="2" className="f-18 a-r p-b-25 book-date p-r-25" onClick={this.props.bookDate}>{this.props.flightStartDate}</div>
        </div>
        <div data-flex="cross:center" className="m-v-30">
          <div data-flex-box="0" className="f-16 m-l-90 m-r-30">返回日期</div>
          <div data-flex-box="2" className="f-18 a-r p-b-25 book-date p-r-25" onClick={() => this.props.bookDateReturn()}>{this.props.flightBackDate}</div>
        </div>
        <div data-flex="cross:center" >
          <div data-flex-box="0" data-flex="cross:center" className="book-date p-b-45 m-r-50" onClick={() => viewUtils.dock(<BookPassenger />)}>
            <SVG svg={iconBookPickMan} className="icon-60" fill="#C93E3D" data-flex-box="0" />
            <div data-flex-box="0" data-flex="main:center" className="f-16 m-h-30">
              <span className="m-h-15"><span className="c-accent m-r-10">{this.props.adultCount}</span>位成人</span>
              <span className="m-h-15"><span className="c-accent m-r-10">{this.props.childCount}</span>位儿童</span>
            </div>
          </div>
          <div data-flex-box="1" data-flex="main:center cross:center" className="book-date p-b-30 f-16" onClick={() => viewUtils.dock(<BookPassenger />)}>
            <SVG svg={iconBookMan} className="icon-80" fill="#4A3931" />
            <span>{this.props.adultCount}</span>
            <SVG svg={iconBookBaby} className="icon-80" fill="#4A3931" />
            <span>{this.props.childCount}</span>
          </div>
        </div>
        <div data-flex="cross:center">
          <SVG svg={iconBookCabin} className="icon-60 " fill="#C93E3D" data-flex-box="0" />
          <div data-flex-box="1" className="f-16 m-h-30">舱位选择</div>
          <div onClick={() => this.props.swapCabin()} data-flex-box="1" data-flex="main:center cross:center" className="f-18 p-b-25 book-cabin">{this.props.cabin}</div>
        </div>
      </div>
    )
  }
}
