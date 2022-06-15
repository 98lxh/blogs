import { FC } from "react"
import { Back, Down } from "@icon-park/react"
import MDEditor from "md-editor-rt"
import Popover from "libs/popover"
import Button from "libs/button"
import Input from "libs/input"
import EditorOverlay from "./overlay"
import { useRouter } from "next/router"
import { editorAction } from "store/slices/editor.slice"
import { useInitEditorArticle } from "./hooks/useInitEditorArticle"
import { THEME_TYPE } from "constant"
import { useGetTheme } from "hooks/useTheme"

const Editor: FC<{ id?: number }> = ({ id }) => {
  const { push } = useRouter()
  const theme = useGetTheme()
  const { dispatch, editorArticle, isUpdate } = useInitEditorArticle(id)
 
  return (
    <div className="text-base relative overflow-hidden">
      <div className="flex">
        <Button
          icon={<Back />}
          type="info"
          onClick={() => push('/')}
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
              isUpdate={isUpdate.current}
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
