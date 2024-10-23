import _ from 'lodash'
import breakpts from '../data/breakpoints'
import { validateString } from './commonUtils'
import { BreakptSizer } from './helpers/breakptSizer'

export const breakptSorted = ['xs', 's', 'm', 'l', 'xl', 'xxl']

export const remify = px => `${px / getRem(1)}rem`
export const getPx = emString => parseFloat(emString.replace(/rem$/, '')) * getRem()
export const getEmifiedPx = px => getPx(remify(px))

export const Unit = {
  Vw: 'vw',
  Vh: 'vh',
  Dvw: 'dvw',
  Dvh: 'dvh',
  Px: 'px',
  '%': '%',
  Em: 'em',
  Rem: 'rem'
}

const createSuffixFunction = suffix => quantity => `${quantity}${suffix}`
export const px = createSuffixFunction(Unit.Px)
export const vw = createSuffixFunction(Unit.Vw)
export const vh = createSuffixFunction(Unit.Vh)
export const dvw = createSuffixFunction(Unit.Dvw)
export const dvh = createSuffixFunction(Unit.Dvh)
export const percent = createSuffixFunction(Unit['%'])
export const em = createSuffixFunction(Unit.Em)
export const rem = createSuffixFunction(Unit.Rem)

export const getVw = (percentage = 100) => percentage / 100 * window.innerWidth
export const getVh = (percentage = 100) => percentage / 100 * window.innerHeight
export const getRem = (multiplier = 1) => parseFloat(getComputedStyle(
  document.documentElement).fontSize) * multiplier

export const getSize = breakptSizes =>
  new BreakptSizer(breakptSizes).getSize(false)

export const getRemSize = breakptSizes =>
  new BreakptSizer(breakptSizes).getSize(true)

export const getBreakpt = () => {
  const i = [...Object.values(breakpts), Infinity]
    .sort()
    .findIndex(breakpt => breakpt >= window.innerWidth) + 1
  return breakptSorted[Math.min(i, breakptSorted.length - 1)]
}

// Redundant but easy to understand
export const desktopQueries = [
  `(min-width: ${breakpts.s}px) and (max-width: ${breakpts.m - 1}px)`,
  `(min-width: ${breakpts.m}px) and (max-width: ${breakpts.l - 1}px)`,
  `(min-width: ${breakpts.l}px) and (max-width: ${breakpts.xl - 1}px)`,
  `(min-width: ${breakpts.xl}px) and (max-width: ${breakpts.xxl - 1}px)`,
  `(min-width: ${breakpts.xxl}px)`,
]

export const mobileQueries = [
  `(max-width: ${breakpts.xs - 1}px)`,
  `(min-width: ${breakpts.xs}px) and (max-width: ${breakpts.s - 1}px)`,
  `(min-width: ${breakpts.s}px) and (max-width: ${breakpts.m - 1}px)`
]

const MOBILE_BP = breakpts.s
export const MOBILE_QUERY = `max-width: ${MOBILE_BP}px`
export const DESKTOP_QUERY = `min-width: ${MOBILE_BP + 1}px`

export const getImgAtSize = (imgLink, size) => {
  const [folder, fileName] = imgLink.split('/')
  return `assets/${folder}/${size}/${fileName}`
}