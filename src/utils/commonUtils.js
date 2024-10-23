import FastPoissonDiskSampling from 'fast-2d-poisson-disk-sampling'
import _ from 'lodash'
import { SPECIAL_NODE_END, SPECIAL_NODE_START } from '../constants/apiConstants'

export const validateString = (validatorOrString, string) => {
  if (!string) return validatorOrString || ''
  return validatorOrString ? string : ''
}

export const loopObject = (object, callback) => {
  Object.keys(object).forEach(key => {
    const value = object[key]
    callback(key, value, object)
  })
  return object
}

export const quickArray = (length, callback = i => i) =>
  Array(length).fill(0).map((_, i) => callback(i))
export const delta = (a, b) => Math.abs(a - b)

export const getDataStringSorter = key => (a, b) => {
  if (!a[key]) return 1
  if (!b[key]) return -1
  return a[key].localeCompare(b[key])
}

const getBounds = points => {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  points.forEach(([x, y]) => {
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  })
  return { minX, maxX, minY, maxY }
}

const genPoisson = (amount, ratio = 1) => {
  const AREA = 10000

  const width = Math.sqrt(AREA / ratio)
  const height = width * ratio

  const pds = new FastPoissonDiskSampling({
    shape: [width, height],
    radius: 3
  })

  const allPoints = pds.fill()
  const pointBounds = getBounds(allPoints)


  const getDistToBound = ([x, y]) => Math.min(
    delta(x, pointBounds.minX),
    delta(x, pointBounds.maxX),
    delta(y, pointBounds.minY),
    delta(y, pointBounds.maxY)
  )

  const points = allPoints
    .sort((a, b) => getDistToBound(a) - getDistToBound(b))

  return points.slice(points.length - amount)
}

export const UNMAPPED_BOUNDS = [0, 100]
export const mapPoisson = (amount, ratio) => {
  const unmappedPoisson = genPoisson(amount, ratio)
  const { minX, maxX, minY, maxY } = getBounds(unmappedPoisson)
  return unmappedPoisson
    .map(([x, y]) => ({
      x: map(x, minX, maxX, ...UNMAPPED_BOUNDS),
      y: map(y, minY, maxY, ...UNMAPPED_BOUNDS)
    }))
}

export const map = (value, inMin, inMax, outMin = 0, outMax = 1) =>
  (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin

export const stringsAreEqual = (stringA, stringB) =>
  stringA.toLocaleUpperCase().trim() ===
  stringB.toLocaleUpperCase().trim()

export const arrayify = possibleArray =>
  Array.isArray(possibleArray) ?
    possibleArray :
    [possibleArray]

export const padNumber = number => _.padStart(number, 3, '0')
export const getSpecialNodeNumber = () => `${padNumber(SPECIAL_NODE_START)}—${padNumber(SPECIAL_NODE_END)}`

export const filterFalsy = array => array.filter(e => e)

export const sortLike = (array, modelArray) =>
  array.sort((a, b) => modelArray.indexOf(a) - modelArray.indexOf(b))
