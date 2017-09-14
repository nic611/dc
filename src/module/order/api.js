/**
 * Created by 张森峰 on 2017/5/10.
 */
import conn, {contactInfoVO} from '$connection'

export const getOrderHistoryData = (flight) => {
  const data = {
    normalQueryConditionVO: {
      contactPhone: contactInfoVO.contactPhone,
      createBy: '',  // 创建人工号
      flightDateVO: {
        end: '',
        start: ''
      },
      memberCardNo: '',
      orderArea: '0',  // 0国内订单 1国际订单
      orderDateVO: {
        end: '',
        start: ''
      },
      orderPromotion: '',  // 订单渠道 ALL为所有
      orderStatus: '',   // 订单状态：1已提交 2等待支付 3已确认正在支付 4支付失败 5等待出票 6出票完成 7已取消    1/2/3/4代表组合
      orderType: '',  // 订单类型：1普通订单 2升舱订单 3改期订单 4退票订单 1/2/3/4代表全部
      pageNo: '',
      pageNoStr: flight.orderPagesNo,
      // pageNoStr: 2,
      payBank: '',
      payCardType: '',
      payMethod: '',
      payPhone: '',
      travelerIdNo: '',
      travelerName: '',
      verifyBy: ''
    }
  }
  return conn.post('/order/queryList.json', data)
    .then(res => ({res})).catch(err => ({err}))
}

export const cancleTick = tickParams => {
  const data = {
    orderNo: tickParams,
    cancelRemark: 'TEST 测试取消',
    ifDealPnr: 'true'
  }
  return conn.post('/order/cancel.json', data)
    .then(res => ({res})).catch(err => ({err}))
}

export const getOrderDetail = item => {
  const data = {
    orderNo: item
  }
  return conn.post('/order/detail.json', data)
    .then(res => ({res})).catch(err => ({err}))
}
