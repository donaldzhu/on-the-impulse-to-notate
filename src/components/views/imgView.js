import { useWindowSize } from '@uidotdev/usehooks'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { quickArray } from '../../utils/commonUtils'
import { getImgViewFigureSize, getOrderedData } from '../../utils/styleUtils'
import DragContainer from '../common/containers/dragContainer'
import Img from '../common/img/img'


const ImgView = ({ data, isOrdered, memoizedNodeData, handleMemoizeNodeData }) => {
  const { width } = useWindowSize()
  const [proportions, setProportions] = useState(Array(data.img.length))

  const imgSize = getImgViewFigureSize()
  const { orderedPositions, scrollSize } = useMemo(() => {
    if (!isOrdered) return {}
    const { nodeWidth, colCount, getRowHeight, gap, leftMargin, topMargin } = getOrderedData(true)
    let rows = _.chunk(proportions, colCount)
      .reduce((prev, curr, i) => {
        const nextY = getRowHeight(Math.max(...curr)) + gap + (prev[i - 1] ?? 0)
        prev.push(nextY)
        return prev
      }, [])

    rows.unshift(0)
    rows = rows.map(y => y + topMargin)

    const cols = quickArray(colCount)
      .map(col => col * (nodeWidth + gap) + leftMargin)

    return {
      orderedPositions: quickArray(proportions.length, i => ({
        i,
        x: cols[i % colCount],
        y: rows[Math.floor(i / colCount)],
      })),
      scrollSize: _.last(rows) - rows[0]
    }
  }, [isOrdered, width])

  const handleRender = (index, proportions) =>
    setProportions(prev => {
      const newState = [...prev]
      newState.splice(index, proportions.length, ...proportions)
      return newState
    })

  return (
    <DragContainer
      contents={data.img}
      elemW={imgSize}
      elemH={imgSize}
      element={Img}
      isOrdered={isOrdered}
      memoizedNodeData={memoizedNodeData}
      orderedPositions={orderedPositions}
      scrollSize={scrollSize}
      handleRender={handleRender}
      handleMemoizeNodeData={handleMemoizeNodeData} />
  )
}

export default ImgView