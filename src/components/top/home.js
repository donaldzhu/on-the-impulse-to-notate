import { useContext } from 'react'
import { GlobalContext } from '../../context/context'

const Home = ({
  view: View,
  memoizedNodeData,
  isOrdered,
  aboutIsOpened,
  mixedViewFragmentIndex,
  handleBlueInsightsIntersect,
  handleFragmentScroll,
  handleMemoizeNodeData,
}) => {
  const { data } = useContext(GlobalContext)
  return data && <View
    data={data}
    isOrdered={isOrdered}
    aboutIsOpened={aboutIsOpened}
    memoizedNodeData={memoizedNodeData}
    fragmentIndex={mixedViewFragmentIndex}
    handleBlueInsightsIntersect={handleBlueInsightsIntersect}
    handleMemoizeNodeData={handleMemoizeNodeData}
    handleFragmentScroll={handleFragmentScroll} />
}

export default Home