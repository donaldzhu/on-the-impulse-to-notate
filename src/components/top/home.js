import { useContext } from 'react'
import { GlobalContext } from '../../context/context'

const Home = ({
  view: View,
  lineCounts,
  memoizedNodeData,
  isOrdered,
  aboutIsOpened,
  mixedViewFragmentIndex,
  handleBlueInsightsIntersect,
  handleFragmentScroll,
  handleMemoizeNodeData,
  handleMemoizeLineCounts,
}) => {
  const { data } = useContext(GlobalContext)
  return data && <View
    data={data}
    isOrdered={isOrdered}
    aboutIsOpened={aboutIsOpened}
    lineCounts={lineCounts}
    memoizedNodeData={memoizedNodeData}
    fragmentIndex={mixedViewFragmentIndex}
    handleBlueInsightsIntersect={handleBlueInsightsIntersect}
    handleMemoizeNodeData={handleMemoizeNodeData}
    handleFragmentScroll={handleFragmentScroll}
    handleMemoizeLineCounts={handleMemoizeLineCounts} />
}

export default Home