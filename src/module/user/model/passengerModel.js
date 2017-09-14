/**
 * Created by 张森峰 on 2017/4/25.
 */
import {createdReducer} from '$store/createdReducer'
import Immutable from 'immutable'

import L from '$i18n'

const data = Immutable.fromJS({
  passengerComeFrom: 'user', // 判断是从什么页面进入的(user: 我的->订单管理 / bookAccount: 订单待支付->增加乘机人)
  passengerAddMainViewType: 0, // passengerAdd页面的类型(0: 增加乘机人 / 1: 编辑乘机人)
  passengerAddMessageDeleteState: false, // passenger页面右上角“编辑”的选中状态(true: 选中 / false: 未选中)
  passengerEditIndex: 0, // 待修改的passengerMessage的index
  documentNumberType: 0, // 证件类型
  documentNumberChosen: false,
  passengerAddDocumentNumber: '',
  passengerAddGender: 0,
  nameCHS1: '',
  nameCHS2: '',
  nameEN1: '',
  nameEN2: '',
  passengerAddMobile: '',
  passengerMessage: [
    {
      documentNumberType: 0,
      documentNum: '218908198801014321',
      nameCHS1: '张',
      nameCHS2: '三',
      nameEN1: 'Zhang',
      nameEN2: 'San',
      mobile: '13800006759',
      gender: 1,
      checkboxState: false
    },
    {
      documentNumberType: 1,
      documentNum: '218908198201015656',
      nameCHS1: '成',
      nameCHS2: '龙',
      nameEN1: 'Chen',
      nameEN2: 'Jack',
      mobile: '13800006123',
      gender: 1,
      checkboxState: false
    },
    {
      documentNumberType: 2,
      documentNum: '218908198302117788',
      nameCHS1: '李',
      nameCHS2: '连杰',
      nameEN1: 'Li',
      nameEN2: 'Jet',
      mobile: '13800005569',
      gender: 2,
      checkboxState: false
    }
  ],
  passengerAddMessageNecessary: [
    {
      'title': L.getString('USER_PASSENGER_ADD_INPUT_FAMILY_NAME_CHS'),
      'inputType': 'text',
      'placeholder': L.getString('USER_MODEL_PASSENGER_PLACEHOLDER1')
    },
    {
      'title': L.getString('USER_PASSENGER_ADD_INPUT_NAME_CHS'),
      'inputType': 'text',
      'placeholder': L.getString('USER_MODEL_PASSENGER_PLACEHOLDER1')
    },
    {
      'title': L.getString('USER_PASSENGER_ADD_INPUT_MOBILE'),
      'inputType': 'tel',
      'placeholder': L.getString('USER_MODEL_PASSENGER_PLACEHOLDER2')
    }
  ],
  passengerAddMessageUnNecessary: [
    {
      'title': L.getString('USER_PASSENGER_ADD_INPUT_FAMILY_NAME_EN'),
      'inputType': 'text',
      'placeholder': L.getString('USER_MODEL_PASSENGER_PLACEHOLDER3')
    },
    {
      'title': L.getString('USER_PASSENGER_ADD_INPUT_NAME_EN'),
      'inputType': 'text',
      'placeholder': L.getString('USER_MODEL_PASSENGER_PLACEHOLDER3')
    }
  ]
})

export const actions = {
  passengerComeFromChange: value => ({type: 'passengerComeFromChange', value}),
  passengerAddMainViewTypeChange: value => ({type: 'passengerAddMainViewTypeChange', value}),
  resetPassengerMessage: () => ({type: 'resetPassengerMessage'}),
  passengerAddMessageDeleteStateChange: () => ({type: 'passengerAddMessageDeleteStateChange'}),
  passengerAddMessageDeleteStateFalse: () => ({type: 'passengerAddMessageDeleteStateFalse'}),
  passengerAddUnloading: () => ({type: 'passengerAddUnloading'}),
  divShow: () => ({type: 'divShow'}),
  divHidden: () => ({type: 'divHidden'}),
  documentNumberTypeChange: e => ({type: 'documentNumberTypeChange', e}),
  passengerAddGenderMale: () => ({type: 'passengerAddGenderMale'}),
  passengerAddGenderFemale: () => ({type: 'passengerAddGenderFemale'}),
  passengerAddDocumentNumberChange: value => ({type: 'passengerAddDocumentNumberChange', value}),
  nameCHS1Change: e => ({type: 'nameCHS1Change', e}),
  nameCHS2Change: e => ({type: 'nameCHS2Change', e}),
  nameEN1Change: e => ({type: 'nameEN1Change', e}),
  nameEN2Change: e => ({type: 'nameEN2Change', e}),
  passengerAddMobileChange: e => ({type: 'passengerAddMobileChange', e}),
  toPassengerAddView: data => ({type: 'toPassengerAddView', data}),
  addPassenger: e => ({type: 'addPassenger', e}),
  deletePassenger: indexArray => ({type: 'deletePassenger', indexArray}),
  editPassenger: passengerEditData => ({type: 'editPassenger', passengerEditData}),
  passengerCheckboxStateChange: index => ({type: 'passengerCheckboxStateChange', index})
}

