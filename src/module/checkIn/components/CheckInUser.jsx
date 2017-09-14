/**
 * Created by 萝卜君 on 2017/5/12.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-svg-inline'
import iconChecked from '$assets/img/icon_check_checked.svg'
import iconCheckNo from '$assets/img/icon_check_checkNo.svg'
import L from '$i18n'

export default class CheckInUser extends Component {
  static propTypes = {
    checkState: PropTypes.number,
    name: PropTypes.string,
    startDate: PropTypes.string,
    changeCheck: PropTypes.func
  }
  render () {
    return (
      <div className="check-name f-14" data-flex="cross:center main:justify">
        <div data-flex="cross:center">
          <SVG onClick={() => this.props.changeCheck()} svg={(this.props.checkState === 0) ? iconCheckNo : iconChecked} className="icon-50 m-r-40" fill="#ca403d" />
          <span>{this.props.name}</span>
        </div>
        <div>{L.getString('CHECKIN_START_DATE')}：{this.props.startDate}</div>
      </div>
    )
  }
}
