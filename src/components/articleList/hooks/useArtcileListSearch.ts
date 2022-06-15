import { useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { selectCategoryId, selectSearchText } from "store/slices/search.slice"
import { requestArticleList } from 'api/article';
import { useArtcleListQuery } from "./useArticleListQuery"
import { IArticle } from "types/article"
import { WaterfallRef } from "libs/waterfall";

export const useArticleListSearch = () => {
  const search = useSelector(selectSearchText)
  const categoryId = useSelector(selectCategoryId)
  const prevCategoryId = useRef(categoryId)
  const prevSearch = useRef(search)
  const [articleList, setArticleList] = useState<IArticle[]>([])
  const waterfallRef = useRef<WaterfallRef | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [query, queryDispatch] = useArtcleListQuery()

  const getArticleList = async () => {
    const { reset, ...resetQuery } = query
    //加载
    setIsLoading(true)

    //重置状态
    if (reset) {
      setArticleList([])
      setIsFinished(false)
      waterfallRef.current?.resetHeight()
    }

    if (isFinished && !reset) return
    const list = await requestArticleList(resetQuery)
    setIsLoading(false)

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
    queryDispatch,
    waterfallRef
  }),
    [
      isLoading,
      isFinished,
      articleList,
      queryDispatch,
      waterfallRef
    ]
  )
}
