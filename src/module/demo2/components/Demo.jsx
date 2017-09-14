import React, { Component } from 'react'

export default class Demo extends Component {
  state = {
    name: 'demo'
  }
  render () {
    return (
      <p>
        I'm {this.state.name}.
      </p>
    )
  }
}
