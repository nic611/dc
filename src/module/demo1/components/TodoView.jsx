import React, { Component } from 'react'
import PropTypes from 'prop-types'
import viewUtils from '$assets/js/viewUtils'

export default class TodoView extends Component {
  static propTypes = {
    handler: PropTypes.func
  }
  state = {
    name: 'todo'
  }
  componentWillUnmount () {
    // 组件销毁的时候调用handler将组件的值传给需要用的组件
    this.props.handler(this.state.name)
  }
  render () {
    return (
      <p>
        I'm {this.state.name}.

        <input type="button" onClick={() => viewUtils.hideDock()} defaultValue="关闭" />
      </p>
    )
  }
}
