
import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { views } from '../../constants/reactConstants'
import mixins from '../../utils/mixins'
import About from '../about/about'
import MenuMobile from '../common/header/menuMobile'
import IndexMobile from '../indices/indexMobile'
import MixedView from '../views/mixedview/mixedView'
import Home from './home'


const Mobile = ({
  aboutIsOpened,
  mixedViewIndex,
  isInBlueInsights,
  handleBlueInsightsIntersect,
  handleIndexRowClick,
  handleAboutToggle
}) => {
  const [indexIsOpened, setIndexIsOpened] = useState(false)
  const isAbout = aboutIsOpened && !indexIsOpened

  const handleClose = () => setIndexIsOpened(false)
  const navigate = useNavigate()
  const onIndexRowClick = index => handleIndexRowClick(index, navigate)
  return (
    <>
      <DeviceStyle $isAbout={isAbout} />
      <div>
        <MenuMobile
          aboutIsOpened={aboutIsOpened}
          indexIsOpened={indexIsOpened}
          isInBlueInsights={isInBlueInsights}
          onToggleIndex={newState => setIndexIsOpened(newState)}
          handleAboutToggle={handleAboutToggle} />
        <Routes>
          <Route path={`/${views.mixed.url}`} element={
            <Home
              view={MixedView}
              aboutIsOpened={aboutIsOpened}
              mixedViewFragmentIndex={mixedViewIndex}
              handleBlueInsightsIntersect={handleBlueInsightsIntersect}
              handleFragmentScroll={() => onIndexRowClick()} />
          } />
          <Route path='*' element={<Navigate to={`/${views.mixed.url}`} replace />} />
        </Routes>
        {aboutIsOpened && <About />}
        {indexIsOpened && <IndexMobile onRowClick={onIndexRowClick} onClose={handleClose} />}
      </div >
    </>
  )
}


const DeviceStyle = createGlobalStyle`
  body {
    overflow-y: scroll;
    height: 100dvh;
  }

  div {
    overflow-x: hidden;
  }
`


export default Mobile