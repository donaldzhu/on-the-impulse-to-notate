import styled from 'styled-components'
import { FONT_FAMILIES, FONT_SIZES_RESPONSIVE, SIZES_RESPONSIVE } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import { styleIf } from '../../../utils/styleUtils'
import useIsMobile from '../../../hooks/useIsMobile'

const TextHeader = ({ inline, ...rest }) => {
  const isMobile = useIsMobile()
  return <Header {...rest} $isMobile={isMobile} $inline={inline} />
}

const Header = styled.h3`
  ${({ $isMobile }) => mixins
    .dynamicSizes({
      fontSize: $isMobile ?
        FONT_SIZES_RESPONSIVE.TEXT_HEADER_MOBILE :
        FONT_SIZES_RESPONSIVE.TEXT_HEADER,
      lineHeight: $isMobile ?
        FONT_SIZES_RESPONSIVE.LEADING_M_MOBILE :
        FONT_SIZES_RESPONSIVE.LEADING_M,
      marginBottom: SIZES_RESPONSIVE.TEXT_HEADER_MARGIN
    }, $isMobile)}
  font-family: ${FONT_FAMILIES.APERCU_COND};
  display: ${styleIf('$inline', 'inline')};
`

export default TextHeader