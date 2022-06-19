import { InferGetStaticPropsType, NextPage } from "next"
import ArticleListContainer from "components/listContainer"
import { getCacheCategorys } from "utils/cache"
import { Fragment } from "react"
import Head from "components/head"

const Home: NextPage<InferGetStaticPropsType <typeof getStaticProps>> = ({ categorys }) => {
  return (
    <Fragment>
      <Head />
      <ArticleListContainer categorys={categorys} />
    </Fragment>
  )
}

export const getStaticProps = async () => {
  const categorys = await getCacheCategorys()
  return ({
    props: {
      categorys: JSON.parse(JSON.stringify(categorys))
    }
  })
}

export default Home
