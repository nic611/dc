import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../model/demo2Model'

import '../resources/Counter.css'

class Counter extends Component {
  static propTypes = {
    actions: PropTypes.object,
    counter: PropTypes.object
  }
  handleClick = () => {
    this.props.actions.increment()
    this.props.actions.hello(this.props.counter.count)
  }
  handleClick2 = () => {
    this.props.actions.sagaTest()
  }
  render () {
    return (
      <div data-flex="dir:top main:center cross:center">
        <a className="counter" href="javascript: void(0)" onClick={this.handleClick}>{ this.props.counter.count }</a>
        <a className="counter" href="javascript: void(0)" onClick={this.handleClick2}>{ this.props.counter.count }</a>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  counter: state.get('demo2Model').toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
