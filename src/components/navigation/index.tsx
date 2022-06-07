import { NextPage } from "next"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { selectIsMobile } from "store/slices/system.slice"
import { store } from "store"
import { searchActions } from "store/slices/search.slice"
import { ICaytegory } from "types/category"
import MobileNavgation from "./components/mobile"
import PCNavgation from "./components/pc"

export interface NavigationProps { 
  curCategoryIdx: number
  // eslint-disable-next-line no-unused-vars
  setCurCategoryIdx: (value: number) => void
  // eslint-disable-next-line no-unused-vars
  setCategoryId:(value:number) => void
  categorys:ICaytegory[]
}

const Navigation: NextPage<Pick<NavigationProps, 'categorys'>> = ({categorys}) => {
  const [curCategoryIdx, setCurCategoryIdx ] = useState(0)
  const isMobile = useSelector(selectIsMobile)

  const navigationProps = useMemo(()=>({
    curCategoryIdx,
    setCurCategoryIdx,
    setCategoryId:(id:number)=>store.dispatch(searchActions.setCategoryId(id)),
    categorys:categorys || []
  }),
    [categorys,setCurCategoryIdx,curCategoryIdx]
  )

  return (
    isMobile
      ? <MobileNavgation {...navigationProps} />
      : <PCNavgation {...navigationProps} />
  )
}

export default Navigation
