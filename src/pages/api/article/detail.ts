import getInitializedDataSource from "db"
import { Article } from "db/enyity/article"
import { NextApiRequest, NextApiResponse } from "next"

//获取文章详情
const hint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = JSON.parse(req.body)
  const dataSource = await getInitializedDataSource()
  const articleRepo = await dataSource.getRepository(Article)

  const article = await articleRepo.findOne({
    where: {
      id
    },
    relations: ['user', 'category']
  })

  if (article) {
    article.views = article.views + 1
    await articleRepo.save(article)
  }

  res.status(200).json({
    code: 0,
    data: article
  })
}

export default hint
