import { useEffect, useRef, useState } from 'react'
import { CLS_ID, SIZES, TIMINGS } from '../constants/stylesConstants'
import { addEventListener } from '../utils/reactUtils'
import { getVh } from '../utils/sizeUtils'
import useImagesLoaded from './useImagesLoaded'
import useIsMobile from './useIsMobile'

const useFadeIn = (imgLink, desktopOnly = false) => {
  const ref = useRef()
  const isMobile = useIsMobile()
  const noFade = desktopOnly && isMobile
  const [isShowing, setIsShowing] = useState(false)
  const { loaded } = useImagesLoaded(imgLink)

  const getVisibility = () => {
    const { top } = ref.current.getBoundingClientRect()
    if (top <= getVh(SIZES.FADE_IN_VH)) setIsShowing(true)
    else setIsShowing(false)
  }

  useEffect(() => {
    getVisibility()
    return addEventListener(document.getElementById(CLS_ID.MAIN), 'scroll', getVisibility)
  }, [])

  const opacity = (isShowing || noFade) && loaded ? 1 : 0
  return {
    ref,
    opacity,
    style: {
      opacity: noFade ? undefined : opacity,
      transition: `opacity ${TIMINGS.MIXED_FIGURE_OPACITY}ms ease-in-out`
    }
  }
}

export default useFadeIn