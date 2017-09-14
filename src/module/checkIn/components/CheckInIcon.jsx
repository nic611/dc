/**
 * Created by wq on 2017/5/17.
 */
import React, {Component} from 'react'
import viewUtils from '$assets/js/viewUtils'
import SVG from 'react-svg-inline'
import iconCheckShare from '$assets/img/icon_check_share.svg'
import iconCheckCard from '$assets/img/icon_check_card.svg'
import iconCheckWallet from '$assets/img/icon_check_wallet.svg'
import L from '$i18n'

export default class CheckInIcon extends Component {
  render () {
    return (
      <div className="success-share a-c" data-flex="cross:center main:justify">
        <div onClick={() => viewUtils.alert('正在建设中')}>
          <SVG svg={iconCheckShare} className="icon-80" fill="#ca403d" />
          <p className="m-t-35">{L.getString('CHECKIN_SHART')}</p>
        </div>
        <div onClick={() => viewUtils.alert('正在建设中')} className="m-h-100">
          <SVG svg={iconCheckCard} className="icon-80" fill="#ca403d" />
          <p className="m-t-35">{L.getString('CHECKIN_WECHAT')}</p>
        </div>
        <div onClick={() => viewUtils.alert('正在建设中')}>
          <SVG svg={iconCheckWallet} className="icon-80" fill="#ca403d" />
          <p className="m-t-35">{L.getString('CHECKIN_WALLET')}</p>
        </div>
      </div>
    )
  }
}
