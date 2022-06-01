import { NextPage } from "next"
import React, { FormEventHandler, HTMLAttributes, useRef, useState } from "react"
import { Search as SearchIcon, CloseOne as DeleteIcon} from "@icon-park/react"
import { CSSTransition } from "react-transition-group"
import { useClickAway } from "ahooks"
import Button from "libs/button"


interface SearchProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string
  dropdown?: React.ReactNode
  onClear?: () => void
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void
  // eslint-disable-next-line no-unused-vars
  onSearch?: (searchValue: string) => void
}

const Search: NextPage<SearchProps> = ({ onSearch,onClear ,dropdown, ...inputProps }) => {
  const searchContainerRef = useRef<HTMLDivElement | null>(null)
  const [showDropdown,setShowDropdown] = useState(false)
  const onIputValueChange: FormEventHandler<HTMLInputElement> = (evt) => {
    if (!inputProps.onChange) return
    const target = evt.target as HTMLInputElement
    inputProps.onChange(target.value)
  }

  const onInputSearch = () => {
    onSearch && onSearch(inputProps.value || '')
  }

  useClickAway(() => { 
    setShowDropdown(false)
  },
    searchContainerRef
  )

  return (
    <div
      className="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-blue-200"
      ref={searchContainerRef}
    >
      <div>
        <SearchIcon className="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2" />
        <input
          className="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 
          rounded-xl text-zinc-900 tracking-wide text-sm font-semibold border;
          border-zinc-100 focus:border-blue-300  group-hover:bg-white"
          type="text"
          {...inputProps}
          onFocus={(evt) => { 
            setShowDropdown(true)
            inputProps.onFocus && inputProps.onFocus(evt)
          }}
          onBlur={evt => inputProps.onBlur && inputProps.onBlur(evt)}
          onChange={onIputValueChange}
        />
        <SearchDeleteIcon value={inputProps.value} onChange={inputProps.onChange} onClear={onClear} />
        {/* 分割线 */}
        <div className="h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200" />
        <Button
          className="absolute translate-y-[-50%] top-[50%] right-1.5 rounded-full opacity-0 group-hover:opacity-100 duration-500"
          size="small"
          onClick={onInputSearch}
          icon={
            <SearchIcon />
          }
        />
      </div>
      <CSSTransition classNames="slider-right" in={showDropdown} unmountOnExit={true} timeout={300}>
        <div
          className="max-h-[368px] w-full text-base overflow-auto 
          bg-white absolute z-20 left-0 top-[56px] p-2
          border border-zinc-200 duration-200 hover:shadow-2xl
          rounded-sm cursor-pointer
          "
        >
          {dropdown}
        </div>
      </CSSTransition>
    </div>
  )
}


const SearchDeleteIcon: NextPage<Pick<SearchProps, 'value' | 'onChange' | 'onClear'>> = ({ value, onChange ,onClear}) => {
  return (
    value
      ? (
        <DeleteIcon
          className="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-8 cursor-pointer"
          onClick={() => { 
            onChange && onChange('')
            onClear && onClear()
          }}
        />
      )
      : null
  )
}


export default Search
