import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectIsMobile, selectThemeType } from "store/slices/system.slice"

//判断应用是否完成初始化(主题和设备是否拿到)
export const useIsInitialization = () => {
  const isMoblie = useSelector(selectIsMobile)
  const themeType = useSelector(selectThemeType)
  const [isInitialization, setIsInitialization] = useState(false)

  useEffect(() => {
    setIsInitialization(typeof isMoblie !== 'undefined' && typeof themeType !== 'undefined')
  }, [isMoblie, themeType])

  return isInitialization
}
