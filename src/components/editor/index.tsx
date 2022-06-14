import { useEffect } from "react"
import Head from "next/head"
import { Back, Down, UploadLogs } from "@icon-park/react"
import MDEditor from "md-editor-rt"
import Popover from "libs/popover"
import Button from "libs/button"
import Input from "libs/input"
import message from "libs/message"
import { useDispatch, useSelector } from "react-redux"
import { selectThemeType } from "store/slices/system.slice"
import { useHttp } from "hooks/useAsync"
import { useRouter } from "next/router"
import { checkEditorArticle } from "./utils/checkArticle"
import { editorAction, selectEditorArticle, selectCategorys, initCategoryList, defaultEditor } from "store/slices/editor.slice"


const EditorCategoryOverlay = () => {
  const client = useHttp()
  const editorArticle = useSelector(selectEditorArticle)
  const categorys = useSelector(selectCategorys)
  const dispatch = useDispatch()
  const { push } = useRouter()

  const onPublish = async () => {
    const { title, content, categoryId } = editorArticle
    if (!checkEditorArticle(editorArticle)) return
    
    const article = await client('/article/publish', {
      method: 'POST',
      data: { title, content, categoryId }
    })

    message.success('发布成功!跳转至文章详情!')

    push(`/article/${article.id}`)
  }

  return (
    <div className="w-[400px] p-1 dark:text-zinc-200">
      <p className="mb-1 text-sm">选择分类</p>
      <div className="flex flex-wrap">
        {
          categorys?.map(category => (
            <div
              className={`bg-zinc-200 dark:bg-zinc-700 mr-1 mb-1 px-1 py-0.5 cursor-pointer rounded-sm ${editorArticle.categoryId === category.id && 'bg-main dark:bg-main text-white cursor-not-allowed'}`}
              onClick={() => dispatch(editorAction.setEditorArticle({ categoryId: category.id }))}
              key={category.id}
            >
              {category.title}
            </div>
          ))
        }
      </div>
      <Button
        onClick={onPublish}
        className="w-10"
        type="info"
        icon={<UploadLogs />}
      >
        确认发布
      </Button>
    </div>
  )
}

const Editor = () => {
  const theme = useSelector(selectThemeType)
  const { push } = useRouter()
  const dispatch = useDispatch()
  const editorArticle = useSelector(selectEditorArticle)

  useEffect(() => { 
    dispatch(initCategoryList() as any)

    return () => { 
      dispatch(editorAction.setEditorArticle(defaultEditor))
    }
  },[])

  return (
    <div className="text-base relative overflow-hidden">
      <Head><title>写文章</title></Head>
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
            <EditorCategoryOverlay />
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
        theme={theme === 'THEME_DARK' ? 'dark' : 'light'}
        style={{
          height: 'calc(100vh - 50px)',
        }}
      />
    </div>
  )
}

export default Editor
