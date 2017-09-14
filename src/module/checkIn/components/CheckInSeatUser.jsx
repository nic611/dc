/**
 * Created by wq on 2017/5/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class CheckInSeatUser extends Component {
  static propTypes = {
    checkInSelect: PropTypes.object
  }
  render () {
    return (
      <div data-flex="cross:center main:justify" className="select-top bg-white">
        <div className="select-top-left" data-flex="cross:center main:center" data-flex-box="0">
          <span className="f-12">{this.props.checkInSelect.aircraft}</span>
          <span className="f-18">{this.props.checkInSelect.checkInSeat}</span>
        </div>
        <div data-flex-box="1" className="select-top-right p-l-40">
          <p className="f-12 m-b-10">{this.props.checkInSelect.flight} {this.props.checkInSelect.startDate} {this.props.checkInSelect.startSite}-{this.props.checkInSelect.endSite}</p>
          <p className="f-16">{this.props.checkInSelect.name}</p>
        </div>
      </div>
    )
  }
}
