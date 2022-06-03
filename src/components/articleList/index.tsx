import { useAsync, useHttp } from "hooks/useAsync";
import { useMount } from "hooks/useMount";
import Waterfall from "libs/waterfall";
import { NextPage } from "next";
import { IArticle } from "types/article";
import Item from "./item";

const List:NextPage = () => { 
  const client = useHttp()
  const { data: articleList, run } = useAsync<IArticle[]>()
  
  useMount(() => { 
    run(client('/article/list', {
      method: 'POST',
      data:{
        size: 10,
        page:1
      }
    }))
  })

  return (
    <div>
      <Waterfall
        dataSource={articleList || []}
        nodeKey="id"
        colunm={5}
        renderItem={(article) => <Item article={article}></Item>}
      />
    </div>
  )
}


export default List
