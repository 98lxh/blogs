import ArticleList from "components/articleList";
import Navigation from "components/navigation";
import { FC } from "react";
import { ICaytegory } from "types/category";

const ArticleListContainer: FC<{ categorys: ICaytegory[], category?: string, keyword?: string }> = ({
  categorys,
  keyword,
  category
}) => {
  return (
    <div className="h-full overflow-auto bg-white  dark:bg-zinc-800 duration-500 transition-colors scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900">
      <Navigation categorys={categorys} />
      <ArticleList category={category} search={keyword} />
    </div>
  )
}

export default ArticleListContainer
