import { Timeout } from "ahooks/lib/useRequest/src/types";
import ArticleList from "components/articleList";
import Navigation from "components/navigation";
import BackTop from "libs/backTop";
import { FC, useEffect, useRef, useState } from "react";
import { ICategory } from "types/category";

const ArticleListContainer: FC<{ categorys: ICategory[], category?: string, keyword?: string }> = ({
  categorys,
  keyword,
  category
}) => {
  const scrollElement = useRef<HTMLDivElement>(null)
  const [isMountList,setIsMountList] = useState(true)
  const timer = useRef<Timeout | null>(null)
  useEffect(() => { 
    setIsMountList(false)
    timer.current = setTimeout(() => { 
      setIsMountList(true)
    })

    return () => { 
      if (timer.current) clearTimeout(timer.current)
    }
  }, [
    category,
    keyword
  ])

  return (
    <div
      className="h-full overflow-auto bg-white  dark:bg-zinc-800 duration-500 transition-colors scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900"
      ref={scrollElement}
    >
      <Navigation
        categorys={categorys}
      />
      {isMountList && <ArticleList
        category={category}
        search={keyword}
      />}
      <BackTop
        target={scrollElement.current}
      />
    </div>
  )
}

export default ArticleListContainer
