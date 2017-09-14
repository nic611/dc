/**
 * Created by Administrator on 2017/4/28.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import Btn from '$base/btn'
import CheckInSuccessUser from './CheckInSuccessUser'
import CheckInCongratulation from './CheckInCongratulation'
import CheckInIcon from './CheckInIcon'
import CheckInHint from './CheckInHint'
import routerUtils from '$assets/js/routerUtils'
import '../resources/checkInSuccess.css'
import L from '$i18n'

class CheckInSite extends Component {
  static propTypes = {
    checkInSuccess: PropTypes.object,
    appBarActions: PropTypes.object
  }
  componentDidMount () {
    this.props.appBarActions.changeAppBar(L.getString('CHECKIN_SUCCESS'), true)
    this.props.appBarActions.changeFooterBar(true)
  }
  render () {
    return (
      <div>
        <CheckInCongratulation />
        <CheckInSuccessUser checkInSuccess={this.props.checkInSuccess} />
        <CheckInHint />
        <CheckInIcon />
        <div className="p-h-65 m-t-30">
          <Btn title="后一航段选座" action={() => routerUtils.go('/checkFlight')} />
        </div>
        <div className="p-h-65 m-t-55 p-b-20">
          <Btn className="overBtn" title="完成" action={() => routerUtils.go('/check')} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  checkInSuccess: state.get('checkInSuccessModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckInSite)
