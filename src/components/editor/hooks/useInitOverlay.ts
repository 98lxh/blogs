import message from "libs/message"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCategorys, selectEditorArticle } from "store/slices/editor.slice"
import { buildEditorInfo } from "../utils/buildEditorInfo"
import { checkEditorArticle } from "../utils/checkArticle"

export const useInitOverlay = (articleId?: number) => {
  const editorArticle = useSelector(selectEditorArticle)
  const editorInfo = useMemo(() => buildEditorInfo(!!articleId), [articleId])
  const categorys = useSelector(selectCategorys)
  const dispatch = useDispatch()
  const { push } = useRouter()

  const handler = useCallback(async () => {
    if (!checkEditorArticle(editorArticle)) return

    const article = await editorInfo.requestAPI(articleId ? { ...editorArticle, ...{ id: articleId } } : editorArticle)
    message.success(editorInfo.successMessage)

    push(`/article/${article.id}`)
  }, [
    message,
    push,
    checkEditorArticle,
    editorInfo.successMessage,
    editorInfo.requestAPI,
    editorArticle,
    articleId
  ])

  return useMemo(() => ({
    categorys,
    dispatch,
    handler,
    editorArticle,
    editorInfo
  }), [
    categorys,
    dispatch,
    handler,
    editorArticle,
    editorInfo
  ])
}
