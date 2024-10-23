import { useWindowSize } from '@uidotdev/usehooks'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { FRAGMENT_ID_PREFIX } from '../../../constants/reactConstants'
import { COLORS, FONT_SIZES_RESPONSIVE, SIZES, SIZES_RESPONSIVE, TIMINGS } from '../../../constants/stylesConstants'
import useIsMobile from '../../../hooks/useIsMobile'
import parserServices from '../../../services/parserServices'
import { validateString } from '../../../utils/commonUtils'
import mixins from '../../../utils/mixins'
import { getChildrenHeight } from '../../../utils/reactUtils'
import { styleIf } from '../../../utils/styleUtils'
import MixedViewImg from './mixedViewImg'


const MixedViewSection = ({
  data,
  index,
  nodeData,
  isLeft,
  beforeVisualEssay,
  afterVisualEssay,
  sectionHeights,
  onSetHeight,
  onHoverCitation
}) => {
  const {
    text,
    sectionTitle,
    interviewIndex,
    pageNum,
    footnotes,
    projects,
    isInterview
  } = nodeData
  const containerRef = useRef()
  const isMobile = useIsMobile()
  const { width } = useWindowSize()
  const [loadCount, setLoadCount] = useState(0)
  const handleLoad = () => setLoadCount(prev => prev + 1)
  const imgs = useMemo(() => nodeData.getImgNodes(data.main)
    .map((imgNodes, i) => <MixedViewImg
      key={i}
      nodeData={imgNodes}
      onLoad={handleLoad}
      onHoverCitation={onHoverCitation} />
    ), [nodeData])
  const title = ` ${sectionTitle}, P. ${pageNum.join('-')}`.toLocaleUpperCase()

  const textRef = useRef()
  const imgRef = useRef()

  useEffect(() => {
    if (isMobile || loadCount < imgs.length) return
    const imgHeight = getChildrenHeight(imgRef.current, SIZES.ELEM_MARGIN_DESKTOP.value)
    onSetHeight({
      isInterview,
      textHeight: getChildrenHeight(textRef.current),
      imgHeight
    })
  }, [width, loadCount])

  const [bufferPadding, setBufferPadding] = useState()

  useEffect(() => {
    if (
      isMobile ||
      !sectionHeights.every(s => s) ||
      sectionHeights.length === 1
    ) return

    const [current, next, last] = sectionHeights
    const currentTextHeight = current.textHeight +
      (beforeVisualEssay ? 0 : getDesktopPaddingSize({
        $isInterview: next?.isInterview,
        $isFirstInterview: !isInterview && next?.isInterview
      }).value)
    const nextTextHeight = (next.textHeight ?? 0) +
      getDesktopPaddingSize({
        $isInterview: last?.isInterview,
        $isFirstInterview: !next.isInterview && last?.isInterview
      }).value
    const textHeight =
      currentTextHeight +
      (beforeVisualEssay ? 0 : nextTextHeight) -
      SIZES.ELEM_MARGIN_DESKTOP.value * 3

    setBufferPadding(Math.max(
      0,
      current.imgHeight - textHeight,
      beforeVisualEssay ? getDesktopPaddingSize().value : -Infinity
    ))
  }, [width, ...sectionHeights])

  const imgMargin = SIZES.MIXED_VIEW_FIGURE_MARGIN.css
  const ImgContainer = isMobile ? MobileImgContainer : DesktopImgContainer
  const TextContainer = isMobile ? MobileTextContainer : DesktopTextContainer
  const SectionContainer = isMobile ? MobileSectionContainer : DesktopSectionContainer

  const renderImgContainer = useCallback(isLeftContainer => (
    <ImgContainer
      ref={isLeftContainer === isLeft ? imgRef : undefined}
      style={{
        paddingLeft: validateString(!isLeft, imgMargin),
        paddingRight: validateString(isLeft, imgMargin),
      }}
      $isLeft={isLeft} >
      {(isLeftContainer ? isLeft : !isLeft) && imgs}
    </ImgContainer>
  ), [isLeft, imgs])

  return (
    <SectionContainer
      $isMobile={isMobile}
      $isInterview={isInterview}
      $isFirstInterview={!interviewIndex}
      $beforeVisualEssay={beforeVisualEssay}
      $afterVisualEssay={afterVisualEssay}
      id={index ? `${FRAGMENT_ID_PREFIX}${index}` : undefined}
      ref={containerRef}>
      {!isMobile && renderImgContainer(true)}
      <TextContainer
        ref={textRef}
        style={{ paddingBottom: bufferPadding }}
        $isMobile={isMobile}>
        {parserServices.parseTextView(text, {
          title,
          footnotes,
          projects,
          onHover: onHoverCitation
        })}
      </TextContainer>
      {!isMobile && renderImgContainer(false)}
      {isMobile &&
        <ImgContainer>
          {imgs}
        </ImgContainer>}
    </SectionContainer>
  )
}