export const reducer = createdReducer(data, {
  passengerComeFromChange (state, action) {
    return state.set('passengerComeFrom', Immutable.fromJS(action.value))
  },
  passengerAddMainViewTypeChange (state, action) {
    return state.set('passengerAddMainViewType', action.value)
  },
  resetPassengerMessage (state, action) {
    let passengerMessage = state.get('passengerMessage').toJS()
    passengerMessage.forEach((item) => {
      item.checkboxState = false
    })
    return state.set('passengerMessage', Immutable.fromJS(passengerMessage))
  },
  passengerAddMessageDeleteStateChange (state, action) {
    return state.update('passengerAddMessageDeleteState', v => !v)
  },
  passengerAddMessageDeleteStateFalse (state, action) {
    return state.set('passengerAddMessageDeleteState', false)
  },
  passengerAddUnloading (state, action) {
    return state.set('documentNumberType', 0)
    .set('passengerAddDocumentNumber', '')
    .set('passengerAddGender', 0)
    .set('nameCHS1', '')
    .set('nameCHS2', '')
    .set('nameEN1', '')
    .set('nameEN2', '')
    .set('passengerAddMobile', '')
  },
  divShow (state, action) {
    return state.set('documentNumberChosen', true)
  },
  divHidden (state, action) {
    return state.set('documentNumberChosen', false)
  },
  documentNumberTypeChange (state, action) {
    return state.set('documentNumberType', action.e)
  },
  passengerAddGenderMale (state, action) {
    return state.update('passengerAddGender', v => {
      if (v === 1) {
        return 0
      } else {
        return 1
      }
    })
  },
  passengerAddGenderFemale (state, action) {
    return state.update('passengerAddGender', v => {
      if (v === 2) {
        return 0
      } else {
        return 2
      }
    })
  },
  passengerAddDocumentNumberChange (state, action) {
    return state.set('passengerAddDocumentNumber', action.value)
  },
  nameCHS1Change (state, action) {
    return state.set('nameCHS1', action.e)
  },
  nameCHS2Change (state, action) {
    return state.set('nameCHS2', action.e)
  },
  nameEN1Change (state, action) {
    return state.set('nameEN1', action.e)
  },
  nameEN2Change (state, action) {
    return state.set('nameEN2', action.e)
  },
  passengerAddMobileChange (state, action) {
    return state.set('passengerAddMobile', action.e)
  },
  toPassengerAddView (state, action) {
    return state.set('passengerAddDocumentNumber', action.data.documentNum)
    .set('documentNumberType', action.data.documentNumberType)
    .set('nameCHS1', action.data.nameCHS1)
    .set('nameCHS2', action.data.nameCHS2)
    .set('nameEN1', action.data.nameEN1)
    .set('nameEN2', action.data.nameEN2)
    .set('passengerAddMobile', action.data.mobile)
    .set('passengerAddGender', action.data.gender)
    .set('passengerEditIndex', action.data.index)
  },
  addPassenger (state, action) {
    return state.update('passengerMessage', v => v.push(action.e))
  },
  deletePassenger (state, action) {
    let passengerMessage = state.get('passengerMessage').toJS()
    action.indexArray.forEach((item) => {
      passengerMessage.splice(item, 1)
    })
    return state.set('passengerMessage', Immutable.fromJS(passengerMessage))
  },
  editPassenger (state, action) {
    return state.update('passengerMessage', v => v.splice(action.passengerEditData.index, 1, action.passengerEditData.data))
    .set('passengerEditIndex', 0)
  },
  passengerCheckboxStateChange (state, action) {
    let passengerMessage = state.get('passengerMessage').toJS()
    passengerMessage[action.index].checkboxState = !passengerMessage[action.index].checkboxState
    return state.update('passengerMessage', v => v.splice(action.index, 1, passengerMessage[action.index]))
  }
})
