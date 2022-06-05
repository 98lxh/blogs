import { useHttp } from "hooks/useAsync";
import Infinite from "libs/infinite";
import Waterfall from "libs/waterfall";
import Item from "./item";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsMobile } from "store/system.slice";
import { IArticle } from "types/article";
import { useListQuery } from "./hooks/useListQuery";

const List: NextPage<{ categoryId: number }> = ({ categoryId }) => {
  const client = useHttp()
  const prevCategoryId = useRef(categoryId)
  const [articleList, setArticleList] = useState<IArticle[]>([])
  const [isFinished, setIsFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [complatePosition, setComplatePosition] = useState(false)
  const isMobile = useSelector(selectIsMobile)
  const [query, queryDispatch] = useListQuery()



  const getArticleList = async () => {
    const { reset, ...resetQuery } = query
    if (isFinished && !reset) return
    setIsLoading(true)
    const list = await client('/article/list', {
      method: 'POST',
      data: resetQuery
    })
    setIsLoading(false)
    reset && setIsFinished(false)
    if (!list) return setIsFinished(true)
    reset ? setArticleList(list) : setArticleList(([...articleList, ...list]))
  }


  useEffect(() => {
    if (prevCategoryId.current !== categoryId) {
      queryDispatch({ type: 'category', data: { categoryId } })
    } else { 
      getArticleList()
    }
    prevCategoryId.current = categoryId
  },
    [
      query,
      categoryId
    ]
  )

  return (
    <div className="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <Infinite
        isLoading={isLoading}
        isFinished={isFinished}
        onLoading={() => queryDispatch({ type: 'page' })}
      >
        <Waterfall
          dataSource={articleList}
          nodeKey="id"
          picturePreReading={false}
          colunm={isMobile ? 2 : 5}
          onComplatePosition={() => !complatePosition && setComplatePosition(true)}
          renderItem={(article, width) => <Item article={article} width={width} lazy={complatePosition} />}
        />
      </Infinite>
    </div>
  )
}


export default List
