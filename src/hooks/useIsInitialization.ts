import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectIsMobile, selectThemeType } from "store/system.slice"

export const useIsInitialization = () => {
  const isMoblie = useSelector(selectIsMobile)
  const themeType = useSelector(selectThemeType)
  const [isInitialization, setIsInitialization] = useState(false)

  useEffect(() => {
    setIsInitialization(typeof isMoblie !== 'undefined' && typeof themeType !== 'undefined')
  }, [isMoblie, themeType])

  return isInitialization
}
