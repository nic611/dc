/**
 * Created by nic on 2017/4/27.
 */
import React, {Component} from 'react'
import SVG from 'react-svg-inline'
import iconBookFlyFrom from '$assets/img/icon_book_flyfrom.svg'
import iconBookFlyTo from '$assets/img/icon_book_flyto.svg'
import iconBookCalendar from '$assets/img/icon_book_calendar.svg'
import iconBookPickMan from '$assets/img/icon_book_pickman.svg'
import iconBookMan from '$assets/img/icon_book_man.svg'
import iconBookBaby from '$assets/img/icon_book_baby.svg'
import iconBookCabin from '$assets/img/icon_book_cabin.svg'
import iconBookExchange from '$assets/img/icon_book_exchange.svg'
import '../resources/bookHistory.css'
import routerUtils from '$assets/js/routerUtils'

export default class BookForm extends Component {
  state = {
    city: 'a'
  }
  getData () {
    return this.state
  }
  render () {
    return (
      <div data-flex="main:center cross:center" className="m-v-100">
        功能建设中
        <div className="f-14 book-history-item" style={{'display': 'none'}}>
          <div data-flex="box:last cross:center">
            <div>
              <div data-flex="cross:center" className="m-v-30">
                <SVG svg={iconBookFlyFrom} className="icon-60" fill="#C93E3D" data-flex-box="0" />
                <div data-flex-box="0" className="f-16 m-h-30">出发城市</div>
                <div data-flex-box="2" className="f-20 a-r p-b-30 p-r-50 book-city" onClick={() => routerUtils.go('/citySelector')}>北京</div>
              </div>
              <div data-flex="cross:center" className="m-v-30">
                <SVG svg={iconBookFlyTo} className="icon-60" fill="#C93E3D" data-flex-box="0" />
                <div data-flex-box="0" className="f-16 m-h-30">到达城市</div>
                <div data-flex-box="2" className="f-20 a-r p-b-30 p-r-50 book-city" onClick={() => routerUtils.go('/citySelector')}>伦敦</div>
              </div>
            </div>
            <div data-flex="dir:top" data-flex-box="0" className="m-l-50">
              <SVG svg={iconBookExchange} className="icon-80" fill="#A8A8A8" />
            </div>
          </div>
          <div data-flex="cross:center" className="m-v-30">
            <SVG svg={iconBookCalendar} className="icon-60" fill="#C93E3D" data-flex-box="0" />
            <div data-flex-box="0" className="f-16 m-h-30">出发日期</div>
            <div data-flex-box="2" className="f-18 a-r p-b-25 book-date p-r-25">5月15日2016</div>
          </div>
          <div data-flex="cross:center" >
            <div data-flex-box="0" data-flex="cross:center" className="book-date p-b-45 m-r-50">
              <SVG svg={iconBookPickMan} className="icon-60" fill="#C93E3D" data-flex-box="0" />
              <div data-flex-box="0" data-flex="main:center" className="f-16 m-h-30">
                <span className="m-h-15"><span className="c-accent m-r-10">1</span>位成人</span>
                <span className="m-h-15"><span className="c-accent m-r-10">0</span>位儿童</span>
              </div>
            </div>
            <div data-flex-box="1" data-flex="main:center cross:center" className="book-date p-b-30 f-16">
              <SVG svg={iconBookMan} className="icon-80" fill="#4A3931" />
              <span>1</span>
              <SVG svg={iconBookBaby} className="icon-80" fill="#4A3931" />
              <span>0</span>
            </div>
          </div>
          <div data-flex="cross:center">
            <SVG svg={iconBookCabin} className="icon-60 " fill="#C93E3D" data-flex-box="0" />
            <div data-flex-box="1" className="m-h-30">舱位选择</div>
            <div data-flex-box="1" data-flex="main:center cross:center" className="f-18 p-b-25 book-cabin">经济舱</div>
          </div>
        </div>
      </div>
    )
  }
}
