import { ironOptions } from "config";
import getInitializedDataSource from "db";
import { Article } from "db/enyity/article";
import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next";
import { EXCEPTION_ARTICLE, EXCEPTION_USER } from "../config/codes";
import { ISession } from "../types";

const deleteArticle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session: ISession = req.session
  //文章id
  const { id } = JSON.parse(req.body)
  const dataSource = await getInitializedDataSource()
  const articleRepo = dataSource.getRepository(Article)

  const article = await articleRepo.findOne({
    where: {
      id
    },
    relations: ['user']
  })

  if (!article) return res.status(400).json(EXCEPTION_ARTICLE.NOT_FOUND)
  if (article?.user.id !== session.id) return res.status(401).json(EXCEPTION_USER.LOGIN_OVERDUE)

  await articleRepo.remove(article)

  res.status(200).json({
    code: 0,
    data: article
  })
}

export default withIronSessionApiRoute(deleteArticle, ironOptions)
