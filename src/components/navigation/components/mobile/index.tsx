import { NextPage } from "next"
import { useState } from "react"
import Popup from "libs/popup"
import { HamburgerButton } from "@icon-park/react"
import { ICaytegory } from "types/category"
import { useMobileSider } from "components/navigation/hooks/useMobileSider"
import { NavigationProps } from "components/navigation"



// eslint-disable-next-line no-unused-vars
const PopupMenu: NextPage<{ categorys: ICaytegory[], onItemClick: (curIndex: number) => void }> = ({ categorys, onItemClick }) => {

  return (
    <div className="py-2 h-[80vh] flex flex-col text-zinc-900 dark:text-zinc-200">
      <h2 className="text-xl font-bold mb-2 px-1">所有分类</h2>
      <ul className="overflow-x-auto">
        {
          categorys.map((category, index) => (
            <li
              key={category.id}
              className="text-lg px-1 py-1.5 duration-100 dark:text-zinc-300 active:bg-zinc-100 dark:active:bg-zinc-900"
              onClick={() => onItemClick(index)}
            >
              {category.title}
            </li>
          )
          )
        }
      </ul>
    </div>
  )
}

const MobileNavgation: NextPage<NavigationProps> =
  ({ categorys,
    setCurCategoryIdx,
    curCategoryIdx,
    setCategory
  }) => {
    const { siderItemsRef, siderTargetRef, siderStyle } = useMobileSider({ setCurCategoryIdx, curCategoryIdx })
    const [visiblePopup, setVisiblePopup] = useState(false)

    return (
      <div className="bg-white sticky top-0 z-10 dark:bg-zinc-900 duration-500 transition-colors">
        <ul
          className="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden last:mr-4 scrollbar-thin scrollbar-thumb-transparent"
          ref={siderTargetRef}
        >
          {/* 弹出层按钮 */}
          <li
            className="fixed top-0 right-[-1px] h-3.5 px-1 flex items-center bg-white z-20 shadow-l-white dark:bg-zinc-900 dark:shadow-l-zinc"
            onClick={() => setVisiblePopup(true)}
          >
            <HamburgerButton className="h-1.5 w-1.5" />
          </li>
          {/* 滑块 */}
          <li
            style={siderStyle}
            className="absolute h-[20px] bg-gray-700 top-1/2 rounded-lg duration-150 dark:bg-zinc-800" />

          {
            categorys.map((category, index) => (
              <li
                className={`shrink-0 px-1.5 py-0 z-10 duration-150 ${curCategoryIdx === index && 'text-zinc-100'}`}
                key={category.id}
                onClick={() => {
                  setCurCategoryIdx(index)
                  setCategory(category.title)
                }}
                ref={siderItem => siderItemsRef.current[index] = siderItem}
              >
                {category.title}
              </li>
            ))
          }
        </ul>
        <Popup
          visible={visiblePopup}
          onClose={() => setVisiblePopup(false)}
        >
          <PopupMenu
            categorys={categorys}
            onItemClick={(index: number) => {
              setCurCategoryIdx(index)
              setCategory(categorys[index].title)
              setVisiblePopup(false)
            }}
          />
        </Popup>
      </div>
    )
  }

export default MobileNavgation
