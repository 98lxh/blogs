import { NextPage } from "next"
import getInitializedDataSource from "db"
import { ALL_CATEGORY_ITEM } from "constant"
import { Category } from "db/enyity/category"
import { ICaytegory } from "types/category"
import ArticleListContainer from "components/listContainer"
import { Fragment } from "react"
import Head from "components/head"

const Home: NextPage<{ categorys: ICaytegory[] }> = ({ categorys }) => {
  return (
    <Fragment>
      <Head />
      <ArticleListContainer categorys={categorys} />
    </Fragment>
  )
}

export const getStaticProps = async () => {
  const dataSource = await getInitializedDataSource()
  const categoryRepo = dataSource.getRepository(Category)
  const categorys = await categoryRepo.find()

  return ({
    props: {
      categorys: JSON.parse(JSON.stringify([ALL_CATEGORY_ITEM, ...categorys]))
    }
  })
}

export default Home
