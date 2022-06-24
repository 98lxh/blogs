import { Back } from "@icon-park/react"
import Button from "libs/button"
import { useRouter } from "next/router"
import { FC, useMemo } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { format } from "date-fns"
import { IArticle } from "types/article"
import { selectUser } from "store/slices/auth.slice"
import confirm from "libs/confirm"
import { deleteArticle } from "api/article"
import message from "libs/message"

const ArticleHeader: FC<{ article: IArticle }> = ({ article }) => {
  const userInfo = useSelector(selectUser, shallowEqual)
  const createTime = useMemo(() => format(new Date(article.create_time), 'yyyy-MM-dd'), [article])
  const updateTime = useMemo(() => format(new Date(article.update_time), 'yyyy-MM-dd'), [article])
  const isAuthor = useMemo(()=> (userInfo &&  Number(userInfo.id) === article.user.id),[article,userInfo])
  const { push } = useRouter()

  const onDeleteArticle = () => {
    confirm({
      title:'',
      content: `确认删除文章 ${article.title} 吗?`,
      async onConfirm() {
        message.warning('正在删除...')
        const result = await deleteArticle(article.id)
        message.success(`删除 ${result.title} 成功!`)
        push(`/category/${article.category.title}`)
      }
    })
  }

  return (
    <div>
      {/* 文章封面 */}
      <div className=" relative h-[300px] w-full" >
        <img className="w-full h-full" src={article.cover} alt="" />
        <div className="w-full h-full bg-zinc-900/80 absolute top-0"></div>
      </div>

      {/* 文章标题 */}
      <div className="absolute text-base top-[150px] left-1 text-zinc-200" >
        {article.title}
      </div>

      {/* 作者信息 */}
      <div className="absolute flex flex-col justify-center items-center z-10 w-[60px] right-2 top-[270px]">
        <img className="w-full h-full rounded-full border border-zinc-200" src={article.user.avatar} alt="" />
        <span className="text-sm dark:text-zinc-200 text-zinc-900">{article.user.nickname}</span>
      </div>

      {/* 返回 */}
      <div
        className="absolute left-2 top-[280px]"
        onClick={() => push('/')}
      >
        <Button
          type="info"
          icon={
            <Back />
          }
        />
      </div>

      {/* 文章信息 */}
      <div className="ml-2 mt-2 text-sm dark:text-zinc-200 height-[300px] flex items-end" >
        <div className="mr-1.5">
          <p>阅读 : {article.views}</p>
          <p className="mt-0.5">分类 : {article.category.title}</p>
          <p className="mt-0.5">创建时间 : {createTime}</p>
          <p className="mt-0.5">更新时间 : {updateTime}</p>
        </div>

        {/* 删除和编辑操作 */}

        {
          isAuthor && (
            <div className="flex">
              <Button
                className="mr-1"
                size="small"
                type="info"
                onClick={() => push(`/editor/${article.id}`)}
              >编辑</Button>
              <Button
                className=" text-error-300 bg-[#feece8] hover:bg-[#fccdc5]"
                size="small"
                type="info"
                onClick={onDeleteArticle}
              >
                删除
              </Button>
            </div>
         )
        }
      </div>
    </div>
  )
}


export default ArticleHeader
