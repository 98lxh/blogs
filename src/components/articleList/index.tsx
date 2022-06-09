import { NextPage } from "next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsMobile } from "store/slices/system.slice";
import { useArticleListSearch } from "./hooks/useArtcileListSearch";
import Infinite from "libs/infinite";
import Waterfall from "libs/waterfall";
import Item from "./item";

const List: NextPage = () => {
  const isMobile = useSelector(selectIsMobile)
  const [complatePosition, setComplatePosition] = useState(false)
  const { articleList, isFinished, isLoading, queryDispatch } = useArticleListSearch()

  return (
    <div className="max-w-screen-xl h-screen mx-auto relative m-1 xl:mt-4">
      <Infinite
        isLoading={isLoading}
        isFinished={isFinished}
        onLoad={() => queryDispatch({ type: 'page' })}
      >
        <Waterfall
          dataSource={articleList}
          nodeKey="id"
          picturePreReading={false}
          colunm={isMobile ? 2 : 5}
          onComplatePosition={() => !complatePosition && setComplatePosition(true)}
          renderItem={(article, width) =><Item article={article} width={width} lazy={complatePosition} />}
        />
      </Infinite>
    </div>
  )
}


export default List
