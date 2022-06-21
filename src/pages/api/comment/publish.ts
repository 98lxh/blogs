import { NextApiResponse, NextApiRequest } from 'next';
import getInitializedDataSource from 'db';
import { ISession } from '../types';
import { ironOptions } from 'config/index';
import { User } from 'db/enyity/users';
import { Comment } from 'db/enyity/comment';
import { withIronSessionApiRoute } from "iron-session/next"
import { EXCEPTION_COMMENT } from '../config/codes';
import { Article } from 'db/enyity/article';

//发布评论
const publish = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session: ISession = req.session
  const { articleId = 0, content = '' } = JSON.parse(req.body)
  const dataSource = await getInitializedDataSource()
  const userRepo = dataSource.getRepository(User)
  const articleRepo = dataSource.getRepository(Article)
  const commenteRepo = dataSource.getRepository(Comment)
  const now = new Date()

  const comment = new Comment()
  comment.content = content
  comment.create_time = now
  comment.update_time = now

  const user = await userRepo.findOneBy({
    id: session.id
  })

  const article = await articleRepo.findOneBy({
    id: articleId
  })

  if (user) comment.user = user

  if (article) comment.article = article

  const resComment = await commenteRepo.save(comment)
  if (!resComment) return res.status(400).json(EXCEPTION_COMMENT)

  res.status(200).json({ code: 0, message: '评论成功', data: resComment })
}


export default withIronSessionApiRoute(publish, ironOptions)
