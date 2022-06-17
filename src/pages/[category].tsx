import ArticleList from "components/articleList"
import Navigation from "components/navigation"
import Head from "next/head"
import { ALL_CATEGORY_ITEM } from "constant"
import getInitializedDataSource from "db"
import { Category } from "db/enyity/category"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { ICaytegory } from "types/category"

const Categorys: NextPage<{ categorys: ICaytegory[] }> = ({ categorys }) => {
  const { query } = useRouter()
  const category = useMemo(() => (query.category === 'search' ? undefined : query.category) as string | undefined, [query])
  const keyword = useMemo(() => (query.category === 'search' ? query.keyword : undefined ) as string | undefined, [query])

  return (
    <div className="h-full overflow-auto bg-white  dark:bg-zinc-800 duration-500 transition-colors scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900">
      <Head><title>{`${query.category === 'search' ? '搜索 - ' + keyword  : query.category} - Blogs`}</title></Head>
      <Navigation categorys={categorys} />
      <ArticleList category={category} search={keyword} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const dataSource = await getInitializedDataSource()
  const categoryRepo = dataSource.getRepository(Category)
  const categorys = await categoryRepo.find()

  return ({
    props: {
      categorys: JSON.parse(JSON.stringify([ALL_CATEGORY_ITEM, ...categorys]))
    }
  })
}

export default Categorys
