/**
 * Created by wq on 2017/5/17.
 */
import React, {Component} from 'react'
import L from '$i18n'

export default class CheckInHint extends Component {
  render () {
    return (
      <div className="m-h-60 m-v-100">
        <h4 className="m-b-40 p-l-20 p-v-10 success-hint">{L.getString('CHECKIN_HINT')}</h4>
        <p className="p-l-20">该航班暂不支持电子登机牌，请旅客至少提前到达机场办理纸质登机牌</p>
      </div>
    )
  }
}
