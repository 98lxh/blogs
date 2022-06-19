import { InferGetStaticPropsType, NextPage } from "next"
import ArticleListContainer from "components/listContainer"
import { Fragment } from "react"
import Head from "components/head"
import { getCategorys } from "utils/cache"

const Home: NextPage<InferGetStaticPropsType <typeof getStaticProps>> = ({ categorys }) => {
  return (
    <Fragment>
      <Head />
      <ArticleListContainer categorys={categorys} />
    </Fragment>
  )
}

export const getStaticProps = async () => {
  const categorys = await getCategorys()
  return ({
    props: {
      categorys: JSON.parse(JSON.stringify(categorys))
    }
  })
}

export default Home
