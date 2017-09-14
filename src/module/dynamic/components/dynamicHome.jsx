/**
 * Created by Administrator on 2017/4/24.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as dynamicListActions } from '../../dynamic/model/dynamicListModel'
import { actions as dynamicHomeActions } from '../../dynamic/model/dynamicHomeModel'
import Tabs from '$base/tabs'
import DynamicFormNum from './dynamicFormNum'
import DynamicFormSite from './dynamicFormSite'
import Btn from '$base/btn'
import '../resources/dynamicHome.css'
import iconSearch from '$assets/img/icon_book_search.svg'
import routerUtils from '$assets/js/routerUtils'
import L from '$i18n'
import viewUtils from '$assets/js/viewUtils'

class DynamicHome extends Component {
  static propTypes = {
    appBarActions: PropTypes.object,
    dynamicHome: PropTypes.object,
    userData: PropTypes.object,
    dynamicListActions: PropTypes.object,
    dynamicHomeActions: PropTypes.object
  }
  componentDidMount () {
    this.props.appBarActions.changeAppBar('航班动态', true)
    this.props.appBarActions.changeFooterBar(false, 1)
  }
  search (flag) {
    // let flag = this.props.dynamicHome.flag
    if (this.props.userData.userLogInState) {
      if (flag === 1) {
        this.props.dynamicHomeActions.selectHomeDate(flag)
        let start = this.props.dynamicHome.startSite
        let end = this.props.dynamicHome.endSite
        let date = this.props.dynamicHome.dateFormat
        this.props.dynamicListActions.getSiteList(start, end, date)
        routerUtils.go('/dynamicList')
      } else {
        this.props.dynamicHomeActions.selectHomeDate(flag)
        let flight = this.props.dynamicHome.flight
        let date = this.props.dynamicHome.dateFormat
        if (flight === '') {
          viewUtils.alert('请输入航班号~')
        } else {
          this.props.dynamicListActions.getNumList(flight, date)
          routerUtils.go('/dynamicList')
        }
      }
    } else {
      routerUtils.go('/login')
    }
  }
  render () {
    return (
      <div>
        <div className="p-t-80">
          <div className="m-h-50 br-15 f-16">
            <Tabs className="tab-order" tabActive={this.props.dynamicHome.flag}>
              <Tabs.Panel title={L.getString('DYNAMIC_BAR_SITE')}>
                <div className="p-h-40 p-v-10 bg-white br-15">
                  <DynamicFormSite ref="site" />
                </div>
                <div className="m-v-55">
                  <Btn title={L.getString('DYNAMIC_SEARCH')} icon={iconSearch} action={() => this.search(1)} />
                </div>
              </Tabs.Panel>
              <Tabs.Panel title={L.getString('DYNAMIC_BAR_NUM')}>
                <div className="p-h-40 p-v-10 bg-white br-15">
                  <DynamicFormNum ref="num" />
                </div>
                <div className="m-v-55">
                  <Btn title={L.getString('DYNAMIC_SEARCH')} icon={iconSearch} action={() => this.search(2)} />
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dynamicHome: state.get('dynamicHomeModel').toJS(),
  userData: state.get('userModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  dynamicListActions: bindActionCreators(dynamicListActions, dispatch),
  dynamicHomeActions: bindActionCreators(dynamicHomeActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicHome)
