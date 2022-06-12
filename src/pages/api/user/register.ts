import getInitializedDataSource from 'db';
import { UserAuth } from 'db/enyity/userAuth';
import { User } from 'db/enyity/users';
import { NextApiRequest, NextApiResponse } from "next";
import md5 from 'md5';

const register = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { nickname = '', password = '' } = JSON.parse(req.body)
  const dataSource = await getInitializedDataSource()
  const md5Psd = md5(password)
  const userAuthRepo = dataSource.getRepository(UserAuth)
  const userRepo = dataSource.getRepository(User)
  const findUser = await userRepo.findBy({
    nickname
  })
  if (findUser.length) return res.status(401).json({ message: '该用户已存在' })

  const user = new User()
  user.nickname = nickname
  user.avatar = '/images/avatar.png'

  const resUser = await userRepo.save(user)
  const userAuth = new UserAuth()
  userAuth.identity_type = 'password'
  userAuth.user = resUser
  userAuth.identifier = md5Psd
  userAuth.credential = md5Psd
  await userAuthRepo.save(userAuth)

  res.status(200).json({
    msg: '注册成功',
    code: 0,
    data: resUser
  })
}

export default register
