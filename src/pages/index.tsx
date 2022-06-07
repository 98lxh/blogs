import { NextPage } from "next"
import getInitializedDataSource from "db"
import Navigation from "components/navigation"
import ArticleList from "components/articleList"
import { ALL_CATEGORY_ITEM } from "constant"
import { Category } from "db/enyity/category"
import { ICaytegory } from "types/category"
import { useState } from "react"

const Home: NextPage<{ categorys: ICaytegory[] }> = ({ categorys }) => { 
  const [categoryId, setCategoryId] = useState(0)
  return (
    <div className="h-full overflow-auto bg-white  dark:bg-zinc-800 duration-500 transition-colors scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900">
      <Navigation categorys={categorys} setCategoryId={setCategoryId } />
      <ArticleList categoryId={categoryId} />
    </div>
  )
}

export const getStaticProps = async () => { 
  const dataSource = await getInitializedDataSource()
  const categoryRepo = dataSource.getRepository(Category)
  const categorys = await categoryRepo.find()

  return ({
    props: {
      categorys:JSON.parse(JSON.stringify([ALL_CATEGORY_ITEM,...categorys]))
    }
  })
}

export default Home
