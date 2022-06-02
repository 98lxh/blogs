import { useEffect, useRef } from "react"

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useMountRef = () => {
  const mountRef = useRef(false)

  useEffect(() => {
    setTimeout(() => {
      mountRef.current = true
    }, 500)
    return () => {
      mountRef.current = false
    }
  }, [])

  return mountRef
}
