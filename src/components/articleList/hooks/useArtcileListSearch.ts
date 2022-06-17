import { useEffect, useMemo, useRef, useState } from "react"
import { requestArticleList } from 'api/article';
import { useArtcleListQuery } from "./useArticleListQuery"
import { IArticle } from "types/article"
import { WaterfallRef } from "libs/waterfall";

export const useArticleListSearch = ({ search, category }: { search?: string, category?: string }) => {
  const prevCategory = useRef(category)
  const prevSearch = useRef(search)
  const [articleList, setArticleList] = useState<IArticle[]>([])
  const waterfallRef = useRef<WaterfallRef | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [query, queryDispatch] = useArtcleListQuery({ search, category })

  const getArticleList = async () => {
    const { reset, ...resetQuery } = query
    console.log(resetQuery)
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
    if (prevCategory.current !== category && category) {
      queryDispatch({ type: 'category', data: { category } })
    } else if (prevSearch.current !== search) {
      queryDispatch({ type: 'search', data: { search } })
    } else {
      getArticleList()
    }

    prevCategory.current = category
    prevSearch.current = search
  },
    // eslint-disable-next-line no-unused-vars
    [
      query,
      search,
      category,
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
