import { NextPage } from "next"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { selectIsMobile } from "store/slices/system.slice"
import { ICategory } from "types/category"
import MobileNavgation from "./components/mobile"
import PCNavgation from "./components/pc"
import { useRouter } from "next/router"

export interface NavigationProps {
  curCategoryIdx: number
  // eslint-disable-next-line no-unused-vars
  setCurCategoryIdx: (value: number) => void
  // eslint-disable-next-line no-unused-vars
  categorys: ICategory[]
}

const Navigation: NextPage<Pick<NavigationProps, 'categorys'>> = ({ categorys }) => {
  const [curCategoryIdx, setCurCategoryIdx] = useState(0)
  const isMobile = useSelector(selectIsMobile)
  const { query } = useRouter()

  const navigationProps = useMemo(() => ({
    curCategoryIdx,
    setCurCategoryIdx,
    categorys: categorys || []
  }),
    [categorys, setCurCategoryIdx, curCategoryIdx]
  )

  //初始化选择分类
  useEffect(() => {
    if (query.category) {
      setCurCategoryIdx(() => {
        const index = categorys.findIndex(c => c.title === query.category)
        return index < 0 ? 0 : index
      })
    }
  }, [
    query
  ])

  return (
    isMobile
      ? <MobileNavgation {...navigationProps} />
      : <PCNavgation {...navigationProps} />
  )
}

export default Navigation
