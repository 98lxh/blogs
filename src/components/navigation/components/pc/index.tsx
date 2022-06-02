import { NextPage } from "next"
import { useState } from "react"
import { DoubleDown, DoubleUp } from "@icon-park/react"
import { NavigationProps } from "components/navigation"

const PCNavgation: NextPage<NavigationProps> = ({ categorys, setCurCategoryIdx, curCategoryIdx }) => {
  const [isOpenCategory, setIsOpenCategory] = useState(false)

  return (
    <div className="bg-white sticky top-0 left-0 w-full z-10 dark:bg-zinc-800 duration-500 transition-colors">
      <ul className={
        `w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto
         ${isOpenCategory ? 'h-[156px]' : 'h-[56px]'}
        `
      }>
        {/* 查看更多箭头 */}
        <div
          className=" absolute right-0 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 text-zinc-900 dark:hover:bg-zinc-900 dark:text-zinc-300"
          onClick={() => setIsOpenCategory(!isOpenCategory)}
        >
          {isOpenCategory ? <DoubleDown className="w-1 h-1" /> : <DoubleUp className="w-1 h-1" />}
        </div>

        {
          categorys.map((category, index) => (
            <li
              className={
                `shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-900 text-sm font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1
                ${index === curCategoryIdx && 'text-zinc-900 bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-900'} dark:text-zinc-500 dark:hover:text-zinc-300
                 dark:hover:bg-zinc-900
                `
              }
              onClick={() => setCurCategoryIdx(index)}
              key={category.id}
            >
              {category.title}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default PCNavgation
