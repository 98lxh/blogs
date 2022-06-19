import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import ArticleListContainer from "components/listContainer"
import { Fragment } from "react"
import { getCacheCategorys } from "utils/cache"
import Head from "components/head"

const Category: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ categorys, category }) => {
  return (
    <Fragment>
      <Head
        title={`${category}`}
      />
      <ArticleListContainer
        categorys={categorys}
        category={category}
      />
    </Fragment>
  )
}



export const getStaticProps: GetStaticProps = async (context) => { 
  const categorys = await getCacheCategorys()
  return {
    props: {
      category:context.params!.category,
      categorys:JSON.parse(JSON.stringify(categorys))
    }
  }
}

export const getStaticPaths = async () => {
  const categorys = await getCacheCategorys()
  return ({
    paths: categorys.map(category => ({
      params: {category:category.title}
    })),
    fallback:true
  })
}

export default Category
