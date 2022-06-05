import { useHttp } from "hooks/useAsync";
import { useMount } from "hooks/useMount";
import Infinite from "libs/infinite";
import Waterfall from "libs/waterfall";
import Item from "./item";
import { NextPage } from "next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsMobile } from "store/system.slice";
import { IArticle } from "types/article";

const List: NextPage = () => {
  const client = useHttp()
  const [articleList, setArticleList] = useState<IArticle[]>([])
  const [isFinished, setIsFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [complatePosition,setComplatePosition] = useState(false)
  const isMobile = useSelector(selectIsMobile)
  const [query, setQuery] = useState({
    page: 1,
    size: 20
  })


  const getArticleList = async () => {
    if (isFinished) return

    setIsLoading(true)

    setQuery({
      ...query,
      page: query.page + 1
    })

    const list = await client('/article/list', {
      method: 'POST',
      data: query
    })
    setIsLoading(false)
    if (!list) return setIsFinished(true)

    setArticleList(prevList => ([...prevList, ...list]))
  }

  useMount(() => {
    getArticleList()
  })


  return (
    <div>
      <Infinite
        isLoading={isLoading}
        isFinished={isFinished}
        onLoading={() => getArticleList()}
      >
        <Waterfall
          dataSource={articleList}
          nodeKey="id"
          picturePreReading={false}
          colunm={isMobile ? 2 : 5}
          onComplatePosition={()=>!complatePosition && setComplatePosition(true)}
          renderItem={(article, width) => <Item article={article} width={width} lazy={complatePosition}></Item>}
        />
      </Infinite>
    </div>
  )
}


export default List
