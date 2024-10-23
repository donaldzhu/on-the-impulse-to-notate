import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'


const useIsAbout = () => {
  const location = useLocation()
  return useMemo(() => location.pathname === '/about', [location])
}

export default useIsAbout