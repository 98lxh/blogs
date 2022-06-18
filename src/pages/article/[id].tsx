import getInitializedDataSource from "db"
import { Article } from "db/enyity/article"
import { NextPage } from "next"
import { IArticle } from "types/article"
import ArticleHeader from "components/articleDetail/headerFloat"
import ArticleContent from "components/articleDetail/content"
import Head from "components/head"

const ArticleDetail: NextPage<{ article: IArticle }> = ({ article }) => {
  
  return (
    <div
      id="scroll-wrapper"
      className="w-screen h-screen dark:bg-zinc-800 relative overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900"
    >
      <Head
        title={article.title}
      />
      <ArticleHeader
        article={article}
      />
      <ArticleContent
        content={article.content}
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
    relations: ['user','category']
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
