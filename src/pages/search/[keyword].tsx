import { Fragment } from "react"
import Head from "components/head"
import ArticleListContainer from "components/listContainer"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { getCacheCategorys } from "utils/cache"

const Index: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({ categorys, keyword }) => {
  return (
    <Fragment>
      <Head
        title={`搜索 - ${keyword}`}
      />
      <ArticleListContainer
        categorys={categorys}
        keyword={keyword}
      />
    </Fragment>
  )
}

export const getServerSideProps: GetStaticProps = async (context) => {
  const categorys = await getCacheCategorys()

  return {
    props: {
      categorys: JSON.parse(JSON.stringify(categorys)),
      keyword: context.params!.keyword
    }
  }
}

export default Index
