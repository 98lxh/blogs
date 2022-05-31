import { EXCEPTION_USER } from '../config/codes';
import { NextApiResponse, NextApiRequest } from 'next';
import getInitializedDataSource from 'db';
import { ISession } from '../types';
import { ironOptions } from 'config/index';
import { withIronSessionApiRoute } from "iron-session/next"
import { Article } from 'db/enyity/article';
import { EXCEPTION_ARTICLE } from '../config/codes';

//更新文章
const update = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session: ISession = req.session
  const { title = '', content = '', id = 0 } = req.body
  const dataSource = await getInitializedDataSource()
  const articleRepo = dataSource.getRepository(Article)
  const article = await articleRepo.findOne({
    where: {
      id
    },
    relations: ['user']
  })

  const now = new Date()

  if (!article) return res.status(400).json(EXCEPTION_ARTICLE.NOT_FOUND)

  if (article.user.id !== session.id) return res.status(401).json(EXCEPTION_USER.LOGIN_OVERDUE)

  article.title = title
  article.content = content;
  article.update_time = now
  const resArticle = await articleRepo.save(article)

  if (resArticle) {
    res.status(200).json({ code: 0, msg: '更新成功', data: resArticle })
  } else {
    res.status(200).json({ ...EXCEPTION_ARTICLE.UPDATE_FAILED })
  }

}


export default withIronSessionApiRoute(update, ironOptions)
