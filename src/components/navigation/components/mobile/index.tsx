import { NextPage } from "next"
import { ICaytegory } from "types/category"
import Logo from "assets/icons/hamburger.svg"
import { useMobileSider } from "components/navigation/hooks/useMobileSider"

const MobileNavgation: NextPage<{ categorys: ICaytegory[] }> = ({ categorys }) => {
  
  const {siderItemsRef, siderTargetRef, siderStyle, setCurCategoryIdx, curCategoryIdx } = useMobileSider()

  return (
    <div className="bg-white sticky top-0 z-10">
      <ul
        className="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden last:mr-4"
        ref={siderTargetRef}
      >
        <li className="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white">
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
    </div>
  )
}

export default MobileNavgation
