import _ from 'lodash'
import breakpts from '../../data/breakpoints'
import { sortLike } from '../commonUtils'
import { breakptSorted, getRem } from '../sizeUtils'
import Size from './size'

const lHeight = 620
const xxlHeight = 1200
const xxlSmHeight = 800

export class BreakptSizer {
  constructor(breakptSizes) {
    this.breakptSizes = 'xxl' in breakptSizes ?
      {
        ...breakptSizes,
        xxlSm: breakptSizes.xxlSm ?? breakptSizes.xxl
      } : breakptSizes

    const [lowerBreakpt, upperBreakpt] = sortLike(
      Object.keys(_.pick(this.breakptSizes, breakptSorted)),
      breakptSorted
    )

    this.lowerBreakpt = lowerBreakpt
    this.upperBreakpt = upperBreakpt
  }

  getSize(useRem) {
    const remFactor = useRem ? getRem() : 1
    const lowerSize = this.lowerSize * remFactor
    const upperSize = this.upperSize * remFactor
    const { vw, rem } = this.getSlope(lowerSize, upperSize)

    return new Size({ vw, vh: this.vh * 100, rem: _.round(rem, 3) })
  }

  getSlope(lowerSize, upperSize) {
    const upperSizeWidthComponent = upperSize - this.vh * xxlHeight
    const lowerSizeWidthComponent = lowerSize - this.vh * lHeight
    const vw =
      (upperSizeWidthComponent - lowerSizeWidthComponent) /
      (this.upperBreakptWidth - this.lowerBreakptWidth)
    const px = upperSizeWidthComponent - vw * this.upperBreakptWidth
    return { vw: _.round(vw * 100, 3), rem: _.round(px / getRem(), 3) }
  }

  get lowerSize() {
    const size = this.breakptSizes[this.lowerBreakpt]
    if (!size)
      throw new Error(
        `Breaktpoint (${this.lowerBreakpt}px) does not exist in setting.`
      )
    return size
  }

  get upperSize() {
    const size = this.breakptSizes[this.upperBreakpt]
    if (!size)
      throw new Error(
        `Breaktpoint (${this.upperBreakpt}px) does not exist in setting.`
      )
    return size
  }

  get lowerBreakptWidth() {
    return breakpts[this.lowerBreakpt]
  }

  get upperBreakptWidth() {
    return breakpts[this.upperBreakpt]
  }

  get vh() {
    return this.breakptSizes.xxl &&
      this.breakptSizes.xxlSm ?
      (this.breakptSizes.xxl - this.breakptSizes.xxlSm) /
      (xxlHeight - xxlSmHeight) : 0
  }
}
