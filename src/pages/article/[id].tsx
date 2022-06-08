import getInitializedDataSource from "db"
import { Article } from "db/enyity/article"
import { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import { IArticle } from "types/article"
import ArticleContent from "./components/articleContent"
import ArticleFloat from "./components/articleFloat"

let timer: any
const ArticleDetail: NextPage<{ article: IArticle }> = ({ article }) => {
  const [status, setStatus] = useState('in')

  useEffect(() => {
    timer = setTimeout(() => {
      setStatus('on')
    })

    return () => {
      clearTimeout(timer)
    }
  },
    []
  )

  return (
    <div
      className="w-screen h-screen dark:bg-zinc-800 relative overflow-x-hidden 
      duration-500 transition-colors scrollbar-thin scrollbar-thumb-zinc-200
    dark:scrollbar-thumb-zinc-900"
    >
      <Head>
        <title>{article.title}</title>
      </Head>
      <ArticleFloat article={article} status={status} />
      <ArticleContent content={ article.content} status={status } />
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
    relations: ['user']
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
