import React from 'react'
import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, FONT_SIZES_RESPONSIVE, FONT_WEIGHTS, SIZES, SIZES_RESPONSIVE } from '../../constants/stylesConstants'
import useIsMobile from '../../hooks/useIsMobile'
import mixins from '../../utils/mixins'
import FullContainer from '../common/containers/fullContainer'
import ExternalLink from '../common/externalLink'

const About = () => {
  const isMobile = useIsMobile()
  const Container = isMobile ? MobileContainer : DesktopContainer
  const InnerContainer = isMobile ? InnerMobileContainer : InnerDesktopContainer

  return (
    <Container>
      <InnerContainer>
        <div>
          <p>
            <i>On the Impulse to Notate</i> assembles an array of
            dialogic encounters. Composed in fragments — written
            and collected, designed and curated — this catalog resists
            linear narrative formulas to favor an open poetic syntax.
          </p>
          <p>
            Here, the designer relies on her propensity to
            notate, aggregate, and persistently recompose.
          </p>
          <p>
            She materializes language that promotes movement
            toward knowledge and craft in conversation.
          </p>
          <p>
            She reads and translates stories spatially, frequently shifting their frames.
          </p>
          <hr />
        </div>
        <CreditContainer>
          <p>designed by <ExternalLink to='https://lydiachodosh.com/'>lydia Chodosh</ExternalLink> + Developed by <ExternalLink to='https://donaldzhu.ca/'>donald Zhu</ExternalLink></p>
          <p>
            This website is a direct translation of the book of the same name,
            designed and written by Lydia Chodosh in partial fulfillment of
            the RISD Graphic Design MFA. © 2024
          </p>
        </CreditContainer>
      </InnerContainer>
    </Container>
  )
}

const DesktopContainer = styled(FullContainer)`
  ${mixins.flex('center', 'center')}
  background-color: ${COLORS.BEIGE};
  min-height: 800px;

  p {
  ${mixins
    .dynamicSizes({
      fontSize: FONT_SIZES_RESPONSIVE.LARGE
    })}
    line-height:  ${FONT_SIZES.LEADING_L.css};
    margin-bottom: ${FONT_SIZES.LEADING_L.css};
  }

  * {
    color: ${COLORS.BROWN};
  }

  hr {
    margin: ${SIZES.ELEM_MARGIN_DESKTOP.mult(1.5).css} 0;
    background-color: ${COLORS.BROWN};
    height: 1.5px;
    border: 0;
  }
`

const MobileContainer = styled(DesktopContainer)`
  padding: 0 ${SIZES.PAGE_MARGIN_MOBILE.css};
  align-items: initial;
  box-sizing: border-box;
  min-height: 100dvh;
  height: auto;
  position: relative;

  &, * {
    overflow: hidden;
  }
`

const InnerDesktopContainer = styled.div`
  ${mixins
    .dynamicSizes({
      width: SIZES_RESPONSIVE.MIXED_VIEW_SECTION_WIDTH
    })}
  flex: none;
  padding: 0 ${SIZES.MIXED_VIEW_TEXT_PADDING.css};
`

const InnerMobileContainer = styled.div`
  max-width: ${SIZES.PAGE_MAX_WIDTH.css};
  padding-top: ${SIZES.PAGE_MARGIN_TOP.css};
`

const CreditContainer = styled.div`
  text-transform: uppercase;

  p {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-size: ${FONT_SIZES.REGULAR.css};

    a {
      font: inherit;
      text-decoration: underline;
      text-underline-offset: 0.15em;
    }

    &:first-child {
      font-weight: ${FONT_WEIGHTS.BOLD};
    }
  }
`

export default About