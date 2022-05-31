import { useScroll } from "ahooks"
import { useEffect, useRef, useState } from "react"

export const useMobileSider = () => {
  const [curCategoryIdx, setCurCategoryIdx] = useState(0)
  const siderTargetRef = useRef<HTMLUListElement | null>(null)
  const siderItemsRef = useRef<(HTMLLIElement | null)[]>([])
  const siderTargetScroll = useScroll(siderTargetRef)
  const [siderStyle, setSiderStyle] = useState({
    transform: 'translateX(0px) translateY(-50%)',
    width: '60px'
  })


  useEffect(() => {
    const siderItemRect = siderItemsRef.current[curCategoryIdx]?.getBoundingClientRect()

    if (!siderItemRect || !siderTargetScroll) return

    const { width: siderItemWidth, left: sideritemLeft } = siderItemRect
    const { left: siderTargetScrollLeft } = siderTargetScroll

    //滑块位置 = ul横向滚动 + 当前元素的 left - ul的padding
    setSiderStyle(() => ({
      width: siderItemWidth + 'px',
      transform: `translateX(${siderTargetScrollLeft + sideritemLeft - 10}px) translateY(-50%)`
    }))
  },
    [curCategoryIdx, siderItemsRef]
  )

  return {
    siderItemsRef,
    siderTargetRef,
    siderStyle,
    curCategoryIdx,
    setCurCategoryIdx,
  }
}
