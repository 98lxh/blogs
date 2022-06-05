import { NextPage } from "next"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { selectIsMobile } from "store/system.slice"
import MobileNavgation from "./components/mobile"
import PCNavgation from "./components/pc"
import { ICaytegory } from "types/category"

export interface NavigationProps { 
  curCategoryIdx: number
  // eslint-disable-next-line no-unused-vars
  setCurCategoryIdx: (value: number) => void
  // eslint-disable-next-line no-unused-vars
  setCategoryId:(value:number) => void
  categorys:ICaytegory[]
}

const Navigation: NextPage<Pick<NavigationProps, 'categorys' | 'setCategoryId'>> = ({categorys,setCategoryId}) => {
  const [curCategoryIdx, setCurCategoryIdx ] = useState(0)
  const isMobile = useSelector(selectIsMobile)

  const navigationProps = useMemo(()=>({
    curCategoryIdx,
    setCurCategoryIdx,
    setCategoryId,
    categorys:categorys || []
  }),
    [categorys,setCurCategoryIdx,curCategoryIdx,setCategoryId]
  )

  return (
    isMobile
      ? <MobileNavgation {...navigationProps} />
      : <PCNavgation {...navigationProps} />
  )
}

export default Navigation
