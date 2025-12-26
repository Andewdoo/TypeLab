import { useEffect } from 'react'

export default function Background() {
  useEffect(() => {
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = '#f9fafb'
    return () => { document.body.style.backgroundColor = prev }
  }, [])

  return null
}