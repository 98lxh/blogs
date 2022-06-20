import message from "libs/message"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCategorys, selectEditorArticle } from "store/slices/editor.slice"
import { buildEditorInfo } from "../utils/buildEditorInfo"
import { checkEditorArticle } from "../utils/checkArticle"

// eslint-disable-next-line no-unused-vars
export const useInitOverlay = (setEditorLoading: (value: boolean) => void, articleId?: number) => {
  const editorArticle = useSelector(selectEditorArticle)
  const editorInfo = useMemo(() => buildEditorInfo(!!articleId), [articleId])
  const categorys = useSelector(selectCategorys)
  const dispatch = useDispatch()
  const { push } = useRouter()

  const handler = useCallback(async () => {
    if (!checkEditorArticle(editorArticle)) return
    setEditorLoading(true)
    const article = await editorInfo.requestAPI(articleId ? { ...editorArticle, ...{ id: articleId } } : editorArticle)
    setEditorLoading(false)
    message.success(editorInfo.successMessage)
    push(`/article/${article.id}`)

  }, [
    push,
    editorInfo,
    editorArticle,
    articleId
  ])

  return useMemo(() => ({
    categorys,
    dispatch,
    handler,
    editorArticle,
    editorInfo,
  }), [
    categorys,
    dispatch,
    handler,
    editorInfo,
    editorArticle,
  ])
}
