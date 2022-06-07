import { useHttp } from "hooks/useAsync"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { selectSearchText } from "store/system.slice"
import { IArticle } from "types/article"
import { useArtcleListQuery } from "./useArticleListQuery"

export const useArticleListSearch = (categoryId: number) => {
  const client = useHttp()
  const search = useSelector(selectSearchText)
  const prevCategoryId = useRef(categoryId)
  const prevSearch = useRef(search)
  const [articleList, setArticleList] = useState<IArticle[]>([])
  const [isFinished, setIsFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [query, queryDispatch] = useArtcleListQuery()

  const getArticleList = async () => {
    const { reset, ...resetQuery } = query
    setIsLoading(true)
    if (isFinished && !reset) return
    const list = await client('/article/list', {
      method: 'POST',
      data: resetQuery
    })
    setIsLoading(false)
    reset && setIsFinished(false)

    if (!list) {
      if (resetQuery.search && resetQuery.page === 1) setArticleList([])
      return setIsFinished(true)
    }

    reset ? setArticleList(list) : setArticleList(([...articleList, ...list]))
  }


  useEffect(() => {
    if (prevCategoryId.current !== categoryId) {
      queryDispatch({ type: 'category', data: { categoryId } })
    } else if (prevSearch.current !== search) {
      queryDispatch({ type: 'search', data: { search } })
    } else {
      getArticleList()
    }

    prevCategoryId.current = categoryId
    prevSearch.current = search
  },
    [
      query,
      categoryId,
      search
    ]
  )

  return useMemo(() => ({
    isLoading,
    setIsLoading,
    isFinished,
    articleList,
    queryDispatch
  }),
    [
      isLoading,
      isFinished,
      articleList,
      queryDispatch,
      setIsLoading
    ]
  )
}
