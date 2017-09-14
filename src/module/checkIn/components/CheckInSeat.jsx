/**
 * Created by 萝卜君 on 2017/5/12.
 */
import React, {Component} from 'react'
import SVG from 'react-svg-inline'
import iconCheckSiteCould from '$assets/img/icon_check_site_could.svg'
import iconCheckSiteDo from '$assets/img/icon_check_site_do.svg'
import iconCheckSiteDid from '$assets/img/icon_check_site_did.svg'
import iconCheckSiteNot from '$assets/img/icon_check_site_cannot.svg'
import L from '$i18n'

export default class CheckInSeat extends Component {
  render () {
    return (
      <div className="p-t-45 p-b-45 p-h-20 f-10" data-flex="cross:center main:justify">
        <div data-flex="cross:center">
          <SVG svg={iconCheckSiteCould} className="icon-50 m-r-10" fill="#8e8e8e" />
          <span>{L.getString('CHECKIN_SEAT_COULD')}</span>
        </div>
        <div data-flex="cross:center">
          <SVG svg={iconCheckSiteDo} className="icon-50 m-r-10" fill="#e0b832" />
          <span>{L.getString('CHECKIN_SEAT_DO')}</span>
        </div>
        <div data-flex="cross:center">
          <SVG svg={iconCheckSiteDid} className="icon-50 m-r-10" fill="#ca403d" />
          <span>{L.getString('CHECKIN_SEAT_DID')}</span>
        </div>
        <div data-flex="cross:center">
          <SVG svg={iconCheckSiteNot} className="icon-50 m-r-10" fill="#8e8e8e" />
          <span>{L.getString('CHECKIN_SEAT_NOT')}</span>
        </div>
      </div>
    )
  }
}
