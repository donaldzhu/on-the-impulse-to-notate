import styled from 'styled-components'
import { ReactComponent as BarsSvg } from '../../../assets/svg/bars.svg'
import { views } from '../../../constants/reactConstants'
import { COLORS, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import { styleIf } from '../../../utils/styleUtils'
import AboutButton from '../../about/aboutButton'
import Header from './header'
import RightSideNav from './rightSideNav'
import SiteHeader from './siteHeader'

const MenuMobile = ({
  aboutIsOpened,
  indexIsOpened,
  isInBlueInsights,
  onToggleIndex,
  handleAboutToggle
}) => {
  const isBlue = !aboutIsOpened && !indexIsOpened && isInBlueInsights
  return (
    <HeaderContainer
      $isIndex={indexIsOpened}
      $isBlue={isBlue}>
      <SiteHeader defaultPath={views.mixed.url} onClick={() => {
        onToggleIndex(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }} />
      <div>
        <button onClick={() => onToggleIndex(!indexIsOpened)}>
          <BarsSvg />
        </button>
      </div>
      <RightSideNav>
        <AboutButton
          isOpen={aboutIsOpened}
          mobileIndexIsOpen={indexIsOpened}
          mobileOnClick={() => onToggleIndex(false)}
          handleToggle={handleAboutToggle} />
      </RightSideNav>
    </HeaderContainer>
  )
}


const HeaderContainer = styled(Header)`
  ${({ $isBlue }) => mixins
    .chain()
    .highZIndex(5)
    .flex('center', 'initial')
    .border(1, { color: $isBlue ? COLORS.BLUE : COLORS.BROWN })}

  width: 100vw;
  font-size: ${FONT_SIZES.REGULAR.css};
  padding: ${SIZES.PAGE_MARGIN_MOBILE.sub(SIZES.HEADER_BUTTON_PADDING).css};
  box-sizing: border-box;
  position: fixed;
  background-color: ${({ $isIndex }) => $isIndex ? COLORS.BEIGE : 'white'};

  a, button {
    padding: ${SIZES.HEADER_BUTTON_PADDING.css};
    color: ${styleIf('$isBlue', COLORS.BLUE)};
  }

  svg {
    height: 11px;
    color: ${({ $isBlue }) => $isBlue ? COLORS.BLUE : COLORS.BROWN};
    justify-self: flex-start;

    line {
      stroke-width: 25px;
    }
  }

  div:last-child > button {
    padding-bottom: ${SIZES.HEADER_BUTTON_PADDING.mult(1.1).css};
  }
`

export default MenuMobile