import { Airplane, AddOne } from "@icon-park/react"
import Popover from "libs/popover"
const Floating = () => {

  return (
    <div className=" fixed bottom-10 right-5">
      {/* 引导 */}
      <div className="w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 
      border-zinc-200 rounded-full flex justify-center items-center cursor-pointer 
      duration-200 hover:shadow-lg group hover:text-main text-zinc-900 dark:text-zinc-200 dark:hover:text-main"
      >
        <Airplane className="w-2 h-2" />
      </div>
      {/* 创建文章 */}
      <Popover
        placement="top-left"
        overlay={(
          <div className="w-[140px] overflow-hidden">
            <div className="p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800 text-sm dark:text-zinc-200">
              创建文章
            </div>
          </div>
        )}
      >
        <div className="w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 
      border-zinc-200 rounded-full flex justify-center items-center cursor-pointer 
      duration-200 hover:shadow-lg group hover:text-main text-zinc-900 dark:text-zinc-200 dark:hover:text-main"
        >

          <AddOne className="w-2 h-2" />
        </div>
      </Popover>

    </div>
  )
}

export default Floating
