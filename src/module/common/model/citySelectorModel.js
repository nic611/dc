/**
 * Created by Administrator on 2017/4/26.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'
// import constantData from '../resources/airPortList.json'
import constantData from './airPortList'

const air = constantData.sort((a, b) => {
  if (a.cityPinYin < b.cityPinYin) {
    return -1
  } else {
    return 1
  }
})
const data = Immutable.fromJS({
  city: air,
  activeCity: '',
  searchCity: [],
  searchState: '0', // 0是不在查询  1是正在查询
  code: '',
  // flagDynamic: '0', // 0是出发地 ， 1是目的地  动态页
  flag: '0' // 0是出发地 ， 1是目的地   预约页
})

export const actions = {
  selectToCity: (city, flag) => ({type: 'selectToCity', city, flag}),
  searchDestination: (city) => ({type: 'searchDestination', city}),
  resetList: () => ({type: 'resetList'})
}

export const reducer = createdReducer(data, {
  selectToCity (state, action) {
    const city = state.get('city').toJS().find(item => item.cityName === action.city)
    if (city) {
      return state.set('activeCity', city.index).set('code', city.airPortCode).set('flag', action.flag)
    }
    return state
  },
  searchDestination (state, action) {
    let reg = /^[A-Za-z]*$/
    let city = action.city
    if (reg.test(city)) {
      city = city.toUpperCase()
    }
    let cityList = state.get('city').toJS()
    let newList = cityList.filter((item) => {
      return (item.cityName === city || item.cityPinYin === city || item.airPortCode === city)
    })
    if (newList.length === 0) {
      return state.set('searchState', '0')
    } else {
      return state.set('searchCity', Immutable.fromJS(newList)).set('searchState', '1')
    }
  },
  resetList (state, action) {
    return state.set('searchState', '0')
  }
})
