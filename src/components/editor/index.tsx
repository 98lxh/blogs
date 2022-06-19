import { FC } from "react"
import { Back, Down, Triangle } from "@icon-park/react"
import MDEditor from "md-editor-rt"
import Popover from "libs/popover"
import Button from "libs/button"
import Input from "libs/input"
import EditorOverlay from "./overlay"
import { useRouter } from "next/router"
import { editorAction, EditorArticle } from "store/slices/editor.slice"
import { useInitEditorArticle } from "./hooks/useInitEditorArticle"
import { THEME_TYPE } from "constant"
import { useSelector } from "react-redux"
import { selectCurrentTheme } from "store/slices/system.slice"

const EditorLoading: FC<{ isUpdate: boolean, editorArticle: EditorArticle }> = ({ isUpdate, editorArticle }) => {

  return (
    (isUpdate && !editorArticle.categoryId)
      ? (
        <div className="fixed t-0 l-0 w-screen h-screen bg-black/60 z-50 text-zinc-200">
          <div className="absolute left-1/2 top-1/2 translate-x-[-50%] flex flex-col items-center">
            <Triangle className="animate-pulse w-3 h-3 duration-300 mb-1" />
            <p>等待文章初始化...</p>
          </div>
        </div>
      )
      : null
  )
}


const Editor: FC<{ id?: number }> = ({ id }) => {
  const { back } = useRouter()
  const { dispatch, editorArticle } = useInitEditorArticle(id)
  const theme = useSelector(selectCurrentTheme)

  return (
    <div className="text-base relative overflow-hidden">
      <EditorLoading isUpdate={!!id} editorArticle={editorArticle} />
      <div className="flex">
        <Button
          icon={<Back />}
          type="info"
          onClick={() => back()}
          className="w-[30px] h-[50px] rounded-none"
        >
        </Button>

        <Input
          className="w-[calc(100vw-60px)] h-[50px] rounded-none font-bold font-xl"
          max={30}
          value={editorArticle.title}
          onChange={title => dispatch(editorAction.setEditorArticle({ title }))}
          placeholder="请输入文章标题..."
        />
        <Popover
          placement="bottom-left"
          overlay={(
            <EditorOverlay
              isUpdate={!!id}
              articleId={id}
            />
          )}
        >
          <Button
            icon={<Down />}
            type="info"
            className="w-[30px] h-[50px] rounded-none"
          >
          </Button>
        </Popover>
      </div>

      <MDEditor
        modelValue={editorArticle.content}
        onChange={content => dispatch(editorAction.setEditorArticle({ content }))}
        placeholder="请输入文章内容..."
        theme={theme === THEME_TYPE.LIGHT ? 'light' : 'dark'}
        previewTheme="vuepress"
        style={{
          height: 'calc(100vh - 50px)',
        }}
      />
    </div>
  )
}

export default Editor
