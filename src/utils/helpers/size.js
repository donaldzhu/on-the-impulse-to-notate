import _ from 'lodash'
import { filterFalsy, validateString } from '../commonUtils'
import { getRem, Unit, getVh, getVw } from '../sizeUtils'

class Size {
  constructor(config) {
    const remFactor = getRem()
    if (typeof config === 'number') {
      this.dvw = 0
      this.dvh = 0
      this.rem = config / remFactor
    } else {
      this.dvw = config.vw ?? 0
      this.dvh = config.vh ?? 0
      this.rem = config.rem ?? 0
    }
  }

  add(addend) {
    return this.calcWithSize(addend, (a, b) => a + b)
  }

  sub(subtrahend) {
    return this.calcWithSize(subtrahend, (a, b) => a - b)
  }

  mult(factor) {
    return this.calcWithNum(factor, (a, b) => a * b)
  }

  div(dividend) {
    return this.calcWithNum(dividend, (a, b) => a / b)
  }

  /**
   * @private
   */
  calcWithSize(targetSize, operation) {
    return new Size({
      vw: operation(this.dvw, targetSize.dvw),
      vh: operation(this.dvh, targetSize.dvh),
      rem: operation(this.rem, targetSize.rem)
    })
  }

  /**
   * @private
   */
  calcWithNum(targetNumber, operation) {
    return new Size({
      vw: operation(this.dvw, targetNumber),
      vh: operation(this.dvh, targetNumber),
      rem: operation(this.rem, targetNumber)
    })
  }

  get css() {
    const units = [Unit.Dvw, Unit.Dvh, Unit.Rem]
    const addends = filterFalsy(units.map(unit => this.returnUnit(unit)))
    return `calc(${addends.join(' + ')})`
  }

  get value() {
    return _.round(getVw(this.dvw) + getVh(this.dvh) + getRem(this.rem), 3)
  }

  /**
   * @private
   */
  returnUnit(unit) {
    return validateString(this[unit], this[unit] + unit)
  }

  static subFromFullWidth(subtrahend) {
    return new Size({ vw: 100 }).sub(subtrahend)
  }

  static subFromFullHeight(subtrahend) {
    return new Size({ vh: 100 }).sub(subtrahend)
  }
}

export default Size
