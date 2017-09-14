/**
 国际化工具
 1、可以设置当前语言
 2、可以获取某字符串
 */
export default {
  languages: ['zh-CN'], // 国际化的语言列表，为了判断语言是否已经国际化
  localeId: 'DC-LOCALE',
  defaultLocale: 'zh-CN', // 默认语言
  setLocale: function (locale) {
    localStorage.setItem(this.localeId, locale)
  },
  // 获取当前语言
  getLocale: function () {
    let currLocale = localStorage.getItem(this.localeId)
    if (!currLocale) {
  // 如果本地没有保存，取浏览器默认的语言
      currLocale = navigator.browserLanguage ? navigator.browserLanguage : navigator.language
    }
    // 判断取出来的语言是否在语言列表里面
    if (this.languages.indexOf(currLocale) === -1) {
      currLocale = this.defaultLocale
    }
    return currLocale
  },
  getString: function (key) {
    let Strings = require('./' + this.getLocale() + '.js').default
    let str = Strings[key]
    return str || key
  }
}
