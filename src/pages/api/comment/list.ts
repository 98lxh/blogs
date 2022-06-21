import getInitializedDataSource from "db"
import { Article } from "db/enyity/article"
import { Comment } from "db/enyity/comment"
import { NextApiRequest, NextApiResponse } from "next"
import { EXCEPTION_COMMENT } from "../config/codes"

//获取分页评论数据
const list = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { page = 1, size = 10, articleId } = JSON.parse(req.body)
  const dataSource = await getInitializedDataSource()
  const articleRepo = dataSource.getRepository(Article)
  const article = await articleRepo.findOneBy({
    id: articleId
  })

  if (!article) return

  const where: any = {
    article
  }

  const comments = await dataSource
    .getRepository(Comment)
    .createQueryBuilder("comments")
    .offset((page - 1) * size)
    .limit(size)
    .setFindOptions({
      where,
      relations: ["user"]
    })
    .orderBy('comments.create_time', 'DESC')
    .getMany()


  if (comments.length) {
    res.status(200).json({
      code: 0,
      data: comments
    })
  } else {
    res.status(200).json(EXCEPTION_COMMENT.GET_LIST_FAILED)
  }

}

export default list
