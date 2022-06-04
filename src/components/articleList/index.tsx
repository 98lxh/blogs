import { useAsync, useHttp } from "hooks/useAsync";
import { useMount } from "hooks/useMount";
import Waterfall from "libs/waterfall";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import { selectIsMobile } from "store/system.slice";
import { IArticle } from "types/article";
import Item from "./item";

const List:NextPage = () => { 
  const client = useHttp()
  const { data: articleList, run } = useAsync<IArticle[]>()
  const isMobile = useSelector(selectIsMobile)
  
  useMount(() => { 
    run(client('/article/list', {
      method: 'POST',
      data:{
        size: 20,
        page:1
      }
    }))
  })

  return (
    <div>
      <Waterfall
        dataSource={articleList || []}
        nodeKey="id"
        picturePreReading={false}
        colunm={isMobile ? 2 : 5}
        renderItem={(article, width) => <Item article={article} width={width}></Item>}
      />
    </div>
  )
}


export default List
