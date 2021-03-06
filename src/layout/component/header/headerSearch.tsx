import { HTMLAttributes, useEffect, useState } from "react"
import { NextPage } from "next"
import { HistoryQuery, Close, Delete } from "@icon-park/react"
import Search from "libs/search"
import confirm from "libs/confirm"
import { store } from "store"
import { useSelector } from "react-redux"
import { useDebounce } from "ahooks"
import { useHint } from "layout/hooks/useHint"
import { searchActions, selectHistorys } from "store/slices/search.slice"
import { useRouter } from "next/router"
import mark from "libs/mark"

// eslint-disable-next-line no-unused-vars
const Hint: NextPage<{ keyword: string, onHintItemClick?: (search: string) => void }> = ({ keyword, onHintItemClick }) => {
  const debounceKeyword = useDebounce(keyword, { wait: 500 })
  const hintList = useHint(debounceKeyword)

  return (
    <div>
      {
        hintList.map((hint, index) => (
          <div
            className="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900 dark:text-zinc-200"
            onClick={() => onHintItemClick && onHintItemClick(hint.title)}
            key={index}
          >
            <div dangerouslySetInnerHTML={{ __html: mark(hint.title, keyword) }} />
          </div>
        ))
      }
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
const History: NextPage<{ onHistoryItemClick: (search: string) => void }> = ({ onHistoryItemClick }) => {
  const historyList = useSelector(selectHistorys)

  const onClearHistory = () => {
    confirm({
      title: '确认',
      content: '是否确认清空历史搜索记录',
      onConfirm() {
        store.dispatch(searchActions.clearHistory())
      }
    })
  }

  return (
    <div>
      <div className="flex items-center text-xs mb-1 text-zinc-400">
        <HistoryQuery className="w-2.5 h-2.5 p-0.5" />
        <span>搜索历史</span>
        <Delete
          className="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100 text-zinc-400"
          onClick={() => onClearHistory()}
        />
      </div>
      <div className="flex flex-wrap">
        {
          historyList.map((history, index) => (
            <div
              className="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5
               text-zinc-900 text-sm font-bold rounded-sm duration-300 dark:bg-zinc-900 
               dark:text-zinc-200"
              key={index}
              onClick={() => onHistoryItemClick(history)}
            >
              <span>{history}</span>
              <Close
                className="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={(evt) => {
                  evt.stopPropagation()
                  store.dispatch(searchActions.deleteHistory(index))
                }}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

const HeaderSearch: NextPage<HTMLAttributes<HTMLElement>> = (props) => {
  const { push, query, prefetch } = useRouter()
  const [searchVal, setSearchValue] = useState("")

  const handleSearch = (search: string) => {
    if (!search) return
    setSearchValue(search)
    push(`/search/${search}`)
    store.dispatch(searchActions.setHistory(search))
  }

  useEffect(() => {
    prefetch('/search/[keyword]','/search/blogs')
  }, [])

  useEffect(() => {
    setSearchValue(() => (query.keyword && typeof query.keyword === 'string') ? query.keyword : "")
  }, [
    query
  ])

  return (
    <div {...props}>
      <Search
        value={searchVal}
        onChange={setSearchValue}
        onSearch={handleSearch}
        placeholder="搜索"
        dropdown={(
          <div>
            {
              searchVal
                ? <Hint keyword={searchVal} onHintItemClick={handleSearch} />
                : <History onHistoryItemClick={handleSearch} />
            }

          </div>
        )}
      />
    </div>
  )
}

export default HeaderSearch
