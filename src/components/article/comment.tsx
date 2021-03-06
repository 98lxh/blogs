import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { deleteComment, publishComment, requestCommentList } from 'api/comment';
import { Comments } from '@icon-park/react';
import message from 'libs/message';
import Infinite from 'libs/infinite';
import Input from 'libs/input';
import Button from 'libs/button';
import { shallowEqual, useSelector } from "react-redux";
import { format } from 'date-fns';
import { selectUser } from 'store/slices/auth.slice';
import { IArticle } from 'types/article';
import { IComment } from 'types/comment';
import confirm from 'libs/confirm';

// eslint-disable-next-line no-unused-vars
const ArticleCommentList: FC<{ commentList: IComment[], setCommentList: (list: IComment[]) => void }> = ({ commentList, setCommentList }) => {
  const userInfo = useSelector(selectUser, shallowEqual)
  const onDeleteComment = (commentId: number) => {
    confirm({
      title: '',
      content: '是否确认删除该评论',
      async onConfirm() {
        message.warning('删除评论中...')
        await deleteComment(commentId)
        setCommentList(commentList.filter(c => c.id !== commentId))
        message.success('评论删除成功')
      },
    })
  }

  return (
    <>
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

              <p className='flex-1 text-right mr-1'>{format(new Date(comment.create_time), 'yyyy-MM-dd HH:mm:ss')}</p>

              {(userInfo && userInfo.id === Number(comment.user.id)) && (
                <p
                  className='text-error-100 cursor-pointer'
                  onClick={() => onDeleteComment(comment.id)}
                >删除
                </p>
              )}

            </div>

            <p
              className='ml-5 text-sm break-words'
            >
              {comment.content}
            </p>
          </div>
        ))}
    </>
  )
}

const ArticleComment: FC<{ article: IArticle, scrollElement: Element | null }> = ({ article, scrollElement }) => {
  const commentRef = useRef<HTMLDivElement>(null)
  const userInfo = useSelector(selectUser, shallowEqual)
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState<IComment[]>([])
  const [isListLoading, setIsListLoading] = useState(false)
  const [isPublishLoading, setIsPublishLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [page, setPage] = useState(1)

  const onPublishComment = async () => {
    if (!userInfo) return message.error('请先登陆再进行评论~')
    if (!comment) return message.error('评论内容不能为空')
    setIsPublishLoading(true)
    const newComment = await publishComment(comment, article.id)
    setIsPublishLoading(false)
    message.success('发布评论成功~')
    setComment('')
    //展示新的评论到顶部
    setCommentList([newComment, ...commentList])
  }

  const onRequestComment = async (reset = false) => {
    setIsListLoading(true)
    const list = await requestCommentList(article.id, page)
    setIsListLoading(false)
    if (!list) return setIsFinished(true)
    setCommentList(() => reset ? list : [...commentList, ...list])
  }

  const onTopComment = () => {
    if (!commentRef.current || !scrollElement) return
    scrollElement.scrollTo({ top: commentRef.current.offsetTop })
  }

  //页面改变重新获取数据
  useEffect(() => {
    onRequestComment()
  }, [page])

  return (
    <Fragment>
      {/* 评论区 */}
      <div
        className='dark:text-zinc-200 pr-8 pl-2'
        ref={commentRef}
      >
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
            className="w-[calc(100vw-4rem)]"
            onChange={setComment}
            type="textarea"
            max={100}
          />
        </div>

        <Button
          type="info"
          className='ml-[calc(100vw-6rem)] w-12 p-1 mt-1'
          loading={isPublishLoading}
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
            isLoading={isListLoading}
            onLoad={() => setPage(page + 1)}
          >
            <ArticleCommentList
              commentList={commentList}
              setCommentList={setCommentList}
            />
          </Infinite>
        </div>
      </div>

      {/* 按钮:到评论区  */}
      <Button
        className='fixed z-50 right-2 bottom-7'
        type='info'
        onClick={onTopComment}
        icon={<Comments />}
      />
    </Fragment>
  )
}


export default ArticleComment
