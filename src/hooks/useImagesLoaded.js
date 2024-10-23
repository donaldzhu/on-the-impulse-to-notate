import _ from 'lodash'
import { useEffect, useState } from 'react'


const useImagesLoaded = (...sources) => {
  const [loadedSources, setLoadedSources] = useState(new Set())
  const [loaded, setLoaded] = useState(false)
  const [proportions, setProportions] = useState(new Array(sources.length))
  const hasSources = sources.filter(s => s).length

  useEffect(() => {
    if (!hasSources) return setLoaded(true)

    sources.forEach((src, i) => {
      const img = document.createElement('img')

      img.onload = () => {
        setLoadedSources(prev => new Set(prev).add(src))
        setProportions((prev) => {
          const newProportions = [...prev]
          newProportions[i] = img.height / img.width
          return newProportions
        })
      }
      img.onerror = err => console.log(err, src)
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (hasSources && loadedSources.size === _.uniq(sources).length)
      setLoaded(true)
  }, [sources.length, loadedSources.size])

  return { loaded, proportions }
}

export default useImagesLoaded