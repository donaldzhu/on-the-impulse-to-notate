import _ from 'lodash'
import styled from 'styled-components'
import useIsMobile from '../../hooks/useIsMobile'


const AboutButton = ({
  isOpen,
  mobileIndexIsOpen,
  mobileOnClick = _.noop,
  handleToggle,
  ...props
}) => {
  const isMobile = useIsMobile()

  const handleClick = () => {
    if (isOpen && !mobileIndexIsOpen) return handleToggle(false)
    mobileOnClick()
    handleToggle(true)
  }

  return (
    <LinkContainer>
      <button {...props} onClick={handleClick}>
        [{!isOpen ? '+' :
          (isMobile ? (mobileIndexIsOpen ? '+' : '×') : 'CLOSE')}]
      </button>
    </LinkContainer>
  )
}

const LinkContainer = styled.div`
  display: inline;
  padding-left: 1em;
`



export default AboutButton