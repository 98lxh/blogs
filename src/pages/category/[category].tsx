import { ALL_CATEGORY_ITEM } from "constant"
import { GetStaticProps, NextPage } from "next"
import { Fragment } from "react"
import { ICaytegory } from "types/category"
import ArticleListContainer from "components/listContainer"
import Head from "components/head"
import { getCategorys } from "utils/cache"

interface categoryProps {
  categorys: ICaytegory[]
  category:string
}

const Category: NextPage<categoryProps> = ({ categorys, category }) => {
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



export const getStaticProps: GetStaticProps = async ({ params }) => { 
  const categorys = await getCategorys()
  return {
    props: {
      category:(params as any).category,
      categorys:JSON.parse(JSON.stringify([ALL_CATEGORY_ITEM ,...categorys]))
    }
  }
}

export const getStaticPaths = async () => {
  const categorys = await getCategorys()
  return ({
    paths: categorys.map(category => ({
      params: {category:category.title}
    })),
    fallback:true
  })
}

export default Category
