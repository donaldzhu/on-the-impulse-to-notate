import styled from 'styled-components'
import { styleIf } from '../../utils/styleUtils'

const Paragraph = ({ hang, asDiv, ...props }) =>
  <StyledParagraph {...props} as={asDiv ? 'div' : ''} $hang={hang} />


const StyledParagraph = styled.p`
   &, & p {
    text-indent: ${styleIf('$hang', '-0.4em')};
   }
`

export default Paragraph