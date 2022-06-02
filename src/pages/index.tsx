import getInitializedDataSource from "db"
import { Category } from "db/enyity/category"
import { NextPage } from "next"
import { ICaytegory } from "types/category"
import  Navigation from "components/navigation"

const Home: NextPage<{ categorys: ICaytegory[] }> = ({ categorys }) => { 
  return (
    <div>
      <Navigation categorys={categorys} />
    </div>
  )
}

export const getStaticProps = async () => { 
  const dataSource = await getInitializedDataSource()
  const categoryRepo = dataSource.getRepository(Category)
  const categorys = await categoryRepo.find()

  return ({
    props: {
      categorys:JSON.parse(JSON.stringify(categorys))
    }
  })
}

export default Home
