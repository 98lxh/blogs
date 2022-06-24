import { ironOptions } from "config";
import getInitializedDataSource from "db";
import { Comment } from "db/enyity/comment";
import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next";
import { EXCEPTION_COMMENT } from "../config/codes";
import { ISession } from "../types";

const deleteComment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session: ISession = req.session
  //评论id
  const { id } = JSON.parse(req.body)
  const dataSource = await getInitializedDataSource()
  const commmentRepo = dataSource.getRepository(Comment)

  const comment = await commmentRepo.findOne({
    where: {
      id
    },
    relations: ['user']
  })

  if (!comment) return res.status(400).json(EXCEPTION_COMMENT.NOT_FOUND)
  if (comment?.user.id !== session.id) return res.status(401).json(EXCEPTION_COMMENT.UPDATE_FAILED_AUTH)

  await commmentRepo.remove(comment)

  res.status(200).json({
    code: 0,
    data: comment
  })
}

export default withIronSessionApiRoute(deleteComment, ironOptions)
