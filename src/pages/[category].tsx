import Head from "next/head"
import { ALL_CATEGORY_ITEM } from "constant"
import getInitializedDataSource from "db"
import { Category } from "db/enyity/category"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { Fragment, useMemo } from "react"
import { ICaytegory } from "types/category"
import ArticleListContainer from "components/listContainer"

const Categorys: NextPage<{ categorys: ICaytegory[] }> = ({ categorys }) => {
  const { query } = useRouter()
  const category = useMemo(() => (query.category === 'search' ? undefined : query.category) as string | undefined, [query])
  const keyword = useMemo(() => (query.category === 'search' ? query.keyword : undefined) as string | undefined, [query])

  return (
    <Fragment>
      <Head>
        <title>{`${category === 'search' ? '搜索 - ' + keyword : category} - Blogs`}</title>
      </Head>
      <ArticleListContainer
        categorys={categorys}
        keyword={keyword}
        category={category}
      />
    </Fragment>
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
