import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { views } from '../../constants/reactConstants'
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
  const onIndexRowClick = index => handleIndexRowClick(index)
  return (
    <>
      <DeviceStyle $isAbout={isAbout} />
      <Container>
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
      </Container>
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

const Container = styled.div`
  position: relative;
`

export default Mobile