import { NextApiResponse, NextApiRequest } from 'next';
import getInitializedDataSource from 'db';
import { ISession } from '../types';
import { ironOptions } from 'config/index';
import { User } from 'db/enyity/users';
import { withIronSessionApiRoute } from "iron-session/next"
import { Article } from 'db/enyity/article';
import { EXCEPTION_ARTICLE, EXCEPTION_USER } from '../config/codes';
import { Category } from 'db/enyity/category';

//发布文章
const publish = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session: ISession = req.session
  const { title = '', content = '', categoryId = 1 } = JSON.parse(req.body)
  const dataSource = await getInitializedDataSource()
  const userRepo = dataSource.getRepository(User)
  const articleRepo = dataSource.getRepository(Article)
  const categoryRepo = dataSource.getRepository(Category)
  if (!session.id) return res.status(401).json(EXCEPTION_USER.LOGIN_OVERDUE)
  const user = await userRepo.findOne({
    where: {
      id: session.id
    }
  })

  const category = await categoryRepo.findOne({
    where: {
      id: categoryId
    }
  })


  const now = new Date()
  const article = new Article()
  article.title = title
  article.content = content;
  article.cover = `/images/${parseInt(String(Math.random() * 16))}.jpeg`
  article.create_time = now
  article.update_time = now
  article.is_delete = 0;
  article.views = 0;

  if (user) {
    article.user = user
  }

  if (category) {
    category.article_count = category.article_count + 1
    article.category = category
  }


  const resArticle = await articleRepo.save(article)

  if (resArticle) {
    res.status(200).json({ code: 0, msg: '发布成功', data: resArticle })
  } else {
    res.status(200).json({ ...EXCEPTION_ARTICLE.PUBLISH_FAILED })
  }
}


export default withIronSessionApiRoute(publish, ironOptions)
