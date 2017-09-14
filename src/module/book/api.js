/**
 * Created by 熊超超 on 2017/4/19.
 */
import conn, {contactInfoVO} from '$connection'

export const getFlightDate = daysParams => {
  const data = {
    carrier: daysParams.carrier,
    arrCode: daysParams.arrCode,
    depCode: daysParams.depCode,
    depDate: daysParams.flightDate,
    calendarCount: 7
  }
  return conn.post('/priceCalendar.json', data)
    .then(res => ({res})).catch(err => ({err}))
}
//     2 预订查询接口
export const getBookResult = flightParams => {
  const data = {
    carrier: flightParams.carrier,
    arrCode: flightParams.arrCode,
    depCode: flightParams.depCode,
    flightDate: flightParams.flightDate,
    directFlight: flightParams.directFlight,
    initPrices: flightParams.initPrices,
    initTaxes: flightParams.initTaxes,
    tripType: flightParams.tripType,
    adultNum: flightParams.adultCount,
    childNum: flightParams.childCount,
    infantNum: flightParams.infantNum
    // carrier: 'GY',
    // arrCode: 'CSX',
    // depCode: 'KWE',
    // flightDate: '12MAY17',
    // directFlight: 'true',
    // initPrices: 'true',
    // initTaxes: 'true',
    // tripType: '1',
    // adultNum: '1',
    // childNum: '0',
    // infantNum: '0'
  }
  return conn.post('/bookShopping.json', data)
    .then(res => ({res})).catch(err => ({err}))
}

export const getBookResultReturn = flightParams => {
  const data = {
    carrier: flightParams.carrier,
    arrCode: flightParams.depCode,
    depCode: flightParams.arrCode,
    flightDate: flightParams.returnDate,
    directFlight: flightParams.directFlight,
    initPrices: flightParams.initPrices,
    initTaxes: flightParams.initTaxes,
    tripType: flightParams.tripType,
    adultNum: flightParams.adultCount,
    childNum: flightParams.childCount,
    infantNum: flightParams.infantNum
    // carrier: 'GY',
    // arrCode: 'CSX',
    // depCode: 'KWE',
    // flightDate: '12MAY17',
    // directFlight: 'true',
    // initPrices: 'true',
    // initTaxes: 'true',
    // tripType: '1',
    // adultNum: '1',
    // childNum: '0',
    // infantNum: '0'
  }
  return conn.post('/bookShopping.json', data)
    .then(res => ({res})).catch(err => ({err}))
}

export const getPricing = price => {
  let pricingInputBaseInfoList = []
  if (Object.keys(price.priceReturnVO).length === 0) {
    pricingInputBaseInfoList = [price.priceStartVO]
  } else {
    pricingInputBaseInfoList = [price.priceStartVO, price.priceReturnVO]
  }
  const data = {
    carrier: price.carrier,
    adultNumStr: price.adultCount,
    childNumStr: price.childCount,
    infantNumStr: price.infantNum,
    office: 'KWE451',
    pricingInputBaseInfoList: pricingInputBaseInfoList
  }
  return conn.post('/pricing.json', data)
    .then(res => ({res})).catch(err => ({err}))
}

