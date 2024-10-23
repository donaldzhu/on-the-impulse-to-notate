import { useContext } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants/stylesConstants'
import { DesktopContext } from '../../context/context'
import { styleIf } from '../../utils/styleUtils'

const ExternalLink = ({ to, children, noHighlight, isInterview }) => {
  const { getButtonHoverHandlers } = useContext(DesktopContext)
  const buttonHoverHandlers = getButtonHoverHandlers(isInterview)
  return (
    <StyledLink {...buttonHoverHandlers} href={to} target='_blank' $noHighlight={noHighlight}>
      {children}
    </StyledLink>
  )
}

const StyledLink = styled.a`
  color: ${styleIf('$noHighlight', '', COLORS.BLUE)};
  text-decoration: underline;
  pointer-events: initial;
`

export default ExternalLink