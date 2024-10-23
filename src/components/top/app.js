import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import _ from 'lodash'
import { useState } from 'react'
import usePromise from 'react-promise'
import { HashRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { views } from '../../constants/reactConstants'
import { COLORS, FONT_FAMILIES, FONT_SIZES, FONT_WEIGHTS, HYPHEN, SIZES } from '../../constants/stylesConstants'
import { GlobalContext } from '../../context/context'
import useIsMobile from '../../hooks/useIsMobile'
import apiServices from '../../services/apiServices'
import Header from '../common/header/header'
import Desktop from './desktop'
import Mobile from './mobile'

gsap.registerPlugin(useGSAP)

const App = () => {
  const { value: data } = usePromise(apiServices.data)
  const [mixedViewIndex, setMixedViewIndex] = useState()
  const isMobile = useIsMobile()
  const Device = isMobile ? Mobile : Desktop
  const [aboutIsOpened, setAboutIsOpened] = useState(false)
  const [isInBlueInsights, setIsInBlueInsights] = useState(false)

  const handleIndexRowClick = (i, navigate = _.noop) => {
    setMixedViewIndex(i)
    if (!isMobile) navigate(views.mixed.url)
  }

  return (
    <HashRouter>
      <GlobalContext.Provider value={{ data }}>
        <GlobalStyle />
        <Device
          aboutIsOpened={aboutIsOpened}
          mixedViewIndex={mixedViewIndex}
          isInBlueInsights={isInBlueInsights}
          handleBlueInsightsIntersect={isIn => setIsInBlueInsights(isIn)}
          onSetMixedViewIndex={setMixedViewIndex}
          handleAboutToggle={shouldOpen => setAboutIsOpened(shouldOpen)}
          handleIndexRowClick={handleIndexRowClick} />
      </GlobalContext.Provider>
    </HashRouter>
  )
}

const limitChars = `${HYPHEN.MIN_LENGTH} ${HYPHEN.BEFORE} ${HYPHEN.AFTER}`
const GlobalStyle = createGlobalStyle`
 h1, h2, h3, p, button, menu {
    margin: 0;
  }

  h1, h2, h3, button, a {
    font-size: ${FONT_SIZES.REGULAR.css};
    line-height: ${FONT_SIZES.LEADING_S.css};
  }

  h1, h2, h3, p, button, a {
    letter-spacing: 0.02em;
    color: ${COLORS.BROWN};
  }

  h1, h2, h3, ${Header} button, ${Header} a {
    font-weight: ${FONT_WEIGHTS.BOLD};
    font-family: ${FONT_FAMILIES.APERCU};
    text-transform: uppercase;
  }

  a {
    text-decoration: inherit;
  }

  p {
    font-family: ${FONT_FAMILIES.BRADFORD};

    -webkit-hyphens: auto;
    -webkit-hyphenate-limit-before: ${HYPHEN.BEFORE};
    -webkit-hyphenate-limit-after: ${HYPHEN.AFTER};
    -webkit-hyphenate-limit-chars: ${limitChars};
    -webkit-hyphenate-limit-lines: ${HYPHEN.LIMIT_LINES};
    -webkit-hyphenate-limit-last: always;
    -webkit-hyphenate-limit-zone: ${HYPHEN.LIMIT_ZONE};
    -moz-hyphens: auto;
    -moz-hyphenate-limit-chars: ${limitChars};
    -moz-hyphenate-limit-lines: ${HYPHEN.LIMIT_LINES};
    -moz-hyphenate-limit-last: always;
    -moz-hyphenate-limit-zone: ${HYPHEN.LIMIT_ZONE};
    -ms-hyphens: auto;
    -ms-hyphenate-limit-chars: ${limitChars};
    -ms-hyphenate-limit-lines: ${HYPHEN.LIMIT_LINES};
    -ms-hyphenate-limit-last: always;
    -ms-hyphenate-limit-zone: ${HYPHEN.LIMIT_ZONE};
    hyphens: auto;
    hyphenate-limit-chars: ${limitChars};
    hyphenate-limit-lines: ${HYPHEN.LIMIT_LINES};
    hyphenate-limit-last: always;
    hyphenate-limit-zone: ${HYPHEN.LIMIT_ZONE};
  }

  button {
    padding: 0;
    border: none;
    background-color: inherit;
    width: fit-content;
    user-select: none;
    /* cursor: pointer; */
  }

  figure {
    margin: 0;
  }

  > div {
    position: relative;
  }

  ${Header} {
    a {
      margin-right: ${SIZES.HEADER_INNER_MARGIN.css};
    }
  }
`


export default App
