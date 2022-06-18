import { ALL_CATEGORY_ITEM } from "constant"
import getInitializedDataSource from "db"
import { Category } from "db/enyity/category"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { Fragment, useMemo } from "react"
import { ICaytegory } from "types/category"
import ArticleListContainer from "components/listContainer"
import Head from "components/head"

const Categorys: NextPage<{ categorys: ICaytegory[] }> = ({ categorys }) => {
  const { query } = useRouter()
  const category = useMemo(() => (query.category === 'search' ? undefined : query.category) as string | undefined, [query])
  const keyword = useMemo(() => (query.category === 'search' ? query.keyword : undefined) as string | undefined, [query])

  return (
    <Fragment>
      <Head
        title={`${query.category === 'search' ? '搜索 - ' + keyword : category}`}
      />
      <ArticleListContainer
        categorys={categorys}
        keyword={keyword}
        category={category}
      />
    </Fragment>
  )
}


let categorys: ICaytegory[] | null = null
export const getServerSideProps = async () => {
  if (!categorys) { 
    const dataSource = await getInitializedDataSource()
    const categoryRepo = dataSource.getRepository(Category)
    categorys = await categoryRepo.find() as unknown as ICaytegory[]
  }

  return ({
    props: {
      categorys: JSON.parse(JSON.stringify([ALL_CATEGORY_ITEM, ...categorys]))
    }
  })
}

export default Categorys
