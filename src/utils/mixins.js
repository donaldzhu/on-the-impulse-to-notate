import * as changeCase from 'change-case'
import _ from 'lodash'
import { COLORS, SIZES } from '../constants/stylesConstants'
import { arrayify, loopObject, validateString } from './commonUtils'
import { getSize, desktopQueries, mobileQueries } from './sizeUtils'
import Size from './helpers/size'

const flex = (
  alignItems = 'initial',
  justifyContent = 'initial',
  isInLine = false
) => `
  display: ${validateString(isInLine, 'inline-')}flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
`

const highZIndex = level => `z-index: ${'9'.repeat(level)};`

// cursor: move;
const draggable = () => `
  user-select: none;
  position: absolute;
`

const paragraphSpacing = (lineHeights, isMobile) => {
  const string = `
  ${dynamicSizes({ lineHeight: lineHeights }, isMobile)};

  &:not(:first-of-type){
    ${dynamicSizes({ paddingTop: lineHeights }, isMobile)};
  }
`
  return string
}

const noScrollBar = () => `
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const underline = () => `
  text-decoration: underline;
  text-underline-offset: ${SIZES.UNDERLINE_OFFSET.css};
`

const border = (strokeWidth = 1, { isBottom = true, color = COLORS.BROWN } = {}) => `
  border${validateString(isBottom, '-bottom')}: ${color} ${strokeWidth}px solid;
`


const dynamicSizes = (config, isMobile) => {
  const fallbackValues = {}
  const breakpts = isMobile ? [undefined, 'xs', 's', 'm'] : ['s', 'm', 'l', 'xl', 'xxl']
  const queries = isMobile ? mobileQueries : desktopQueries
  return breakpts.reduce((cssStatement, _, i, breakpoints) => {
    let cssStyles = ''
    loopObject(config, (styleName, sizes) => {
      styleName = changeCase.kebabCase(styleName)
      sizes = [arrayify(sizes)[0], ...arrayify(sizes)]
      const sizeValue = sizes[i] ?? fallbackValues[styleName]
      fallbackValues[styleName] = sizeValue

      if (!sizeValue) return
      if (typeof sizeValue === 'string')
        return cssStyles += (`${styleName}: ${sizeValue};`)

      const nextSizeValue = sizes[i + 1]

      const size = (nextSizeValue && sizeValue !== nextSizeValue) ?
        getSize({ [breakpoints[i]]: sizeValue, [breakpoints[i + 1]]: nextSizeValue }) :
        new Size(sizeValue)

      cssStyles += (`${styleName}: ${validateString(size?.css)};`)
    })
    return cssStatement += `@media screen and ${queries[i]} {${cssStyles}};`
  }, '')
}


const mixins = {
  flex,
  highZIndex,
  draggable,
  paragraphSpacing,
  noScrollBar,
  underline,
  border,
  dynamicSizes,
  chain: function () {
    const chainedObject = {}
    let accumulatedReturn = ''
    loopObject(_.omit(mixins, 'chain'), (mixinName, originalMixin) => {
      chainedObject[mixinName] = function (...args) {
        accumulatedReturn += originalMixin(...args)
        const returnFunction = () => accumulatedReturn
        return Object.assign(returnFunction, this)
      }
    })
    return chainedObject
  }
}

export default mixins