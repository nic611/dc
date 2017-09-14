/**
 * Created by wq on 2017/5/17.
 */
import React, {Component} from 'react'
import SVG from 'react-svg-inline'
import iconCheckSuccess from '$assets/img/icon_check_success.svg'

export default class CheckInCongratulation extends Component {
  render () {
    return (
      <div className="p-v-100 f-14" data-flex="cross:center main:center">
        <SVG svg={iconCheckSuccess} className="icon-80 m-r-60" fill="#ca403d" />
        <p className="pHeight">恭喜您值机成功，<br />祝您旅途愉快！</p>
      </div>
    )
  }
}
