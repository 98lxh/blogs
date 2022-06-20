import ArticleList from "components/articleList";
import Navigation from "components/navigation";
import BackTop from "libs/backTop";
import { FC, useRef } from "react";
import { ICategory } from "types/category";

const ArticleListContainer: FC<{ categorys: ICategory[], category?: string, keyword?: string }> = ({
  categorys,
  keyword,
  category
}) => {
  const scrollElement = useRef<HTMLDivElement>(null)
  return (
    <div
      className="h-full overflow-auto bg-white  dark:bg-zinc-800 duration-500 transition-colors scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900"
      ref={scrollElement}
    >
      <Navigation
        categorys={categorys}
      />
      <ArticleList
        category={category}
        search={keyword}
      />
      <BackTop
        target={scrollElement.current}
      />
    </div>
  )
}

export default ArticleListContainer
