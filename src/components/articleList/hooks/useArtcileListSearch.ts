import { useEffect, useMemo, useRef, useState } from "react"
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

  const getArticleList = async () => {
    const { reset, ...resetQuery } = query
    setIsLoading(true)
    reset && setArticleList([])
    if (isFinished && !reset) return
    const list = await requestArticleList(resetQuery)
    setIsLoading(false)
    reset && setIsFinished(false)

    if (!list) return setIsFinished(true)

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
    // eslint-disable-next-line no-unused-vars
    [
      query,
      categoryId,
      search,
      queryDispatch,
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
