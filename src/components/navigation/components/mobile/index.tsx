import { NextPage } from "next"
import { useState } from "react"
import { ICaytegory } from "types/category"
import Logo from "assets/icons/hamburger.svg"
import { useMobileSider } from "components/navigation/hooks/useMobileSider"
import Popup from "libs/popup"


const PopupMenu: NextPage<{ categorys: ICaytegory[], onItemClick: (curIndex: number) => void }> = ({ categorys, onItemClick }) => {

  return (
    <div className="py-2 h-[80vh] flex flex-col">
      <h2 className="text-xl text-zinc-900 font-bold mb-2 px-1">所有分类</h2>
      <ul className="overflow-scroll">
        {
          categorys.map((category, index) => (
            <li
              key={category.id}
              className="text-lg text-zinc-900 px-1 py-1.5 duration-100"
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

const MobileNavgation: NextPage<{ categorys: ICaytegory[] }> = ({ categorys }) => {
  const { siderItemsRef, siderTargetRef, siderStyle, setCurCategoryIdx, curCategoryIdx } = useMobileSider()
  const [visiblePopup, setVisiblePopup] = useState(false)

  const onClosePopup = () => {
    setVisiblePopup(false)
  }

  return (
    <div className="bg-white sticky top-0 z-10">
      <ul
        className="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden last:mr-4"
        ref={siderTargetRef}
      >
        <li
          className="fixed top-0 right-[-1px] h-3.5 px-1 flex items-center bg-white z-20 shadow-l-white"
          onClick={() => setVisiblePopup(true)}
        >
          <Logo className="h-1.5 w-1.5" />
        </li>
        <li
          style={siderStyle}
          className="absolute h-[20px] bg-gray-700 top-1/2 rounded-lg duration-150" />
        {
          categorys.map((category, index) => (
            <li
              className={`shrink-0 px-1.5 py-0 z-10 duration-150 ${curCategoryIdx === index && 'text-zinc-100'}`}
              key={category.id}
              onClick={() => setCurCategoryIdx(index)}
              ref={siderItem => siderItemsRef.current[index] = siderItem}
            >
              {category.title}
            </li>
          ))
        }
      </ul>
      <Popup
        visible={visiblePopup}
        onClose={onClosePopup}
      >
        <PopupMenu
          categorys={categorys}
          onItemClick={(index: number) => {
            setCurCategoryIdx(index)
            setVisiblePopup(false)
          }}
        />
      </Popup>
    </div>
  )
}

export default MobileNavgation
