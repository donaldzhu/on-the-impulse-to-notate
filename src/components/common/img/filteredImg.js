import _ from 'lodash'
import { useState } from 'react'
import styled from 'styled-components'
import useIsMobile from '../../../hooks/useIsMobile'
import mixins from '../../../utils/mixins'

const FilteredImg = ({
  maxWidth,
  maxHeight,
  width,
  height,
  handleLoad = _.noop,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const isMobile = useIsMobile()

  const onLoad = () => {
    handleLoad()
    setIsLoaded(true)
  }

  return (
    <FilterImgContainer
      style={{ opacity: isLoaded ? 1 : 0, }}>
      <StyledImg
        alt=''
        {...rest}
        $width={width}
        $height={height}
        $maxWidth={maxWidth}
        $maxHeight={maxHeight}
        $isMobile={isMobile}
        onLoad={onLoad} />
    </FilterImgContainer>
  )
}

export const FilterImgContainer = styled.div`
  display: flex;
  overflow: hidden;
`

const StyledImg = styled.img`
  object-fit: cover;
  ${({ $width, $height, $maxWidth, $maxHeight, $isMobile }) => mixins
    .dynamicSizes({
      width: $width,
      height: $height,
      maxWidth: $maxWidth,
      maxHeight: $maxHeight
    }, $isMobile)}
  transform: scale(1.005);
`

export default FilteredImg