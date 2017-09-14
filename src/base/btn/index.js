/**
 * Created by 熊超超 on 2017/4/23.
 */
import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actions } from '$module/common/model/commonModel'
import loadingSvg from '$assets/img/loading.svg'
import SVG from 'react-svg-inline'
import './btn.css'

class Btn extends Component{
  static propTypes = {
    loading: PropTypes.bool,
    action: PropTypes.func,
    icon: PropTypes.string,
    title: PropTypes.string
  }
  render () {
    return (
      <div onClick={() => this.props.action()} data-flex="cross:center main:center" className={this.props.className ? this.props.className : 'btn-accent'}>
        {this.props.loading ? <SVG svg={loadingSvg} className="icon-66" /> : ""}
        {this.props.icon ? <SVG svg={this.props.icon} fill="#FFFFFF" className="icon-66" /> : ''}
        <span>{this.props.title}</span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.getIn(['commonModel', 'base', 'loading'])
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Btn)
