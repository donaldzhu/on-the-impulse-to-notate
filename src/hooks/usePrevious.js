import _ from 'lodash'
import { useState } from 'react'

const usePrevious = value => {
  const [current, setCurrent] = useState(value)
  const [previous, setPrevious] = useState(null)

  if (!_.isEqual(value, current)) {
    setPrevious(_.clone(current))
    setCurrent(value)
  }

  return previous
}

export default usePrevious
