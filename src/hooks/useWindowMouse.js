import { useEffect, useState } from 'react'
import { addEventListener } from '../utils/reactUtils'

const useWindowMouse = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => addEventListener(window, 'mousemove', ({ clientX, clientY }) =>
    setMouse({ x: clientX, y: clientY })))

  return mouse
}

export default useWindowMouse