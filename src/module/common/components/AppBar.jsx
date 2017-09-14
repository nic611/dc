/**
 * Created by 熊超超 on 2017/4/23.
 */
import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actions } from '../model/appBarModel'
import SVG from 'react-svg-inline'
import iconBack from '$assets/img/arrow-left.svg'
import routerUtils from '$assets/js/routerUtils'
import '../resources/bar.css'

class AppBar extends Component {
  static propTypes = {
    appBar: PropTypes.object
  }
  back = () => {
    !this.props.appBar.hideBackBtn && routerUtils.back()
  }
  getActionLayout (actionBtns) {
    let items = []
    actionBtns.forEach((b, i) => {
      items.push((<span key={'appBar-' + i} className="m-l-20 f-16" onClick={b.action}>{b.icon ? <SVG svg={b.icon} className="icon-66" fill="#FFFFFF" /> : b.text}</span>))
    })
    return items
  }
  render () {
    let {hideBackBtn, actionBtns, title} = this.props.appBar
    let actions = this.getActionLayout(actionBtns)
    return (
      <div className="app-bar" data-flex-box="0">
        <div className="title">
          <span data-flex="main:center" className="f-16">{title}</span>
        </div>
        <span data-flex="cross:center" className="back-btn m-l-40"
          onClick={this.back}>{!hideBackBtn ? <SVG svg={iconBack} className="icon-66" fill="#FFFFFF" /> : ''}</span>
        <span data-flex="cross:center" className="action-btn m-r-40">{actions}</span>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  appBar: state.getIn(['appBarModel', 'appBar']).toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar)
