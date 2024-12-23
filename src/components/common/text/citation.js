import { useClickAway } from '@uidotdev/usehooks'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../../constants/stylesConstants'
import { DesktopContext } from '../../../context/context'
import useIsMobile from '../../../hooks/useIsMobile'
import { addEventListener } from '../../../utils/reactUtils'


const Citation = ({ children, footnote, color, imgRef, fixedSize, onHover, style }) => {
  const [isHovering, setIsHovering] = useState(false)
  const ref = useClickAway(() => setIsHovering(false))
  const isMobile = useIsMobile()
  const { getCitationHoverHandlers } = useContext(DesktopContext)
  const buttonHoverHandlers = getCitationHoverHandlers(color === COLORS.BLUE)

  useEffect(() => setIsHovering(isHovering), [isHovering])

  useEffect(() => addEventListener(window, 'scroll', () => {
    if (isMobile) {
      setIsHovering(false)
      onHover()
    }
  }), [])

  const handleMouseOver = () => {
    if (!footnote) return
    buttonHoverHandlers?.onMouseOver()
    if (!onHover) return
    onHover({ children: footnote, color, imgRef, fixedSize })
  }

  const handleMouseOut = () => {
    if (!footnote) return
    setIsHovering(false)
    buttonHoverHandlers?.onMouseOut()
    if (!onHover) return
    onHover()
  }

  return (
    <>
      <CitationSpan
        ref={ref}
        style={style}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>
        {children}
      </CitationSpan>
      {/* <PopUpCitation
        color={color}
        imgRef={imgRef}
        fixedSize={fixedSize}>
        {isHovering && !onHover && footnote}
      </PopUpCitation> */}
    </>
  )
}

const CitationSpan = styled.span`
  color: ${COLORS.BLUE};
  height: fit-content;
  /* cursor: default; */
`

export default Citation