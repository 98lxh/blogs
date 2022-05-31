import { NextApiResponse, NextApiRequest } from 'next';
import { Cookie } from 'next-cookie';
import { ISession } from '../types';
import { ironOptions } from 'config/index';
import { User } from 'db/enyity/users';
import { withIronSessionApiRoute } from "iron-session/next"
import getInitializedDataSource from 'db';
import { UserAuth } from 'db/enyity/userAuth';
import { setCookie } from 'utils/index';
import md5 from 'md5';

interface ILoginReqBody {
  identity_type: 'password' | 'github',
  username?: string,
  password?: string
}

//登录
const login = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { username = '', password = '' } = req.body as ILoginReqBody
  const psdMd5 = md5(password)
  const dataSource = await getInitializedDataSource()
  const cookies = Cookie.fromApiRoute(req, res)
  const userRepo = dataSource.getRepository(User)
  const user = await userRepo.findOneBy({
    nickname: username
  })

  if (!user) return res.status(400).json({ msg: '该用户不存在' })

  //在user_auth中查找
  const userAuthRepo = dataSource.getRepository(UserAuth)

  const userAuth = await userAuthRepo.findOne({
    where: {
      identity_type: 'password',
      identifier: psdMd5
    },
    relations: ['user']
  })

  if (!userAuth) return res.status(400).json({ msg: '用户名或密码错误' })
  const { id, nickname, avatar } = user;

  const session = req.session as ISession
  session.id = id
  session.nickname = nickname
  session.avatar = avatar
  await session.save()

  setCookie(cookies, { userId: id, nickname: nickname, avatar: avatar })

  res.status(200).json({
    msg: '登陆成功',
    data: user
  })
}

export default withIronSessionApiRoute(login, ironOptions)
