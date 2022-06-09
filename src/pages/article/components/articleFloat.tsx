import { Back } from "@icon-park/react"
import Button from "libs/button"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { selecrArticleFloat } from "store/slices/float.slice"
import { format } from "date-fns"
import { IArticle } from "types/article"
import { selectUser } from "store/slices/auth.slice"

const ArticleFloat: NextPage<{ article: IArticle, status: string }> = ({ article, status }) => {
  const articleFloat = useSelector(selecrArticleFloat)
  const userInfo = useSelector(selectUser, shallowEqual)
  const { cover, title, author } = useMemo(() => articleFloat! || {}, [articleFloat])
  const createTime = useMemo(() => format(new Date(article.create_time), 'yyyy-MM-dd'), [article])
  const updateTime = useMemo(() => format(new Date(article.update_time), 'yyyy-MM-dd'), [article])
  const { push } = useRouter()

  return (
    <div>
      {/* 文章封面 */}
      <div
        className={`absolute duration-1000`}
        style={status === 'in' ? cover?.inStyle : { top: 0 + 'px', left: 0 + 'px', width: '100vw', height: '300px' }}
      >
        <img className="w-full h-full" src={article.cover} />
        <div className="w-full h-full bg-zinc-900/80 absolute top-0"></div>
      </div>

      {/* 文章标题 */}
      <div
        className={`absolute duration-1000 text-base`}
        style={status === 'in' ? title?.inStyle : { top: '150px', left: 30 + 'px', color: 'white' }}
      >
        {article.title}
      </div>

      {/* 作者信息 */}
      <div
        className={`absolute duration-1000 flex flex-col justify-center items-center z-10`}
        style={status === 'in' ? author?.inStyle : { top: 280 + 'px', right: 20 + 'px', color: 'white', width: '60px', height: '60px' }}
      >
        <img className="w-full h-full rounded-full border border-zinc-200" src={article.user.avatar} />
        <span className="text-sm dark:text-zinc-200 text-zinc-900">{article.user.nickname}</span>
      </div>

      {/* 返回 */}
      <div
        className="absolute left-2 top-[280px] duration-1000"
        style={status === 'in' ? author?.inStyle : {}}
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
      <div
        className="absolute left-2 top-[335px] duration-1000 text-sm dark:text-zinc-200 height-[300px] flex items-end"
        style={status === 'in' ? author?.inStyle : {}}
      >
        <div className="mr-1.5">
          <p>阅读 : {article.views}</p>
          <p className="mt-0.5">分类 : {article.category.title}</p>
          <p className="mt-0.5">创建时间 : {createTime}</p>
          <p className="mt-0.5">更新时间 : {updateTime}</p>
        </div>
        {userInfo!.id === article.user.id && <Button size="small" type="info">编辑</Button>}
      </div>
    </div>
  )
}


export default ArticleFloat
