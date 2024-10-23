import styled from 'styled-components'
import { validateString } from '../../../utils/commonUtils'
import mixins from '../../../utils/mixins'


const HeaderButton = styled.button`
  ${({ $underline }) => validateString($underline, mixins.underline())};
`

export default HeaderButton