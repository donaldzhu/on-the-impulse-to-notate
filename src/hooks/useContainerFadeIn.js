import { useLayoutEffect, useState } from 'react'
import { TIMINGS } from '../constants/stylesConstants'

const useContainerFadeIn = (dependencies = []) => {
  const [fadeStyle, setFadeStyle] = useState({
    opacity: 0,
    transition: `opacity linear ${TIMINGS.MIXED_FIGURE_OPACITY}ms`
  })

  useLayoutEffect(() => {
    setFadeStyle(prev => ({ ...prev, opacity: 1 }))
  }, dependencies)
  return fadeStyle
}

export default useContainerFadeIn