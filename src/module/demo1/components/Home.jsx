import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import '../resources/home.css'
import { connect } from 'react-redux'
import { actions as commonActions } from '$module/common/model/commonModel'
import { bindActionCreators } from 'redux'
import TodoView from './TodoView'
import TestStateless from './AView'
import viewUtils from '$assets/js/viewUtils'
import ScrollerView from '$base/ScrollerView'

import LoadingTips from '../../common/components/LoadingTips'

class Demo1Home extends Component {
  static propTypes = {
    children: PropTypes.element
  }
  state = {
    items: [1, 2, 3, 4, 5, 6]
  }
  componentDidMount () {
  }
  getData = (name) => {
    console.log(name)
  }
  getItems = () => {
    return this.state.items.map((item, i) => <div key={i} style={{height: '400px'}}>{item}</div>)
  }
  loadNext = () => {
    console.log('next')
    this.setState({items: [...this.state.items, ...[1, 3, 5, 7]]})
  }
  render () {
    return (
      <div>
        <LoadingTips />
        <div className="btn-group">
          <Link to="/demo1/home" className="btn" activeClassName="active">Home</Link>
          <Link to="/demo1/todo" className="btn" activeClassName="active">Todo</Link>
        </div>
        <input type="button" onClick={() => viewUtils.dock(<TodoView handler={this.getData} />)} defaultValue="弹出层" />
        <input type="button" onClick={() => viewUtils.toast('我是吐司')} defaultValue="toast" />
        <input type="button" onClick={() => viewUtils.alert('确定吗')} defaultValue="alert" />
        <input type="button" onClick={() => viewUtils.confirm('是否要删除')} defaultValue="confirm" />
        <div className='view'>
          {this.props.children}
        </div>
        <TestStateless title="这是无状态组件" />
        <ScrollerView loadNext={this.loadNext}>
          {this.getItems()}
        </ScrollerView>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  commonActions: bindActionCreators(commonActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo1Home)
