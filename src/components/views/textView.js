import { useWindowSize } from '@uidotdev/usehooks'
import _ from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'
import { JsonLd } from 'react-schemaorg'
import { CLS_ID, SIZES_RESPONSIVE } from '../../constants/stylesConstants'
import { quickArray } from '../../utils/commonUtils'
import { getOrderedData, getTextContainerSize, getTextViewSize } from '../../utils/styleUtils'
import DragContainer from '../common/containers/dragContainer'
import PopUpCitation from '../common/text/popUpCitation'
import Text from '../common/text/text'
import { SEO_TYPES, WEBSITE_SEO } from '../../constants/seoConstants'
import seoServices from '../../services/seoServices'
import { views } from '../../constants/reactConstants'


const TextView = ({
  data,
  isOrdered,
  lineCounts,
  memoizedNodeData,
  handleMemoizeNodeData,
  handleMemoizeLineCounts,
}) => {
  const { width } = useWindowSize()
  const elemH = useMemo(getTextContainerSize, [width])
  const containerRef = useRef()
  const [layoutShifted, setLayoutShifted] = useState()
  const [citation, setCitation] = useState()

  const _lineCounts = lineCounts ?? data.text.map(() => _.random(4, 6, false))
  useEffect(() => {
    if (!lineCounts) handleMemoizeLineCounts(_lineCounts)
  }, [lineCounts])

  const { orderedPositions, scrollSize } = useMemo(() => {
    if (!isOrdered || !containerRef.current) return {}
    const { nodeWidth, colCount, gap, leftMargin, topMargin } = getOrderedData(false)
    const cols = quickArray(colCount)
      .map(col => col * (getTextViewSize() + gap) + leftMargin)

    const heights = Array
      .from(containerRef.current.querySelectorAll(`.${CLS_ID.TEXT_NODE}`))
      .map(elem => {
        const { height, width } = elem.getBoundingClientRect()
        const transformFactor = width / nodeWidth
        return height / transformFactor
      })

    const colAccumulator = quickArray(colCount, () => topMargin)
    const rows = heights.map((height, i) => {
      const col = i % colCount
      const top = colAccumulator[col]
      colAccumulator[col] += height + gap
      return top
    })

    setLayoutShifted()
    return {
      orderedPositions: quickArray(heights.length, i => ({
        i,
        x: cols[i % colCount],
        y: rows[i],
      })),
      scrollSize: Math.max(...colAccumulator)
    }
  }, [isOrdered, width, layoutShifted?.[0], layoutShifted?.[1]])

  useEffect(() => {
    if (!isOrdered) setLayoutShifted()
  }, [isOrdered])

  const handleLayoutShift = (index, isExpanded) => {
    if (isOrdered) setLayoutShifted([index, isExpanded])
  }

  const handleCitationHover = citation => setCitation(citation)

  return (
    <>
      <JsonLd item={seoServices.getWebPageSchema(views.text.text)} />
      <DragContainer
        ref={containerRef}
        contents={data.text}
        elemW={SIZES_RESPONSIVE.TEXT_WIDTH[0]}
        elemH={elemH}
        element={Text}
        isOrdered={isOrdered}
        lineCounts={_lineCounts}
        memoizedNodeData={memoizedNodeData}
        orderedPositions={orderedPositions}
        scrollSize={scrollSize}
        handleLayoutShift={handleLayoutShift}
        handleCitationHover={handleCitationHover}
        handleMemoizeNodeData={handleMemoizeNodeData} />
      <PopUpCitation {...citation} />
    </>
  )
}


export default TextView