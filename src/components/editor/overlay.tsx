import { FC } from "react"
import Button from "libs/button"
import { UploadLogs } from "@icon-park/react"
import { editorAction } from "store/slices/editor.slice"
import { useInitOverlay } from "./hooks/useInitOverlay"

const EditorOverlay: FC<{ isUpdate: boolean, articleId?: number }> = ({ articleId }) => {
  const { categorys, dispatch, editorArticle, handler, editorInfo } = useInitOverlay(articleId)

  return (
    <div className="w-[400px] p-1 dark:text-zinc-200">
      <p className="mb-1 text-sm">选择分类</p>
      <div className="flex flex-wrap">
        {
          categorys?.map(category => (
            <div
              className={`bg-zinc-200 dark:bg-zinc-700 mr-1 mb-1 px-1 py-0.5 cursor-pointer rounded-sm 
              ${editorArticle.categoryId === category.id && 'bg-main dark:bg-main text-white cursor-not-allowed'}`
              }
              onClick={() => dispatch(editorAction.setEditorArticle({ categoryId: category.id }))}
              key={category.id}
            >
              {category.title}
            </div>
          ))
        }
      </div>
      <Button
        onClick={handler}
        className="w-10"
        type="info"
        icon={<UploadLogs />}
      >
        {editorInfo.buttonText}
      </Button>
    </div>
  )
}

export default EditorOverlay
