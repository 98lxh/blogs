import { useRouter } from "next/router"
import { useEffect } from "react"

export const usePrefetch = () => {
  const router = useRouter()
  useEffect(() => {
    router.prefetch('/search/[keyword]')
  }, [])
}
