import { useLocation, useNavigate } from 'react-router-dom'
import usePrevious from './usePrevious'

const useToPrev = (fallback = '/') => {
  const navigate = useNavigate()
  const location = useLocation()
  const prevLocation = usePrevious(location.pathname)

  const toPrev = () => {
    if (prevLocation) navigate(prevLocation)
    else navigate(fallback)
  }
  return toPrev
}

export default useToPrev