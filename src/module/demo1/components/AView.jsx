import PropTypes from 'prop-types'
import React from 'react'

const clickHandler = e => console.log(e.type)
const TestStateless = props => {
  return (<div>
    <span onClick={clickHandler}>{props.title}</span>
  </div>)
}
TestStateless.propTypes = {
  title: PropTypes.string
}
export default TestStateless
