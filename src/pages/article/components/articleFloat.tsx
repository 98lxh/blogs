import { Back } from "@icon-park/react"
import Button from "libs/button"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { selecrArticleFloat } from "store/slices/float.slice"
import { IArticle } from "types/article"

const ArticleFloat: NextPage<{ article: IArticle,status:string }> = ({ article,status }) => {
  const articleFloat = useSelector(selecrArticleFloat)
  const conatinerRef = useRef(null)
  const { cover, title, author } = useMemo(() => articleFloat! || {}, [articleFloat])
  const { push } = useRouter()


  return (
    <div ref={conatinerRef}>
      <div
        className={`absolute duration-1000`}
        style={status === 'in' ? cover?.inStyle : { top: 0 + 'px', left: 0 + 'px', width: '100vw', height: '300px' }}
      >
        <img className="w-full h-full" src={article.cover} />
        <div className="w-full h-full bg-zinc-900/80 absolute top-0"></div>
      </div>

      <div
        className={`absolute duration-1000 text-base`}
        style={status === 'in' ? title?.inStyle : { top: '150px', left: 30 + 'px', color: 'white' }}
      >
        {article.title}
      </div>

      <div
        className={`absolute duration-1000 flex flex-col justify-center items-center`}
        style={status === 'in' ? author?.inStyle : { top: 280 + 'px', right: 20 + 'px', color: 'white', width: '60px', height: '60px' }}
      >
        <img className="w-full h-full rounded-full border border-zinc-200" src={article.user.avatar} />
        <span className="text-sm dark:text-zinc-200 text-zinc-900">{article.user.nickname}</span>
      </div>

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
    </div>
  )
}


export default ArticleFloat
