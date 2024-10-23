import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { views } from '../../../constants/reactConstants'
import { COLORS, SIZES } from '../../../constants/stylesConstants'
import { DesktopContext } from '../../../context/context'
import mixins from '../../../utils/mixins'
import { styleIf } from '../../../utils/styleUtils'
import AboutButton from '../../about/aboutButton'
import Header from './header'
import HeaderButton from './headerButton'
import RightSideNav from './rightSideNav'
import SiteHeader from './siteHeader'

const MenuDesktop = ({
  aboutIsOpened,
  isOrdered,
  isInBlueInsights,
  handleAboutToggle,
  handleOrder
}) => {
  const { getButtonHoverHandlers } = useContext(DesktopContext)
  const buttonHoverHandlers = getButtonHoverHandlers(isInBlueInsights)

  return (
    <HeaderContainer $isBlue={!aboutIsOpened && isInBlueInsights}>
      <SiteHeader
        {...buttonHoverHandlers}
        defaultPath={views.text.url}
        onClick={() => handleAboutToggle(false)} />
      <menu>
        {!aboutIsOpened && Object.values(views).map(({ text, url }, i) =>
          <HeaderButton
            {...buttonHoverHandlers}
            key={i}
            as={Link}
            to={`/${url}`}
            $underline={`#/${url}` === location.hash}>
            {text}
          </HeaderButton>
        )}
      </menu>
      <RightSideNav aboutIsOpened={aboutIsOpened}>
        {
          !aboutIsOpened &&
          `#/${views.mixed.url}` !== location.hash &&
          <HeaderButton
            {...buttonHoverHandlers}
            onClick={handleOrder}
            $underline={isOrdered}>
            Order
          </HeaderButton>
        }
        <AboutButton
          {...buttonHoverHandlers}
          isOpen={aboutIsOpened}
          handleToggle={handleAboutToggle} />
      </RightSideNav>
    </HeaderContainer>
  )
}

const HeaderContainer = styled(Header)`
  ${mixins
    .chain()
    .highZIndex(1)
    .flex('center', 'initial')}
  position: relative;
  menu {
    padding-left: 0;
  }

  &, menu {
    pointer-events: none;
  }

  a, button {
    pointer-events: initial;
    color: ${styleIf('$isBlue', COLORS.BLUE)};
  }

  h1 {
    margin-right: ${SIZES.HEADER_INNER_MARGIN.mult(3).css};
  }

  :nth-child(3) {
    justify-self: end;
    margin-right: 0;
  }
`

export default MenuDesktop