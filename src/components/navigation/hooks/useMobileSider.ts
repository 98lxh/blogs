import { useScroll } from "ahooks"
import { useEffect, useRef, useState } from "react"
import { NavigationProps } from "../index"

export const useMobileSider = ({ curCategoryIdx, setCurCategoryIdx }: Pick<NavigationProps, 'curCategoryIdx' | 'setCurCategoryIdx'>) => {
  const siderTargetRef = useRef<HTMLUListElement | null>(null)
  const siderItemsRef = useRef<(HTMLLIElement | null)[]>([])
  const siderTargetScroll = useScroll(siderTargetRef)
  const prevCategoryIdx = useRef(curCategoryIdx)
  const [siderStyle, setSiderStyle] = useState({
    transform: 'translateX(0px) translateY(-50%)',
    width: '52px'
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

    if (
      (siderItemWidth + sideritemLeft > document.body.clientWidth || siderItemWidth + sideritemLeft < 0)
      &&
      prevCategoryIdx.current !== curCategoryIdx
    ) {
      siderTargetRef.current?.scrollTo({ left: siderItemWidth + sideritemLeft })
    }

    prevCategoryIdx.current = curCategoryIdx
  },
    [
      curCategoryIdx,
      siderItemsRef,
      siderTargetScroll
    ]
  )

  return {
    siderItemsRef,
    siderTargetRef,
    siderStyle,
    curCategoryIdx,
    setCurCategoryIdx,
  }
}
