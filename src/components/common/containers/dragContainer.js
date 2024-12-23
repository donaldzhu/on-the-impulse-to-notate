import { useWindowSize } from '@uidotdev/usehooks'
import _ from 'lodash'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { TIMINGS } from '../../../constants/stylesConstants'
import useContainerFadeIn from '../../../hooks/useContainerFadeIn'
import useMergedRef from '../../../hooks/useMergedRef'
import { UNMAPPED_BOUNDS, map, mapPoisson, quickArray, validateString } from '../../../utils/commonUtils'
import { getMainContainer } from '../../../utils/styleUtils'
import FullContainer from './fullContainer'
import Node from './node'


const DragContainer = forwardRef(function DragContainer({
  contents,
  elemW,
  elemH,
  isOrdered,
  element: Element,
  lineCounts,
  memoizedNodeData,
  orderedPositions = [],
  scrollSize,
  handleRender,
  handleMemoizeNodeData,
  handleLayoutShift,
  handleCitationHover
}, ref) {
  const { width, height } = useWindowSize()
  const [zIndices, setZIndices] = useState(
    memoizedNodeData?.zIndices ?? quickArray(contents.length)
  )
  const containerRef = useMergedRef(ref)

  const { left, right, top, bottom } = getMainContainer()
  const defaultUnmappedPositions = useMemo(() =>
    memoizedNodeData?.unmappedPositions ?? _.shuffle(mapPoisson(
      contents.length,
      ((right - left) / (bottom - top)) / (elemW / elemH)
    )), [])

  const [unmappedPositions, setUnmappedPositions] = useState(defaultUnmappedPositions)
  const hasAnimatedRef = useRef(!!memoizedNodeData?.hasAnimated)

  const getPageBounds = () => {
    const { left, right, top, bottom } = getMainContainer()
    const MARGIN_PERCENTAGE = 0.5
    const halfElemW = elemW / 2
    const halfElemH = elemH / 2
    const marginX = halfElemW * MARGIN_PERCENTAGE
    const marginY = halfElemH * MARGIN_PERCENTAGE
    return {
      boundsX: [left + marginX - halfElemW, right - marginX - halfElemW],
      boundsY: [top + marginY - halfElemH, bottom - marginY - halfElemH]
    }
  }

  const convertCoors = ({ x, y }, isMap) => {
    const { boundsX, boundsY } = getPageBounds()
    const allBoundsX = isMap ? [UNMAPPED_BOUNDS, boundsX] : [boundsX, UNMAPPED_BOUNDS]
    const allBoundsY = isMap ? [UNMAPPED_BOUNDS, boundsY] : [boundsY, UNMAPPED_BOUNDS]
    return {
      x: map(x, ...allBoundsX.flat()),
      y: map(y, ...allBoundsY.flat()),
    }
  }

  const mappedPositions = useMemo(() =>
    unmappedPositions.map(({ x, y }) =>
      convertCoors({ x, y }, true)), [width, height, isOrdered])

  useEffect(() => {
    const container = containerRef.current
    if (!isOrdered)
      container.scrollTo({ top: 0, behavior: 'smooth' })
    else container.style.overflow = 'scroll'
  }, [isOrdered])

  const fadeStyle = useContainerFadeIn()
  useEffect(() => {
    containerRef.current.style.overflow = 'hidden'
    return () => {
      handleMemoizeNodeData({
        unmappedPositions, zIndices, hasAnimated: hasAnimatedRef.current
      })
    }
  }, [])

  const handleToTop = i => setZIndices(prev => [..._.without(prev, i), i])

  const handleUnmap = (i, coors) =>
    setUnmappedPositions(prev => {
      const newPositions = [...prev]
      newPositions[i] = convertCoors(coors, false)
      return newPositions
    })

  const handleAnimate = () => hasAnimatedRef.current = true
  const handleUnorderScroll = () => {
    const container = containerRef.current
    if (!container.scrollTop && !isOrdered) container.style.overflow = 'hidden'
  }

  return (
    <StyledContainer
      ref={containerRef}
      style={fadeStyle}
      onScroll={handleUnorderScroll}>
      {contents.map((content, i) =>
        <Node
          {...content}
          key={i}
          index={i}
          nodeData={contents[i]}
          isOrdered={isOrdered}
          shouldAnimate={!memoizedNodeData?.hasAnimated}
          mappedPosition={mappedPositions[i]}
          zIndex={zIndices.indexOf(i) + 1}
          lineCount={lineCounts?.[i]}
          orderedPosition={orderedPositions[i]}
          handleToTop={handleToTop}
          handleUnmap={handleUnmap}
          handleRender={handleRender}
          handleAnimate={handleAnimate}
          handleLayoutShift={handleLayoutShift}
          handleCitationHover={handleCitationHover}
          render={Element} />
      )}
      <ScrollSizer
        style={{
          top: validateString(isOrdered, top),
          height: isOrdered ? `${scrollSize}px` : '100dvh'
        }}
      />
    </StyledContainer>
  )
})

const StyledContainer = styled(FullContainer)`
  /* pointer-events: none; */
  div, figure {
    pointer-events: initial;
  }
`

const ScrollSizer = styled.div`
  width: 100vw;
  position: relative;
  transition: height ${TIMINGS.ORDER}ms ease-in-out;
`

export default DragContainer
