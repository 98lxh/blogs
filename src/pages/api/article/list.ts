import getInitializedDataSource from "db"
import { Article } from "db/enyity/article"
import { Category } from "db/enyity/category"
import { NextApiRequest, NextApiResponse } from "next"
import { EXCEPTION_ARTICLE } from "../config/codes"

//获取分页文章列表
const list = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { page = 1, size = 20, category = "", search = '' } = JSON.parse(req.body)
  const dataSource = await getInitializedDataSource()
  const categoryRepo = dataSource.getRepository(Category)
  let where: string = ''
  let parameters: any = {}
  let categoryWhere: any = {}
  if (category) {
    const findCategory = await categoryRepo.findOneBy({ title: category })

    categoryWhere = {
      category: findCategory
    }
  }

  if (search) {
    where += `articles.title LIKE :title`
    parameters = {
      ...parameters,
      title: '%' + search + '%'
    }
  }

  const articles = await dataSource
    .getRepository(Article)
    .createQueryBuilder("articles")
    .offset((page - 1) * size)
    .limit(size)
    .where(where)
    .setParameters(parameters)
    .setFindOptions({ where: categoryWhere, relations: ["user", "category"] })
    .getMany()

  if (articles.length) {
    res.status(200).json({
      code: 0,
      data: articles
    })
  } else {
    res.status(200).json(EXCEPTION_ARTICLE.GET_LIST_FAILED)
  }
}

export default list
