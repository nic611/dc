/**
 * Created by wq on 2017/5/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-svg-inline'
import iconCheckSiteCould from '$assets/img/icon_check_site_could.svg'
import iconCheckSiteDo from '$assets/img/icon_check_site_do.svg'
import iconCheckSiteDid from '$assets/img/icon_check_site_did.svg'
import iconCheckSiteNot from '$assets/img/icon_check_site_cannot.svg'
import iconCheckSiteE from '$assets/img/icon_check_site_e.svg'

export default class CheckInSeatList extends Component {
  static propTypes = {
    seat: PropTypes.array,
    checkIn: PropTypes.func,
    removeCheckIn: PropTypes.func
  }
  showSite (items, j) {
    let listItem = items.map((item, i) => {
      let reg = /^[A-Za-z]*$/
      if (!isNaN(item)) {
        return <span key={'site-' + i}>{item}</span>
      } else if (item === '&') {
        return <span key={'site-' + i}>&nbsp;</span>
      } else if (reg.test(item)) {
        return <span key={'site-' + i}>{item}</span>
      } else if (item === '!') {
        return <SVG key={'site-' + i} svg={iconCheckSiteCould} className="icon-80" onClick={() => this.props.checkIn(j, i)} />
      } else if (item === '@') {
        return <SVG key={'site-' + i} svg={iconCheckSiteDo} className="icon-80" fill="#e0b832" onClick={() => this.props.removeCheckIn(j, i)} />
      } else if (item === '#') {
        return <SVG key={'site-' + i} svg={iconCheckSiteDid} className="icon-80" fill="#ca403d" />
      } else if (item === '$') {
        return <SVG key={'site-' + i} svg={iconCheckSiteNot} className="icon-80" fill="#8e8e8e" />
      } else if (item === '*') {
        return <SVG key={'site-' + i} svg={iconCheckSiteE} className="icon-60" fill="#8e8e8e" />
      } else if (item === '|') {
        return <span key={'site-' + i} className="separate">&nbsp;</span>
      }
    })
    return listItem
  }
  showSiteDiv (seat) {
    let list = seat.map((items, i) => {
      return <div key={'siteD-' + i} className="m-b-35" data-flex="cross:center main:justify">{this.showSite(items, i)}</div>
    })
    return list
  }
  render () {
    return (
      <div className="m-h-40 m-b-100">
        {this.showSiteDiv(this.props.seat)}
      </div>
    )
  }
}
