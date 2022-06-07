import { useRef } from "react"
import { NextPage } from "next"
import Button from "libs/button"
import message from "libs/message"
import { IArticle } from "types/article"
import { Eyes, DownloadOne } from "@icon-park/react"
import { mapImgUrlToSize } from "config/mapUrlToImgSize"
import { useLazy } from "hooks/useLazy"
import { buildRandomColor } from "utils/buildRandomColor"

const Item: NextPage<{ article: IArticle,width:number,lazy:boolean }> = ({ article, width, lazy }) => {
  const imageRef = useRef<HTMLImageElement | null>(null)

  const calcImgHeight = () => { 
    const imgSize = mapImgUrlToSize[article.cover]
    return (width / imgSize.width) * imgSize.height
  }


  useLazy(imageRef, {
    src: article.cover,
    lazy
  })
  
  return (
    <div className="bg-white dark:bg-zinc-800 rounded pd-1">
      <div className="relative w-full rounded cursor-zoom-in group" style={{ backgroundColor: buildRandomColor() }}>
        <img
          className="w-full h-full rounded bg-transparent"
          ref={imageRef}
          style={{height:calcImgHeight()}}
        />
        <div className="opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 right-0 rounded duration-300 group-hover:opacity-100">
          <Button
            className="absolute top-1.5 left-1.5"
            type="info"
            icon={<Eyes />}
          >
            {article.views}
          </Button>
          <Button
            className="absolute top-1.5 right-1.5"
            type="info"
            onClick={() => message.error('暂未开放下载 !')}
            icon={<DownloadOne />}
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
