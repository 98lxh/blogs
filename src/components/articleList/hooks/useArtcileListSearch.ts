import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { selectCategoryId, selectSearchText } from "store/slices/search.slice"
import { requestArticleList } from 'api/article';
import { useArtcleListQuery } from "./useArticleListQuery"
import { IArticle } from "types/article"

export const useArticleListSearch = () => {
  const search = useSelector(selectSearchText)
  const categoryId = useSelector(selectCategoryId)
  const prevCategoryId = useRef(categoryId)
  const prevSearch = useRef(search)
  const [articleList, setArticleList] = useState<IArticle[]>([])
  const [isFinished, setIsFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [query, queryDispatch] = useArtcleListQuery()

  const getArticleList = useCallback(async () => {
    const { reset, ...resetQuery } = query
    setIsLoading(true)
    if (isFinished && !reset) return
    const list = await requestArticleList(resetQuery)
    setIsLoading(false)
    reset && setIsFinished(false)

    setArticleList(prevList => {
      if (!list) {
        if (resetQuery.search && resetQuery.page === 1) return []
        setIsFinished(true)
        return prevList
      }
      return reset ? list : [...prevList, ...list]
    })
  }, [
    setIsLoading,
    setIsFinished,
    setArticleList,
    isFinished,
    query
  ])

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
      search,
      queryDispatch,
      getArticleList
    ]
  )

  return useMemo(() => ({
    isLoading,
    isFinished,
    articleList,
    queryDispatch
  }),
    [
      isLoading,
      isFinished,
      articleList,
      queryDispatch,
    ]
  )
}
