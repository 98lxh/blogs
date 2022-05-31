import { NextPage } from "next"
import React, { useState } from "react"
import SearchIcon from "assets/icons/search.svg"
import SearchButtonIcon from "assets/icons/search-button.svg"
import DeleteIcon from "assets/icons/input-delete.svg"
import { CSSTransition } from "react-transition-group"
import Button from "libs/button"


const Search: NextPage = () => {
  const [show,setIsShow] = useState(false)
  return (
    <div className="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-blue-200">
      <div>
        <SearchIcon className="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2" />
        <input
          className="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 
          caret-zinc-400 rounded-xl text-zinc-900 tracking-wide text-sm font-semibold border: ;
          border-zinc-100 focus:border-blue-300  group-hover:bg-white"
          type="text"
          placeholder="搜索"
          onClick={()=>setIsShow(true)}
        />
        <DeleteIcon
          className="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-8 cursor-pointer"
          onClick={()=>setIsShow(false)}
        />
        {/* 分割线 */}
        <div className="h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200" />
        <Button
          className="absolute translate-y-[-50%] top-[50%] right-1 rounded-full"
          size="small"
          icon={
            <SearchButtonIcon />
          }
        />
      </div>
      <CSSTransition classNames="slider" in={show} unmountOnExit={true} timeout={300}>
        <div
          className="max-h-[368px] w-full text-base overflow-auto 
          bg-white absolute z-20 left-0 top-[56px] p-2
          border border-zinc-200 duration-200 hover:shadow-2xl
          rounded-sm cursor-pointer
          "
        >
          13213
        </div>
      </CSSTransition>
    </div>
  )
 }


export default Search
