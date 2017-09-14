/**
 * Created by 熊超超 on 2017/4/23.
 */
import { hashHistory as history } from 'react-router'
export default {
  go (path) {
    history.push(path)
  },
  replace (path) {
    history.replace(path)
  },
  back () {
    history.go(-1)
  }
}
