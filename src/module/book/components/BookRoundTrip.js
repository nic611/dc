/**
 * Created by Administrator on 2017/5/8.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-svg-inline'
import iconFromTo from '$assets/img/icon_check_fromto.svg'
import '../resources/bookAccount.css'

export default class BookRoundTrip extends Component {
  static propTypes = {
    from: PropTypes.string,
    to: PropTypes.string,
    tripType: PropTypes.number,
    dataGo: PropTypes.array,
    dataReturn: PropTypes.array
  }
  render () {
    return (
      <div className="f-14">
        <div className="p-h-55 account-one">
          <div className="account-oneT" data-flex="cross:center main:justify">
            <p data-flex-box="0" className="m-r-30">去<br />程</p>
            <div data-flex-box="1" data-flex="cross:center main:justify">
              <div data-flex-box='1'>
                <p className="f-16">{this.props.from}</p>
                <p className='f-12'>{this.props.dataGo[0].salesDepartureVO.date}</p>
                <p>{this.props.dataGo[0].salesDepartureVO.time.substring(0, 2)}:{this.props.dataGo[0].salesDepartureVO.time.substring(2, 4)}</p>
              </div>
              <div className="p-h-10 account-oneT-m" data-flex-box='0'>
                <p className="account-oneT-mp1 f-12">{this.props.dataGo[0].salesCarrierVO.flightNumber}</p>
                <SVG svg={iconFromTo} className="icon-from-to" fill="#ffffff" />
                <p className="account-oneT-mp2 f-12">机型{this.props.dataGo[0].salesEquipmentVO.code}</p>
              </div>
              <div className="a-r" data-flex-box='1'>
                <p className="f-16">{this.props.to}</p>
                <p className='f-12'>{this.props.dataGo[0].salesArrivalVO.date}</p>
                <p>{this.props.dataGo[0].salesArrivalVO.time.substring(0, 2)}:{this.props.dataGo[0].salesArrivalVO.time.substring(2, 4)}</p>
              </div>
            </div>
          </div>
          <div className="account-oneT" data-flex="cross:center main:justify" style={{display: this.props.tripType === 2 ? 'flex' : 'none'}}>
            <p data-flex-box="0" className="m-r-40">回<br />程</p>
            <div data-flex-box="1" data-flex="cross:center main:justify">
              <div>
                <p className="f-16">{this.props.to}</p>
                <p className='f-12'>{this.props.dataReturn[0].salesDepartureVO.date}</p>
                <p>{this.props.dataReturn[0].salesDepartureVO.time.substring(0, 2)}:{this.props.dataReturn[0].salesDepartureVO.time.substring(2, 4)}</p>
              </div>
              <div className="p-h-10 account-oneT-m">
                <p className="account-oneT-mp1 f-12">{this.props.dataReturn[0].salesCarrierVO.flightNumber}</p>
                <SVG svg={iconFromTo} className="icon-from-to" fill="#ffffff" />
                <p className="account-oneT-mp2 f-12">机型{this.props.dataReturn[0].salesEquipmentVO.code}</p>
              </div>
              <div className="a-r">
                <p className="f-16">{this.props.from}</p>
                <p className='f-12'>{this.props.dataReturn[0].salesArrivalVO.date}</p>
                <p>{this.props.dataReturn[0].salesArrivalVO.time.substring(0, 2)}:{this.props.dataReturn[0].salesArrivalVO.time.substring(2, 4)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
