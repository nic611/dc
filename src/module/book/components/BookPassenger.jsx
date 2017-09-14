import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../model/flightModel'
import PropTypes from 'prop-types'
import viewUtils from '$assets/js/viewUtils'
import iconBookWaring from '$assets/img/icon_book_waring.svg'
import iconBookPlus from '$assets/img/icon_book_plus.svg'
import iconBookMinus from '$assets/img/icon_book_minus.svg'
import Btn from '$base/btn'
import SVG from 'react-svg-inline'
import '../resources/bookPassenger.css'

class BookPassenger extends Component {
  static propTypes = {
    // handler: PropTypes.func,
    changeDockVisible: PropTypes.func,
    actions: PropTypes.object,
    flightModel: PropTypes.object
  }
  changePsg = (type, n) => {
    this.props.actions.changePsg(type, n)
  }
  savePsgNum () {
    this.props.actions.changeDockVisible()
  }
  componentWillUnmount () {
    // 组件销毁的时候调用handler将组件的值传给需要用的组件
    // this.props.handler(this.state.name)
  }
  render () {
    return (
      <div className="book-passenger-view p-b-80">
        <header data-flex="main:center cross:center">
          <SVG svg={iconBookWaring} className="m-r-40 icon-50" fill="#C93E3D" data-flex-box="0" /><span>最多5人,儿童需要有成人同行</span>
        </header>
        <section className="p-h-100">
          <div data-flex="main:center cross:center" className="psg-type-view p-v-30 f-w-light">
            <span data-flex-box="1" data-flex="dir:top cross:center"><span className="f-20">成人</span><span className="f-18">(12岁及以上)</span></span>
            <span data-flex-box="1" data-flex="dir:top cross:center"><span className="f-20">儿童</span><span className="f-18">(2-11岁)</span></span>
          </div>
          <div data-flex="main:center cross:center" className="psg-num-view p-v-50">
            <div data-flex-box="1" data-flex="main:center cross:center">
              <SVG svg={iconBookMinus} className="icon-100" data-flex-box="0" onClick={() => this.changePsg('adultCount', -1)} />
              <span className="f-50 p-h-20">{this.props.flightModel.adultCount}</span>
              <SVG svg={iconBookPlus} className="icon-100" data-flex-box="0" onClick={() => this.changePsg('adultCount', 1)} />
            </div>
            <div data-flex-box="1" data-flex="main:center cross:center">
              <SVG svg={iconBookMinus} className="icon-100" data-flex-box="0" onClick={() => this.changePsg('childCount', -1)} />
              <span className="f-50 p-h-20">{this.props.flightModel.childCount}</span>
              <SVG svg={iconBookPlus} className="icon-100" data-flex-box="0" onClick={() => this.changePsg('childCount', 1)} />
            </div>
          </div>
        </section>
        <Btn className="psg-btn" title='确定' action={() => viewUtils.hideDock()} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  flightModel: state.get('flightModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookPassenger)
