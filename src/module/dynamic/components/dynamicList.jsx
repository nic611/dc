/**
 * Created by Administrator on 2017/4/25.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as dynamicDetailActions } from '../model/dynamicDetailModel'
import DynamicListItem from './DynamicListItem'
import routerUtils from '$assets/js/routerUtils'
import '../resources/dynamicList.css'

class DynamicList extends Component {
  static propTypes = {
    dynamicList: PropTypes.object,
    appBarActions: PropTypes.object,
    dynamicDetailActions: PropTypes.object
  }
  componentDidMount () {
    // let start = this.props.dynamicList.startSite
    // let end = this.props.dynamicList.endSite
    let title = this.props.dynamicList.title
    this.props.appBarActions.changeAppBar(title)
    this.props.appBarActions.changeFooterBar(true)
  }
  getDetail = (item) => {
    this.props.dynamicDetailActions.getDetail(item, this.props.dynamicList)
    routerUtils.go('/dynamicDetail')
  }
  render () {
    return (
      <div className="flight-list">
        <div>
          <DynamicListItem dynamicFlightList={this.props.dynamicList.list} getDetail={this.getDetail} />
        </div>
        <div className="flight-date f-16">{this.props.dynamicList.date}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dynamicList: state.get('dynamicListModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  dynamicDetailActions: bindActionCreators(dynamicDetailActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicList)
