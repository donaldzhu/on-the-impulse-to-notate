import { useMouse, useWindowSize } from '@uidotdev/usehooks'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as CitationSvg } from '../../assets/svg/cursors/citation.svg'
import { ReactComponent as DefaultSvg } from '../../assets/svg/cursors/default.svg'
import { ReactComponent as LinkSvg } from '../../assets/svg/cursors/link.svg'
import { COLORS, SIZES } from '../../constants/stylesConstants'
import mixins from '../../utils/mixins'
import { styleIf } from '../../utils/styleUtils'

const Mouse = ({ data }) => {
  const { Component, isBlue } = data
  const [mouse] = useMouse()
  const { width } = useWindowSize()
  const cursorSize = useMemo(() => SIZES.CURSOR.value, [width])
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    if (hasShown) return
    if (mouse.x && mouse.y) setHasShown(true)
  }, [hasShown, mouse.x, mouse.y])

  const halfCursorSize = cursorSize / 2
  return (
    <Container
      style={{
        opacity: hasShown ? 1 : 0,
        left: mouse.x - halfCursorSize,
        top: mouse.y - halfCursorSize,
      }}
      $isBlue={isBlue}>
      <Component />
    </Container>
  )
}

const Container = styled.div`
  ${mixins.highZIndex(6)};
  position: fixed;
  pointer-events: none;
  svg {
    color: ${styleIf('$isBlue', COLORS.BLUE, COLORS.BROWN)};
    width: ${SIZES.CURSOR.css};
    height: ${SIZES.CURSOR.css};
  }
`

export default Mouse