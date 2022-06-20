import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsMobile } from "store/slices/system.slice";
import { useArticleListSearch } from "./hooks/useArtcileListSearch";
import Infinite from "libs/infinite";
import Waterfall from "libs/waterfall";
import Item from "./item";

const List: FC<{ search?: string, category?: string }> = (props) => {
  const isMobile = useSelector(selectIsMobile)
  const [complatePosition, setComplatePosition] = useState(false)
  const { articleList, isFinished, isLoading, queryDispatch, waterfallRef } = useArticleListSearch(props)

  return (
    <div
      className="max-w-screen-xl mx-auto relative m-1 lg:mt-4 px-1"
    >
      <Infinite
        isLoading={isLoading}
        isFinished={isFinished}
        onLoad={() => queryDispatch({ type: 'page' })}
      >
        <Waterfall
          dataSource={articleList}
          ref={waterfallRef}
          nodeKey="id"
          picturePreReading={false}
          colunm={isMobile ? 2 : 5}
          onComplatePosition={() => !complatePosition && setComplatePosition(true)}
          renderItem={(article, width) => <Item article={article} width={width} lazy={complatePosition} search={props.search} />}
        />
      </Infinite>
    </div>
  )
}


export default List
