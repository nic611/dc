/**
 * Created by 熊超超 on 2017/4/23.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class MainView extends Component {
  static propTypes = {
    children: PropTypes.element
  }
  render () {
    return (
      <div className="main-view">
        {this.props.children}
      </div>
    )
  }
}
