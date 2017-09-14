/**
 * Created by 张森峰 on 2017/5/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from '../model/commonModel'
import { bindActionCreators } from 'redux'
import '../resources/loadingTips.css'

class LoadingTips extends Component {
  static propTypes = {
    actions: PropTypes.object,
    data: PropTypes.object
  }
  loadingTipsHidden () {
    this.props.actions.loadingTipsHidden()
  }
  render () {
    return (
      <div className={'loading-tips' + (this.props.data.base.loading ? '' : ' hidden')} data-flex='main:center cross:center'>
        <div className='br-10 p-h-30 p-v-20' data-flex='dir:top main:justify'>
          <div data-flex='main:center cross:center' data-flex-box='1'><span className='f-16'>数据加载中</span><span className='loading-tips-animation1'>&nbsp;.</span><span className='loading-tips-animation2'>&nbsp;.</span><span className='loading-tips-animation3'>&nbsp;.</span></div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.get('commonModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingTips)
