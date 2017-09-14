/**
 * Created by 熊超超 on 2017/4/23.
 */
import Dock_ from './dock'
import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actions } from '$module/common/model/commonModel'

class Dock extends Component{
  static propTypes = {
    dock: PropTypes.object,
    actions: PropTypes.object
  }
  visibleChange = isVisible => {
    this.props.actions.changeDockVisible(isVisible)
  }
  render () {
    return (
      <Dock_ position="bottom" isVisible={this.props.dock.isVisible}
             onVisibleChange={isVisible => this.visibleChange(isVisible)}>
        {this.props.dock.view}
      </Dock_>
    )
  }
}

const mapStateToProps = state => ({
  dock: state.getIn(['commonModel', 'dock']).toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dock)
