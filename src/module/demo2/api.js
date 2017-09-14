/**
 * Created by 熊超超 on 2017/4/19.
 */
import conn from '$connection'

export const testAxios = () => {
  return conn.get('http://www.qq.com')
    .then(res => ({res})).catch(err => ({err}))
}