const BaseImgContainer = styled.div`
 width: 100%;
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
`

const DesktopImgContainer = styled(BaseImgContainer)`
  ${({ $isLeft }) => {
    const flex = `flex-${$isLeft ? 'end' : 'start'}`
    return mixins.flex(flex, 'flex-start')
  }}

  height: 0;

  > span:not(:first-child) {
    margin-top: ${SIZES.ELEM_MARGIN_DESKTOP.css};
  }

 figure:not(:first-child) {
    margin-top: ${SIZES.MIXED_VIEW_FIGURE_MARGIN.css};
  }
`

const MobileImgContainer = styled(BaseImgContainer)`
  background-color: ${COLORS.BEIGE};
  padding: ${SIZES.PAGE_MARGIN_MOBILE.css} ${SIZES.PAGE_MARGIN_MOBILE.css} 0;
  box-sizing: border-box;

  > span {
    width: 100%;
    &:not(:first-child) {
      margin-top: ${SIZES.PAGE_MARGIN_MOBILE.css};
    }
  }
`

const getDesktopPaddingSize = ({ $isInterview, $isFirstInterview } = {}) =>
  !$isInterview ?
    SIZES.MIXED_VIEW_PADDING_TOP :
    SIZES.MIXED_VIEW_INTERVIEW_PADDING_TOP.mult($isFirstInterview ? 2.5 : 1)
const getDesktopPadding = (config = {}) =>
  getDesktopPaddingSize(config).css
const getMobilePadding = ({ $beforeVisualEssay, $isInterview }) =>
  (!$isInterview || $beforeVisualEssay) ?
    SIZES.MIXED_VIEW_PADDING_TOP_MOBILE.css :
    SIZES.MIXED_VIEW_INTERVIEW_PADDING_TOP_MOBILE.css

const BaseTextContainer = styled.div`
  background-color: ${COLORS.BEIGE};
  box-sizing: border-box;

  a {
    font-family:inherit;
    font-size: inherit;
    text-transform: none;
    font-weight: inherit;
    text-decoration: underline;
  }
`

const DesktopTextContainer = styled(BaseTextContainer)`
  ${mixins
    .chain()
    .flex('initial', 'flex-start')
    .dynamicSizes({
      width: SIZES_RESPONSIVE.MIXED_VIEW_SECTION_WIDTH
    })}

  height: 100%;
  padding-left: ${SIZES.MIXED_VIEW_TEXT_PADDING.css};
  padding-right: ${SIZES.MIXED_VIEW_TEXT_PADDING.css};
  flex-direction: column;
  flex: none;

  > p {
    ${mixins
    .chain()
    .dynamicSizes({ fontSize: FONT_SIZES_RESPONSIVE.LARGE },)
    .paragraphSpacing(FONT_SIZES_RESPONSIVE.LEADING_DL)}
    }
`

const MobileTextContainer = styled(BaseTextContainer)`
  padding: 0 ${SIZES.PAGE_MARGIN_MOBILE.css};
  width: 100%;

  > p {
    ${mixins
    .chain()
    .dynamicSizes({ fontSize: FONT_SIZES_RESPONSIVE.MOBILE_REGULAR }, true)
    .paragraphSpacing(FONT_SIZES_RESPONSIVE.MOBILE_LEADING, true)}
  }
`

const BaseSectionContainer = styled.div`
  width: 100%;
  ${BaseTextContainer} {
    &, * {
      color: ${styleIf('$isInterview', COLORS.BLUE)};
    }
  }
`

const DesktopSectionContainer = styled(BaseSectionContainer)`
  display: flex;

  &:first-child {
    ${BaseTextContainer},
    ${BaseImgContainer} {
      padding-top: ${SIZES.MIXED_VIEW_FIRST_PADDING_TOP.css};
    }
  }

  &:not(:first-child) {
    ${BaseTextContainer},
    ${BaseImgContainer} {
      padding-top: ${getDesktopPadding};
    }
  }

  ${BaseTextContainer} {
    padding-bottom: ${({ $beforeVisualEssay }) =>
    $beforeVisualEssay ? getDesktopPadding() : undefined};
  }
`


const MobileSectionContainer = styled(BaseSectionContainer)`
  ${mixins.flex('center', 'initial')}
  flex-direction: column;
  background-color: ${COLORS.BEIGE};

  ${BaseTextContainer} {
    padding-top: ${SIZES.PAGE_MARGIN_TOP.css};
  }

  &:not(:last-child) {
    >:last-child {
      padding-bottom: calc(${getMobilePadding} - ${SIZES.PAGE_MARGIN_TOP.css});
    }
  }

  >:last-child {
    padding-bottom: ${({ $beforeVisualEssay, ...rest }) =>
    $beforeVisualEssay ?
      getMobilePadding({ ...rest }) :
      undefined};
  }

  > div {
    max-width: ${SIZES.PAGE_MAX_WIDTH.css};
  }
`

export default MixedViewSection