import getInitializedDataSource from "db"
import { Article } from "db/enyity/article"
import { NextPage } from "next"
import { IArticle } from "types/article"
import ArticleHeader from "components/articleDetail/header"
import ArticleContent from "components/articleDetail/content"
import ArticleComment from "components/articleDetail/comment"
import Head from "components/head"
import BackTop from "libs/backTop"
import { useRef } from "react"

const ArticleDetail: NextPage<{ article: IArticle }> = ({ article }) => {
  const scrollElement = useRef<HTMLDivElement>(null)

  return (
    <div
      id="scroll-wrapper"
      ref={scrollElement}
      className="w-screen h-screen dark:bg-zinc-800 relative overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900"
    >
      <Head
        title={article.title}
      />
      <ArticleHeader
        article={article}
      />
      <ArticleContent
        article={article}
      />
      <ArticleComment
        article={article}
        scrollElement={scrollElement.current}
      />
      <BackTop
        target={scrollElement.current}
        visibleHeight={80}
      />
    </div>
  )
}

export const getServerSideProps = async ({ params }: any) => {
  const articleId = params.id
  const dataSource = await getInitializedDataSource()
  const articleRepo = await dataSource.getRepository(Article)

  const article = await articleRepo.findOne({
    where: {
      id: articleId
    },
    relations: ['user', 'category']
  })

  if (article) {
    article.views = article.views + 1
    await articleRepo.save(article)
  }

  return {
    props: {
      article: JSON.parse(JSON.stringify(article))
    }
  }
}

(ArticleDetail as any).noLayout = true

export default ArticleDetail
