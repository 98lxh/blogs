import { useEffect, useRef, useState } from "react"
export const useFloatStatus = () => {
  const [status, setStatus] = useState('in')
  const timer = useRef<any>(null)
  useEffect(() => {
    timer.current = setTimeout(() => {
      setStatus('on')
    })

    return () => {
      clearTimeout(timer.current)
    }
  },
    []
  )
  return status
}
