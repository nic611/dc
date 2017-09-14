import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Counter from './Test'

export default class MainView2 extends Component {
  static propTypes = {
    children: PropTypes.element
  }
  render () {
    return (
      <div>
        <Counter />
        <div className="view">
          {this.props.children}
        </div>
      </div>
    )
  }
}
