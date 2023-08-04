import { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize())

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }
    if (typeof window === 'undefined') {
      return
    }
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])
  return [windowSize]
}

function getWindowSize() {
  if (typeof window === 'undefined') return
  const { innerWidth, innerHeight } = window
  return { innerWidth, innerHeight }
}

export default useWindowSize
