import getInitializedDataSource from "db"
import { Article } from "db/enyity/article"
import { NextApiRequest, NextApiResponse } from "next"

//获取提示列表
const hint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { keyword = '' } = req.query
  const dataSource = await getInitializedDataSource()
  const articleRepo = dataSource.getRepository(Article)

  const hintList = await articleRepo.createQueryBuilder('article')
    .where("article.title LIKE :param")
    .setParameters({ param: '%' + keyword + '%' })
    .select("article.title")
    .getMany()

  res.status(200).json({
    code: 0,
    data: hintList
  })
}

export default hint
