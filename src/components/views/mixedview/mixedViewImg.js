import { useEffect } from 'react'
import { COLORS, SIZES_RESPONSIVE } from '../../../constants/stylesConstants'
import useImagesLoaded from '../../../hooks/useImagesLoaded'
import Figure from '../../common/img/figure'
import Citation from '../../common/text/citation'
import ProjectCitation from '../../common/text/projectCitation'
import useIsMobile from '../../../hooks/useIsMobile'
import useFadeIn from '../../../hooks/useFadeIn'
import { getImgAtSize } from '../../../utils/sizeUtils'


const MixedViewImg = ({ nodeData, onLoad, onHoverCitation }) => {
  const { imgLink, isInterview } = nodeData
  const isMobile = useIsMobile()
  const src = getImgAtSize(imgLink, isMobile ? Math.min(600, 450 * window.devicePixelRatio) : 300)
  const { ref, opacity, style } = useFadeIn(src, true)
  const { loaded } = useImagesLoaded(src)
  useEffect(() => { if (loaded) onLoad() }, [loaded])

  return (
    <Citation
      color={isInterview ? COLORS.BLUE : COLORS.BROWN}
      footnote={opacity ? <ProjectCitation {...nodeData} /> : null}
      imgRef={ref}
      onHover={onHoverCitation}>
      <Figure
        ref={ref}
        src={src}
        style={style}
        nodeData={nodeData}
        width={isMobile ? '100%' : undefined}
        maxWidth={isMobile ? undefined : SIZES_RESPONSIVE.MIXED_VIEW_FIGURUE_WIDTH}
        maxHeight={isMobile ? undefined : SIZES_RESPONSIVE.MIXED_VIEW_FIGURUE_HEIGHT}
        bracketNumbers />
    </Citation>
  )
}


export default MixedViewImg