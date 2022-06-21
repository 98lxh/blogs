import { Back } from "@icon-park/react"
import Button from "libs/button"
import { useRouter } from "next/router"
import { FC, useMemo } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { format } from "date-fns"
import { IArticle } from "types/article"
import { selectUser } from "store/slices/auth.slice"

const ArticleHeader: FC<{ article: IArticle }> = ({ article }) => {
  const userInfo = useSelector(selectUser, shallowEqual)
  const createTime = useMemo(() => format(new Date(article.create_time), 'yyyy-MM-dd'), [article])
  const updateTime = useMemo(() => format(new Date(article.update_time), 'yyyy-MM-dd'), [article])
  const { push } = useRouter()

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
        {(userInfo && Number(userInfo.id)) === article.user.id && <Button size="small" type="info" onClick={()=>push(`/editor/${article.id}`)}>编辑</Button>}
      </div>
    </div>
  )
}


export default ArticleHeader
