/**
 * Created by Administrator on 2017/4/26.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import '../resources/dynamicDetail.css'
import DynamicFlightDelay from './DynamicFlightDelay'
import DynamicFlightStart from './DynamicFlightStart'
import DynamicFlightEnd from './DynamicFlightEnd'
import DynamicPreFlight from './DynamicPreFlight'

class DynamicDetail extends Component {
  static propTypes = {
    dynamicDetail: PropTypes.object,
    appBarActions: PropTypes.object
  }
  componentDidMount () {
    let fly = () => {
      return (<div className="detailBar"><p className="f-14">{this.props.dynamicDetail.flight}</p><p className="f-12">{this.props.dynamicDetail.date}</p></div>)
    }
    this.props.appBarActions.changeAppBar(fly())
    this.props.appBarActions.changeFooterBar(true)
  }
  judgeAirState () {
    if (this.props.dynamicDetail.flag === '2') {
      return (
        <DynamicFlightDelay />
      )
    }
  }
  render () {
    return (
      <div>
        <div className="p-t-30 f-14">
          {this.judgeAirState()}
          <DynamicFlightStart dynamicDetail={this.props.dynamicDetail} />
          <DynamicFlightEnd dynamicDetail={this.props.dynamicDetail} />
          <DynamicPreFlight dynamicDetail={this.props.dynamicDetail} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dynamicDetail: state.get('dynamicDetailModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicDetail)
