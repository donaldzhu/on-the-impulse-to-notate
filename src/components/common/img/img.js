import _ from 'lodash'
import { useEffect } from 'react'
import { IMG_SRCSET, SIZES_RESPONSIVE } from '../../../constants/stylesConstants'
import useImagesLoaded from '../../../hooks/useImagesLoaded'
import { getImgAtSize } from '../../../utils/sizeUtils'
import Figure from './figure'


const Img = ({
  id,
  index,
  nodeData,
  onRender,
  onMouseOver,
  onMouseOut
}) => {
  const { imgLink } = nodeData
  const src = getImgAtSize(imgLink, 150)
  const { loaded, proportions } = useImagesLoaded(src)

  useEffect(() => {
    if (loaded) onRender(index, proportions)
  }, [loaded])

  return (
    <Figure
      id={id}
      nodeData={nodeData}
      src={src}
      width={SIZES_RESPONSIVE.IMG_VIEW_FIGURE_SIZE}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut} />
  )
}

export default Img