import Button from "libs/button"
import { NextPage } from "next"
import { IArticle } from "types/article"
import { Eyes } from "@icon-park/react"
import { mapImgUrlToSize } from "config/mapUrlToImgSize"

const Item: NextPage<{ article: IArticle,width:number }> = ({ article,width }) => {

  const calcImgHeight = () => { 
    const imgSize = mapImgUrlToSize[article.cover]
    return (width / imgSize.width) * imgSize.height
  }
  
  return (
    <div className="bg-white dark:bg-zinc-800 rounded pd-1">
      <div className="relative w-full rounded cursor-zoom-in group">
        <img
          className="w-full h-full rounded bg-transparent"
          src={article.cover}
          style={{height:calcImgHeight()}}
        />
        <div className="opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 right-0 rounded duration-300 group-hover:opacity-100">
          <Button
            className=" absolute top-1.5 left-1.5"
            type="info"
            icon={<Eyes />}
          >
          </Button>
        </div>
      </div>
      <div>
        <p className="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
          { article.title}
        </p>
        <div className="flex items-center mt-1 px-1">
          <img className="h-2 w-2 rounded-full" src={article.user.avatar} alt="" />
          <span className="text-sm text-zinc-500 ml-1">{article.user.nickname}</span>
        </div>
      </div>
    </div>
  )
 }

export default Item
