import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getInitializedDataSource from 'db';
import { ISession } from '../types';
import { ironOptions } from '../../../config/index';
import { withIronSessionApiRoute } from "iron-session/next"
import { UserAuth } from 'db/enyity/userAuth';
import { User } from 'db/enyity/users';
import { setCookie } from 'utils/index';
import { Cookie } from 'next-cookie';

const redirect = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: ISession = req.session
  //http://localhost/api/oauth/redirect?code=xxx
  const { code } = req?.query as any
  const githubClientId = '38f5b22c68cf8f635ec1';
  const githubSecrect = '0addc1d82b118bc833fd3bf8fd8f7626748aa48d';
  const url = `https://github.com/login/oauth/access_token?client_id=${githubClientId}&client_secret=${githubSecrect}&code=${code}`

  const result: any = await axios.post(url, {}, {
    headers: {
      accept: 'application/json'
    }
  })


  const { access_token } = result.data

  console.log(access_token)

  const githubUserInfo = await axios.get('https://api.github.com/user', {
    headers: {
      accept: 'application/json',
      Authorization: `token ${access_token}`
    }
  })

  const cookies = Cookie.fromApiRoute(req, res)
  const dataSource = await getInitializedDataSource()
  const userAuthRepo = dataSource.getRepository(UserAuth)
  const userAuth = await userAuthRepo.findOne({
    where: {
      identity_type: 'github',
      identifier: githubClientId
    },
    relations: ['user']
  })


  if (userAuth) {
    //之前登录过的用户 直接从user中获取信息 并更新 credential
    const user = userAuth.user
    const { id, nickname, avatar } = user

    userAuth.credential = access_token

    session.userId = id;
    session.nickname = nickname
    session.avatar = avatar

    await session.save()
    setCookie(cookies, { userId: id, nickname, avatar })

    res.writeHead(302, {
      Location: '/'
    })
  } else {
    //创建一个新用户 包括 user 和 user_auth
    /**
     * @login github的用户名
     * @avatar_url github头像
    */
    const { login = '', avatar_url = "" } = githubUserInfo.data as any
    const user = new User()
    user.nickname = login
    user.avatar = avatar_url

    const userAuth = new UserAuth()
    userAuth.identity_type = 'github'
    userAuth.identifier = githubClientId
    userAuth.credential = access_token
    userAuth.user = user

    const userAuthRepo = dataSource.getRepository(UserAuth)

    //cascade: true自动关联 保存用户
    const resUserAuth = await userAuthRepo.save(userAuth)
    const { id, nickname, avatar } = resUserAuth.user

    session.userId = id;
    session.nickname = nickname
    session.avatar = avatar

    await session.save()

    setCookie(cookies, { userId: id, nickname, avatar })

    res.writeHead(302, {
      Location: '/'
    })
  }
}


export default withIronSessionApiRoute(redirect, ironOptions)
