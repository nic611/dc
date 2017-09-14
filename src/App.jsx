import React, { Component } from 'react'
// import { browserHistory as history, Router } from 'react-router'
import { hashHistory as history, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from '$store'
import routes from '$module/routerIndex'
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar'
import 'flex.css/dist/data-flex.css'
import 'assets/css/base.css'
import AppBar from '$cc/AppBar'
import FooterBar from '$cc/FooterBar'
import LoadingTips from '$cc/LoadingTips'
import Dock from '$base/dock'
import 'assets/css/toast.css'
import ReduxToastr from 'react-redux-toastr'

// 绑定redux和react-router
const syncHistoryStore = syncHistoryWithStore(history, store, { selectLocationState (state) {
  return state.get('routing').toJS()
}})

export default class App extends Component {
  render () {
    return (
      <div>
        <LoadingBar className="loading" />
        <div className="app" data-flex="dir:top">
          <AppBar />
          <div className="app-content" data-flex-box="1">
            <Router history={syncHistoryStore} routes={routes} key={Math.random()} />
          </div>
          <FooterBar />
        </div>
        <LoadingTips />
        <Dock />
        <ReduxToastr />
      </div>
    )
  }
}
