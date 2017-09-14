/**
 * Created by 萝卜君 on 2017/5/12.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import L from '$i18n'

export default class CheckInForm extends Component {
  static propTypes = {
    handleChange: PropTypes.func
  }
  render () {
    return (
      <div className="p-t-60 p-b-30 bg-white f-14" data-flex="main:center">
        <span className="m-r-45 f-b">{L.getString('CHECKIN_TICKET_NUM')}</span>
        <div className="check-input">
          <input onChange={(e) => this.props.handleChange(e.target.value)} className="f-14" type="text" placeholder={L.getString('CHECKIN_INPUT_1')} />
        </div>
      </div>
    )
  }
}
