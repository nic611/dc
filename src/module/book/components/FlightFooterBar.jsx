/**
 * Created by 张森峰 on 2017/5/9.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SVG from 'react-svg-inline'
import flightIconDynamics from '$assets/img/iconDynamics.svg'
import flightIconSearch from '$assets/img/icon_book_search.svg'
import flightIconPrice from '$assets/img/icon_check_wallet.svg'

export default class FlightFooterBar extends Component {
  static propTypes = {
    footerBarOnClick1: PropTypes.func,
    footerBarOnClick2: PropTypes.func,
    footerBarOnClick3: PropTypes.func
  }
  render () {
    return (
      <div className='flight-footbar' data-flex='dir:left'>
        <div data-flex-box='1' data-flex='dir:top main:center cross:center' onClick={() => this.props.footerBarOnClick1()}>
          {/* 未找到ui图上的svg，故用另一svg代替 */}
          <div>
            <SVG svg={flightIconPrice} className='icon-70' fill='#ffffff' />
          </div>
          <div className='f-13 p-l-20'>价格↓</div>
        </div>
        <div data-flex-box='1' data-flex='dir:top main:center cross:center' onClick={() => this.props.footerBarOnClick2()}>
          <div>
            <SVG svg={flightIconDynamics} className='icon-70' fill='#ffffff' />
          </div>
          <div className='f-13'>时间</div>
        </div>
        <div data-flex-box='1' data-flex='dir:top main:center cross:center' onClick={() => this.props.footerBarOnClick3()}>
          {/* 未找到ui图上的svg，故用另一svg代替 */}
          <div>
            <SVG svg={flightIconSearch} className='icon-70' fill='#ffffff' />
          </div>
          <div className='f-13'>筛选</div>
        </div>
      </div>
    )
  }
}
