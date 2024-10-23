import useImagesLoaded from '../../../../hooks/useImagesLoaded'

import Figure from '../../../common/img/figure'
import Citation from '../../../common/text/citation'
import ProjectCitation from '../../../common/text/projectCitation'
import useFadeIn from '../../../../hooks/useFadeIn'
import { getImgAtSize } from '../../../../utils/sizeUtils'


const VisualEssayImg = ({ data, color }) => {
  const { nodeData, width, top, left, alignBottom } = data
  const { imgLink } = nodeData
  const src = getImgAtSize(imgLink, Math.min(
    Math.ceil(width.value / 125) * 125 * window.devicePixelRatio, 1000))
  const { proportions } = useImagesLoaded(src)
  const { ref, opacity, style } = useFadeIn(src, true)

  return (
    <Citation
      color={color}
      footnote={opacity ? <ProjectCitation {...nodeData} /> : null}
      imgRef={ref}
      fixedSize>
      <Figure
        ref={ref}
        src={src}
        nodeData={nodeData}
        width={width.css}
        style={{
          ...style,
          left: left.css,
          top: alignBottom ?
            top.sub(width.mult(proportions?.[0] ?? 1)).css :
            top.css,
        }}
        color={color}
        noFade
        bracketNumbers />
    </Citation>
  )
}

export default VisualEssayImg