import styled from 'styled-components'
import { FONT_SIZES, SIZES } from '../../../constants/stylesConstants'


const Header = styled.div`
  padding-top: ${SIZES.PAGE_MARGIN_DESKTOP.css};

  menu, div {
    line-height: ${FONT_SIZES.LEADING_S.css};
  }
`

export default Header