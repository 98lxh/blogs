import getInitializedDataSource from "db"
import Navigation from "components/navigation"
import ArticleList from "components/articleList"
import { Category } from "db/enyity/category"
import { NextPage } from "next"
import { ALL_CATEGORY_ITEM } from "constant"
import { ICaytegory } from "types/category"


const Home: NextPage<{ categorys: ICaytegory[] }> = ({ categorys }) => { 
  
  return (
    <div className="h-full overflow-auto bg-white  dark:bg-zinc-800 duration-500 transition-colors">
      <Navigation categorys={categorys} />
      <div className="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
        <ArticleList />
      </div>
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
