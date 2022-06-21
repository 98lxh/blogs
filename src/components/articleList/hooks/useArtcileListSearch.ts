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
    //加载
    setIsLoading(true)
    //已加载完成
    if (isFinished) return
    const list = await requestArticleList(query)
    setIsLoading(false)
    //没有更多数据
    if (!list) return setIsFinished(true)
    setArticleList(([...articleList, ...list]))
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
