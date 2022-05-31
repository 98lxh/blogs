import { ironOptions } from "config";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { Cookie } from "next-cookie";
import { removeCookie } from "utils/index";
import { ISession } from "../types";

const logout = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session: ISession = req.session
  const cookies = Cookie.fromApiRoute(req, res)

  //清理session
  await session.destroy()
  //清理cookie
  removeCookie(cookies)

  res.status(200).json({
    msg: '退出成功',
    data: {}
  })
}

export default withIronSessionApiRoute(logout, ironOptions)
