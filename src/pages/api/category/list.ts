import getInitializedDataSource from "db"
import { Category } from "db/enyity/category"
import { NextApiRequest, NextApiResponse } from "next"

//获取分类列表数据
const list = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const dataSource = await getInitializedDataSource()
  const categoryRepo = dataSource.getRepository(Category)

  const categorys = await categoryRepo.find()

  res.status(200).json({
    code: 0,
    data: categorys
  })
}

export default list
