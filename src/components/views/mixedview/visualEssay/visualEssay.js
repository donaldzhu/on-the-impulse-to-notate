import { useWindowSize } from '@uidotdev/usehooks'
import _ from 'lodash'
import { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { CLS_ID, COLORS, SIZES } from '../../../../constants/stylesConstants'
import useIsMobile from '../../../../hooks/useIsMobile'
import parserServices from '../../../../services/parserServices'
import { addEventListener, getScrolling } from '../../../../utils/reactUtils'
import { extract, styleIf } from '../../../../utils/styleUtils'
import VisualEssayImg from './visualEssayImg'


const VisualEssay = ({ data, sizeData, isBlueInsights, handleBlueInsightsIntersect, onHoverCitation }) => {
  const isMobile = useIsMobile()
  const { width } = useWindowSize()
  const parsedData = useMemo(() =>
    parserServices.parseVisualEssay(data, sizeData, isMobile), [data, sizeData, width])

  const LAST_IMAGE_PROPORTION = isBlueInsights ? 1.4805 : 1.261

  const color = isBlueInsights ? COLORS.BLUE : COLORS.BROWN
  const backgroundColor = isBlueInsights ? COLORS.BLUE_VISUAL : COLORS.BEIGE_VISUAL

  const lastImg = _.maxBy(parsedData, img => img.top.value)
  const height = lastImg.top
    .add(lastImg.width.div(LAST_IMAGE_PROPORTION))
    .add(SIZES.MIXED_VIEW_PADDING_BOTTOM).css

  const ref = useRef()
  useEffect(() => {
    const eventListenerRemover = addEventListener(getScrolling(isMobile), 'scroll', () => {
      if (isBlueInsights) {
        const { top, bottom } = ref.current.getBoundingClientRect()
        handleBlueInsightsIntersect(top <= 0 && bottom > 0)
      }
    })
    return () => {
      eventListenerRemover()
      handleBlueInsightsIntersect(false)
    }
  }, [])

  return (
    <Container
      ref={ref}
      $isMobile={isMobile}
      $height={height}
      $color={color}
      $backgroundColor={backgroundColor}>
      {parsedData.map((data, i) =>
        <VisualEssayImg
          key={i}
          data={data}
          color={color}
          onHoverCitation={onHoverCitation} />)}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;

  box-sizing: border-box;
  height: ${extract('$height')};
  position: relative;

  border-color: ${extract('$color')};
  background-color: ${extract('$backgroundColor')};

  margin: ${SIZES.MIXED_VIEW_INTERVIEW_PADDING_TOP.css} 0;
  padding: 0 ${styleIf('$isMobile', SIZES.PAGE_MARGIN_MOBILE.css, SIZES.PAGE_MARGIN_DESKTOP.css)};

  figure {
    position: absolute;
    min-width: 0;
  }
`

export default VisualEssay