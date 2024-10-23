import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import _ from 'lodash'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import styled from 'styled-components'
import { SIZES, TIMINGS } from '../../../constants/stylesConstants'
import useMergedRef from '../../../hooks/useMergedRef'
import { validateString } from '../../../utils/commonUtils'
import mixins from '../../../utils/mixins'
import { getTextContainerSize } from '../../../utils/styleUtils'

const Node = forwardRef(function Node({
  index,
  render,
  zIndex,
  isOrdered,
  shouldAnimate,
  mappedPosition,
  orderedPosition,
  handleToTop,
  handleUnmap,
  handleRender = _.noop,
  handleAnimate,
  ...rest
}, ref) {
  const draggableRef = useRef()
  const scaleTimelineRef = useRef()
  const timeoutRef = useRef()

  const innerRef = useMergedRef(ref)
  const [useMappedPosition, setUseMappedPosition] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [isOrdering, setIsOrdering] = useState(true)

  const [hasAnimated, setHasAnimated] = useState(!shouldAnimate)
  const [childRendered, setChildRendered] = useState(false)

  const containerId = useMemo(() => `node-${_.uniqueId()}`, [])
  const id = `#${containerId}`

  useEffect(() => setUseMappedPosition(true), [mappedPosition])
  useEffect(() => { if (isOrdered) setIsOrdering(true) }, [isOrdered])

  useGSAP(() => {
    if (!childRendered) return

    const delay = !index ? 1 : _.random(0, TIMINGS.NODE_MAX_DELAY / 1000, true)

    timeoutRef.current = setTimeout(() => {
      if (innerRef.current)
        innerRef.current.style.visibility = 'initial'
      const animation = gsap
        .timeline()
        .to(id,
          {
            opacity: 1,
            duration: shouldAnimate ? 0.25 : 0,
            ease: 'back.out(2)',
            onComplete: handleAnimate
          })

      if (!shouldAnimate) return
      animation.fromTo(id,
        { scale: _.random(1.25, 2.25, true) },
        {
          scale: 1,
          duration: _.random(0.75, 1.5, true),
          ease: 'back.out(2)',
          onComplete: () => setHasAnimated(true),
          delay: -0.25
        })
    }, shouldAnimate ? delay * 1000 : 0)
  }, {
    scope: innerRef,
    dependencies: [childRendered]
  })

  useGSAP(() => {
    if (!childRendered || !hasAnimated) return
    const timeline = (scaleTimelineRef.current ??= gsap.timeline())
    if (isHovering) timeline.clear()
    timeline.to(id, {
      scale: isHovering ? 1.225 : 1,
      duration: TIMINGS.NODE_SCALE / 1000,
      ease: 'power1.inOut'
    })
  }, {
    scope: innerRef,
    dependencies: [childRendered, isHovering, hasAnimated]
  })

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const onClick = () => {
    if (!hasAnimated || isOrdered) return
    handleToTop(index)
    setUseMappedPosition(false)
  }

  const onHover = isHovering => {
    if (isOrdered) return
    setIsHovering(isHovering)
    setIsOrdering(false)
  }

  const onUnmap = () => handleUnmap(index, draggableRef.current.state)

  const onCollapse = () => {
    const { y } = draggableRef.current.state
    const newY = SIZES.PAGE_MARGIN_DESKTOP.value
    if (-y >= getTextContainerSize() - newY * 2) {
      draggableRef.current.state.y = newY
      onUnmap()
    }
  }

  return (
    <Draggable
      defaultPosition={mappedPosition}
      position={orderedPosition || (useMappedPosition ? mappedPosition : undefined)}
      ref={draggableRef}
      disabled={isOrdered || isOrdering || !hasAnimated}
      onMouseDown={onClick}
      onStop={onUnmap}>
      <InnerContainer
        ref={innerRef}
        style={{
          zIndex,
          transition: validateString(isOrdered || isOrdering, `transform ${TIMINGS.ORDER}ms ease-in-out`),
          // cursor: isOrdered || !hasAnimated ? 'initial' : 'move'
        }}>
        {render({
          ...rest,
          index,
          id: containerId,
          isOrdered,
          onMouseOver: () => onHover(true),
          onMouseOut: () => onHover(false),
          onHover,
          onCollapse,
          onRender: (...props) => {
            setChildRendered(true)
            handleRender(...props)
          }
        })}
      </InnerContainer>
    </Draggable>
  )
})

const InnerContainer = styled.div`
  ${mixins.draggable}
  visibility: hidden;
  * {
    pointer-events: none;
  }

  > * {
    opacity: 0;
  }
`

export default Node