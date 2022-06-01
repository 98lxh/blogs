import Search from "libs/search"
import { NextPage } from "next"
import { HTMLAttributes, useState } from "react"

const HeaderSearch: NextPage<HTMLAttributes<HTMLElement>> = (props) => { 
  const [searchVal,setSearchValue] = useState('')
  return (
    <div {...props}>
      <Search
        value={searchVal}
        onChange={setSearchValue}
        placeholder="搜索"
        dropdown={(
          <div>
            sdjalisdjoia
          </div>
        )}
      />
    </div>
  )
}

export default HeaderSearch
