import { FC, useEffect, useState } from 'react';
import { publishComment, requestCommentList } from 'api/comment';
import { shallowEqual, useSelector } from "react-redux";
import message from 'libs/message';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { selectUser } from 'store/slices/auth.slice';
import { IArticle } from 'types/article';
import Input from 'libs/input';
import Button from 'libs/button';
import { IComment } from 'types/comment';
import Infinite from 'libs/infinite';

const ArticleComment: FC<{ article: IArticle }> = ({ article }) => {
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState<IComment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [page, setPage] = useState(1)
  const userInfo = useSelector(selectUser, shallowEqual)
  const { push } = useRouter()

  const onPublishComment = async () => {
    if (!userInfo) {
      message.error('请先登陆再进行评论~')
      return push('/login')
    }

    if (!comment) return message.error('评论内容不能为空')

    const newComment = await publishComment(comment, article.id)
    message.success('发布评论成功~')
    setComment('')
    //展示新的评论到顶部
    setCommentList([newComment, ...commentList])
  }

  const onRequestComment = async (reset = false) => {
    setIsLoading(true)
    const list = await requestCommentList(article.id, page)
    setIsLoading(false)
    if (!list || list.length < 10) return setIsFinished(true)
    setCommentList(() => reset ? list : [...commentList, ...list])
  }

  useEffect(() => {
    onRequestComment()
  }, [page])

  return (
    <div className='dark:text-zinc-200 px-3'>
      <h1 className='text-base font-bold my-1.5'>锐评一下</h1>
      <div className='h-[1px] bg-zinc-500  my-1.5'></div>

      {/* 发表评论 */}
      <div className='flex w-full'>
        <img
          className='w-4 h-4 rounded-full mr-1'
          src={userInfo?.avatar || '/images/avatar.png'}
        />
        <Input
          value={comment}
          placeholder="请输入评论内容..."
          className="w-[calc(100vw-3rem)]"
          onChange={setComment}
          type="textarea"
          max={100}
        />
      </div>

      <Button
        type="info"
        className='ml-[calc(100vw-4rem)] w-8 p-1 mt-1'
        onClick={onPublishComment}
      >
        发布评论
      </Button>

      {/* 所有评论 */}
      <h1 className='text-base font-bold my-1.5'>评论区</h1>
      <div className='h-[1px] bg-zinc-500 my-1.5'></div>

      <div className='mt-1'>
        <Infinite
          isFinished={isFinished}
          isLoading={isLoading}
          onLoad={() => setPage(page + 1)}
        >
          {
            commentList.map(comment => (
              <div
                key={comment.id}
                className="mb-2"
              >
                <div className='flex text-sm'>
                  <img
                    className='w-4 h-4 rounded-full mr-1'
                    src={comment.user.avatar}
                  />
                  <span>{comment.user.nickname}</span>
                  <p className='flex-1 text-right'>{format(new Date(comment.create_time), 'yyyy-MM-dd HH:mm:ss')}</p>
                </div>
                <p
                  className='ml-5 text-sm break-words'
                >
                  {comment.content}
                </p>
              </div>
            ))
          }
        </Infinite>
      </div>
    </div>
  )
}


export default ArticleComment
