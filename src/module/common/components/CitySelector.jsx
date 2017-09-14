/**
 * Created by 熊超超 on 2017/4/24.
 */
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { actions as appBarActions } from '$common/model/appBarModel'
import { actions as dynamicFormSiteActions } from '../../dynamic/model/dynamicHomeModel'
import { actions as bookCityActions } from '../../book/model/flightModel'
import { actions as citySelectorActions } from '../model/citySelectorModel'
import PropTypes from 'prop-types'
import '$assets/css/citySelector.css'
import SVG from 'react-svg-inline'
import iconCity from '$assets/img/icon_city_select.svg'
import iconSearch from '$assets/img/icon_book_search.svg'
import routerUtils from '$assets/js/routerUtils'

class CitySelector extends Component {
  static propTypes = {
    citySelector: PropTypes.object,
    appBarActions: PropTypes.object,
    dynamicFormSiteActions: PropTypes.object,
    bookCityActions: PropTypes.object,
    citySelectorActions: PropTypes.object,
    params: PropTypes.object
  }
  searchList () {
    let list = this.props.citySelector.searchCity.map((value, i) => {
      return <li key={'searchList-' + i} data-flex="cross:center main:justify" className="indexed-list-item" onClick={() => this.selectCity(value.cityName, value.airPortCode)}><span><span className="city">{value.cityName}</span> {value.airPortName}</span></li>
    })
    return list
  }
  searchDestination (e) {
    this.props.citySelectorActions.searchDestination(e.target.value)
  }
  selectCity (city, code) {
    // console.log(city)
    if (this.props.params.type === 'book') {
      this.props.bookCityActions.selectCity(city, code, this.props.citySelector.flag)
    } else if (this.props.params.type === 'dynamic') {
      this.props.dynamicFormSiteActions.selectForCity(city, code, this.props.citySelector.flag)
    }
    routerUtils.back()
  }
  judgeSelectorCity (value) {
    if (value.index === this.props.citySelector.activeCity) {
      return <SVG svg={iconCity} className="icon-60" fill="#C93E3D" data-flex-box="0" />
    }
  }
  initIndex () {
    let [...index] = '热ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return index.map((item, i) => <span key={'a-' + i}>{item}</span>)
  }
  initList () {
    let dataObj = {}
    let lists = this.props.citySelector.city.map((value, i) => {
      let letter = value.cityPinYin.charAt(0).toUpperCase()
      if (letter in dataObj) {
        dataObj[letter].push(value)
        return <li key={'item-' + i} data-flex="cross:center main:justify" className={'indexed-list-item' + (value.index === this.props.citySelector.activeCity ? ' active' : '')} onClick={() => this.selectCity(value.cityName, value.airPortCode)}><span><span className="city">{value.cityName}</span> {value.airPortName}</span><span>{this.judgeSelectorCity(value)}</span></li>
      } else {
        dataObj[letter] = [value]
        return <span key={'item-s-' + i}>
          <li key={'item-' + i} className="indexed-list-divider" id={'divider-' + (letter === '#' ? '' : letter)}>{letter}</li><li data-flex="cross:center main:justify" className={'indexed-list-item' + (value.index === this.props.citySelector.activeCity ? ' active' : '')} onClick={() => this.selectCity(value.cityName, value.airPortCode)}><span><span className="city">{value.cityName}</span> {value.airPortName}</span><span className={value.index === this.props.citySelector.activeCity ? '' : 'citySelector-hide'}><SVG svg={iconCity} className="icon-60" fill="#C93E3D" data-flex-box="0" /></span></li>
        </span>
      }
    })
    return lists
  }
  initHot () {
    let hotCityS = this.props.citySelector.city.filter(item => item.isHot === '1')
    if (hotCityS.length > 0) {
      return (
        <ul className="indexed-hot-ul" data-flex="cross:center">
          {
            this.props.citySelector.city.filter(item => item.isHot === '1').map((item, i) => {
              return <li key={'hot-' + i} className={item.index === this.props.citySelector.activeCity ? 'active' : ''} onClick={() => this.selectCity(item.cityName, item.airPortCode)}>{item.cityName}</li>
            })
          }
        </ul>
      )
    } else {
      return <p>暂无热门城市，敬请期待</p>
    }
  }
  componentDidMount () {
    this.bindEvent()
    this.props.appBarActions.changeAppBar('目的地')
    this.props.appBarActions.changeFooterBar(true)
    this.props.citySelectorActions.resetList()
  }
  bindEvent () {
    let self = ReactDom.findDOMNode(this)
    let inner = self.querySelector('.indexed-list-inner')
    let bar = self.querySelector('.indexed-list-bar')
    let alert = self.querySelector('.indexed-list-alert')

    let pointElement = null // 保存上一个touch到的元素
    let findStart = e => {
      if (pointElement) {
        pointElement.classList.remove('active')
      }
      bar.classList.add('active')
      let point = e.changedTouches ? e.changedTouches[0] : e
      pointElement = document.elementFromPoint(point.pageX, point.pageY)
      if (!pointElement) {
        return
      }
      let group = pointElement.innerText
      let divider = self.querySelector('#divider-' + (group === '热' ? '' : group))
      if (group && divider && group.length === 1) {
        pointElement.classList.add('active')
        alert.innerHTML = group
        alert.classList.add('active')

        inner.scrollTop = divider.offsetTop
      }
      e.preventDefault()
    }
    let findEnd = () => {
      bar.classList.remove('active')
      alert.classList.remove('active')
      if (pointElement) {
        pointElement.classList.remove('active')
        pointElement = null
      }
    }
    bar.addEventListener('touchstart', e => findStart(e))
    bar.addEventListener('touchmove', e => findStart(e))
    bar.addEventListener('touchend', e => findEnd(e))
  }
  render () {
    return (
      <div ref="indexedList" className="indexedList">
        <div className="m-h-40 m-v-35 bg-white br-15 p-h-30 p-v-25 indexed-input" data-flex="cross:center">
          <SVG svg={iconSearch} className="icon-60" fill="#C93E3D" data-flex-box="0" />
          <input onChange={(e) => this.searchDestination(e)} className="f-14" type="text" placeholder="目的地中文 / 英文 / 拼音 / 机场三字码" data-flex-box="1" />
        </div>
        <div className={'indexed-list-div ' + ((this.props.citySelector.searchState === '0') ? '' : 'citySelector-hide')}>
          <div className="indexed-list-bar f-10">
            {this.initIndex()}
          </div>
          <div className="indexed-list-alert">A</div>
          <div className="indexed-list-inner">
            <div className="m-h-40 m-t-15 f-14 indexed-hot">
              <h3 className="m-b-60" id="divider-">热门城市</h3>
              {this.initHot()}
            </div>
            <ul className="indexed-list-lists">{this.initList()}</ul>
            <div className="p-v-20">&nbsp;</div>
          </div>
        </div>
        <div className={((this.props.citySelector.searchState === '0') ? 'citySelector-hide' : '')}>
          <ul className="indexed-list-lists">{this.searchList()}</ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  citySelector: state.get('citySelectorModel').toJS()
})

const mapDispatchToProps = dispatch => ({
  appBarActions: bindActionCreators(appBarActions, dispatch),
  bookCityActions: bindActionCreators(bookCityActions, dispatch),
  dynamicFormSiteActions: bindActionCreators(dynamicFormSiteActions, dispatch),
  citySelectorActions: bindActionCreators(citySelectorActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CitySelector)
