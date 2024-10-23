import { useEffect, useRef } from 'react'

const useMergedRef = (...refs) => {
  const filteredRefs = refs.filter(r => r)
  const mergedRef = useRef()
  useEffect(() => {
    filteredRefs.forEach(ref => ref.current = mergedRef.current)
  }, [mergedRef])
  return mergedRef
}

export default useMergedRef