export const creatOrder = ({order, priceInfo}) => {
  let flightInfoVOs = []
  if (Object.keys(order.flightReturnVO).length === 0) {
    flightInfoVOs = [order.flightStartVO]
  } else {
    flightInfoVOs = [order.flightStartVO, order.flightReturnVO]
  }
  let itemInfoVOs = []
  const itemStart = {
    changeHandingCost: '0',
    changeRate: '0',
    currency: priceInfo[0].salesFlightPATFareVO.currencyCode,
    flightSeq: '1',
    insurance: '0',
    itemType: '0',
    orignTicketNo: '0',
    orignTicketPrice: '0',
    otherCost: '0',
    priceVO: {
      amount: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[0].salesFlightPATFareSegFareVO.amount,
      discount: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[0].salesFlightPATFareSegFareVO.discount,
      fareBasis: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[0].salesFlightPATFareSegFareVO.fareBasis
    },
    productVO: {},
    refundAmount: '1040',
    refundHandingCost: '260',
    refundRate: '0',
    taxVOs: [{
      amount: '50.0', // priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[0].salesFlightPATFareTaxList[0].amount,
      code: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[0].salesFlightPATFareTaxList[0].taxCode
    }, {
      amount: '0', // priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[0].salesFlightPATFareTaxList[1].amount,
      code: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[0].salesFlightPATFareTaxList[1].taxCode
    }],
    ticketNo: '0',
    ticketPrice: '0',
    ticketUnit: '0',
    ticketUseConditionVO: {
      change: '允许变更',
      refund: '允许退票',
      transfer: '不允许签转'
    },
    totalPrice: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[0].salesFlightPATFareSegFareVO.amount + 50,
    travelerSeq: '1',
    upgradeCost: '0'
  }
  if (Object.keys(order.flightReturnVO).length === 0) {
    itemInfoVOs = [itemStart]
  } else {
    const itemReturn = {
      changeHandingCost: '0',
      changeRate: '0',
      currency: priceInfo[0].salesFlightPATFareVO.currencyCode,
      flightSeq: '2',
      insurance: '0',
      itemType: '0',
      orignTicketNo: '0',
      orignTicketPrice: '0',
      otherCost: '0',
      priceVO: {
        amount: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[1].salesFlightPATFareSegFareVO.amount,
        discount: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[1].salesFlightPATFareSegFareVO.discount,
        fareBasis: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[1].salesFlightPATFareSegFareVO.fareBasis
      },
      productVO: {},
      refundAmount: '1040',
      refundHandingCost: '260',
      refundRate: '0',
      taxVOs: [{
        amount: '50.0', // priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[1].salesFlightPATFareTaxList[0].amount,
        code: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[1].salesFlightPATFareTaxList[0].taxCode
      }, {
        amount: '0', // priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[1].salesFlightPATFareTaxList[1].amount,
        code: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[1].salesFlightPATFareTaxList[1].taxCode
      }],
      ticketNo: '0',
      ticketPrice: '0',
      ticketUnit: '0',
      ticketUseConditionVO: {
        change: '允许变更',
        refund: '允许退票',
        transfer: '不允许签转'
      },
      totalPrice: priceInfo[0].salesFlightPATFareRuleVO.salesFlightPATFareSegList[1].salesFlightPATFareSegFareVO.amount + 50,
      travelerSeq: '1',
      upgradeCost: '0'
    }
    itemInfoVOs = [itemStart, itemReturn]
  }
  const data = {
    baseBookInfoVO: {
      adultNum: order.adultCount,
      area: 'D',
      bigCustName: '恒拓开源',
      // bigCustNo: 'KWE0000001',
      childNum: order.childCount,
      freeType: '1',
      groupOrder: 'false',
      infantNum: order.infantNum,
      office: 'KWE451',
      orderPromotion: 'B2C',
      orderStatus: '',
      orderType: '0',
      pnrCode: '',
      productName: '测试产品',
      ticketSettleCode: '661',
      volunType: '0'
    },
    contactInfoVO: contactInfoVO,
    flightInfoVOs: flightInfoVOs,
    itemInfoVOs: itemInfoVOs,
    travelerInfoVOs: [{
      age: '40',
      birthDate: '2011-09-11',
      country: 'CN',
      docInfoVO: {
        docNo: '66666666',
        docType: 'NI',
        ssrText: 'SSR FOID GY HK1 NI66666666'
      },
      fqtvInfoVO: {},
      indexInPnr: '1',
      insuranceVO: {
        copies: '1',
        type: '1',
        unitPrice: '20'
      },
      linkPhone: contactInfoVO.contactPhone,
      name: '测试',
      nationality: 'CN',
      pnrCode: '',
      seq: '1',
      sex: '1',
      ticketNo: '0',
      ticketPrice: '0',
      travelerType: 'Adult',
      travelerTypeCode: 'MR'
    }]
  }
  return conn.post('/order/create.json', data)
    .then(res => ({res})).catch(err => ({err}))
}

export const orderPay = () => {
  const data = {
    ifTicketAuto: 'true',
    orderNo: 'B201311080000004',
    paymentInfoVO: {
      bankCode: 'ABC',
      bankName: '中国银行',
      cardNo: '1234123412341234123',
      cardType: '1',
      credCvv2: '',
      credValidDate: '',
      currency: 'CNY',
      dnaBankAddr: 'TESTTESTTESTTEST',
      dnaCardCertAddr: 'TTTTTTTTTTTTTT',
      dnaCardTelephone: '13430329933',
      idNo: '445224198811180611',
      idType: '身份证',
      payCommRate: '4%',
      payMethod: 'DNA',
      phoneNo: '13430329911',
      receiver: 'GY',
      remark: 'TTTTTT',
      totalPayAmount: '4950'
    }
  }
  return conn.post('/order/pay.json', data)
    .then(res => ({res})).catch(err => ({err}))
}

export const orderTicket = orderData => {
  const data = {
    ifSendMessage: 'false',
    orderNo: orderData.orderNo,
    paymentSerialNumber: 'ABCDEF',
    pnrCode: orderData.pnrCode
  }
  // const data = {
  //   ifSendMessage: false,  // True/false，是否同时由服务平台发送出票成功短信,false则由渠道实现
  //   orderNo: orderData.orderNo,
  //   payMethod: '5',   // 0:快钱支付,1:支付宝,2:银联支付,5:易宝支付
  //   paymentSerialNumber: 'ABCDEF'   // 支付流水号
  // }
  return conn.post('/order/pushTicket.json', data)
    .then(res => ({res})).catch(err => ({err}))
}
