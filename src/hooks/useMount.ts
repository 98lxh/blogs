import { useEffect, useRef } from "react"

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useMountRef = () => {
  const mountRef = useRef(false)

  useEffect(() => {
    mountRef.current = true
    return () => {
      mountRef.current = false
    }
  }, [])

  return mountRef
}
