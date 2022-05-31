import { NextPage } from "next"
import { ICaytegory } from "types/category"
import Logo from "assets/icons/hamburger.svg"

const MobileNavgation: NextPage<{ categorys: ICaytegory[] }> = ({ categorys }) => {
  return (
    <div className="bg-white sticky top-0 z-10">
      <ul className="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden last:mr-4">
        <li className="fixed top-0 right-[-1px] h-3.5 px-1 flex items-center bg-white z-20 shadow-l-white">
          <Logo className="h-1.5 w-1.5" />
        </li>
        <li className="absolute h-[22px] bg-zinc-900 rounded-lg duration-150">

        </li>
        {
          categorys.map(category => (
            <li
              className="shrink-0 px-1.5 py-0 z-10 duration-150"
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

export default MobileNavgation
