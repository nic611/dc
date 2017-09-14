/**
 * Created by 熊超超 on 2017/4/25.
 */
import {toastr} from 'react-redux-toastr'
import airPortList from '$common/model/airPortList'

export default {
  dock (view) {
    window.$store.dispatch({type: 'showDock', view})
  },
  hideDock () {
    window.$store.dispatch({type: 'hideDock'})
  },
  success (title, message) {
    const config = {timeOut: '3000', position: 'bottom-center', progressBar: true}
    toastr.success(title, message, config)
  },
  toast (message) {
    const config = {timeOut: '3000', position: 'bottom-center', progressBar: false}
    toastr.info(message, config)
  },
  alert (text, onOk, okText = '确定') {
    const config = {
      okText: okText,
      disableCancel: true,
      onOk: () => onOk && onOk()
    }
    toastr.confirm(text, config)
  },
  confirm (text, onOk, onCancel, okText = '确定', cancelText = '取消') {
    const config = {
      okText: okText,
      cancelText: cancelText,
      onOk: () => onOk && onOk(),
      onCancel: () => onCancel && onCancel()
    }
    toastr.confirm(text, config)
  },
  getCityNameByCode (code) {
    const airPort = airPortList.find(airPort => airPort.airPortCode === code)
    return airPort ? airPort.airPortName : ''
  },
  getCityByCode (code) {
    const airPort = airPortList.find(airPort => airPort.airPortCode === code)
    return airPort ? airPort.cityName : ''
  }
}

/*
react-redux-toastr文档
https://github.com/diegoddox/react-redux-toastr
*/
