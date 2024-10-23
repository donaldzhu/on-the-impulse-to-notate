import { useEffect } from 'react'
import styled from 'styled-components'
import { FONT_FAMILIES, FONT_SIZES, FONT_SIZES_RESPONSIVE } from '../../../constants/stylesConstants'
import parserServices from '../../../services/parserServices'
import { validateString } from '../../../utils/commonUtils'
import mixins from '../../../utils/mixins'
import useIsMobile from '../../../hooks/useIsMobile'

const ProjectCitation = ({ artistFirstName, artistLastName, medium, workDetails, copyright }) => {
  const isMobile = useIsMobile()

  return (
    <Footnote $isMobile={isMobile}>
      <h3>{artistLastName}{validateString(artistFirstName, `, ${artistFirstName}`)}</h3>
      <h3>{medium}</h3>
      <p>
        <span>{parserServices.parse(workDetails)}</span>
        {copyright && <span> </span>}
        <span>{parserServices.parse(copyright)}</span>
      </p>
    </Footnote>
  )
}


const Footnote = styled.span`
  h3, p {
    ${({ $isMobile }) => mixins.dynamicSizes({ fontSize: FONT_SIZES_RESPONSIVE.SMALL }, $isMobile)}
  }

  h3 {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    ${({ $isMobile }) => mixins.dynamicSizes({ lineHeight: FONT_SIZES_RESPONSIVE.LEADING_XS }, $isMobile)}
  }

  p {
    ${({ $isMobile }) =>
    mixins
      .chain()
      .dynamicSizes({ paddingTop: FONT_SIZES_RESPONSIVE.LEADING_XS }, $isMobile)
      .paragraphSpacing(FONT_SIZES_RESPONSIVE.LEADING_XS, $isMobile)}
    font-family: ${FONT_FAMILIES.APERCU};
  }
`

export default ProjectCitation