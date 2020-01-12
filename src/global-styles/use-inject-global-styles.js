import { useEffect, useRef } from 'react'
import { useGlobalStylesCssString } from './use-global-styles'

export function useInjectGlobalStyles() {
  const html = useGlobalStylesCssString()
  const styleNodeRef = useRef()

  useEffect(() => {
    if (!styleNodeRef.current) {
      styleNodeRef.current = document.createElement('style')
      styleNodeRef.current.setAttribute('data-wp-gs', '')

      document.getElementsByTagName('head')[0].appendChild(styleNodeRef.current)
    }
    styleNodeRef.current.innerHTML = html
  }, [html, styleNodeRef])

  useEffect(() => {
    return () => {
      if (styleNodeRef.current) {
        styleNodeRef.current.parentElement.removeChild(styleNodeRef.current)
      }
    }
  }, [styleNodeRef])
}
