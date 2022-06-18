import message from 'libs/message';
import { requestArticleDetail } from "api/article"
import { useCallback, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "store/slices/auth.slice"
import { useRouter } from 'next/router';
import { defaultEditor, editorAction, initCategoryList, selectEditorArticle } from 'store/slices/editor.slice';

export const useInitEditorArticle = (id?: number) => {
  const dispatch = useDispatch() as any
  const editorArticle = useSelector(selectEditorArticle)
  const userInfo = useSelector(selectUser)
  const { push } = useRouter()

  const initUpdateArticle = useCallback(async () => {
    if (!id) return false
    const { user, category, title, content } = await requestArticleDetail(id)

    if (user.id !== Number(userInfo?.id)) {
      message.error('您没有编辑该文章的权限')
      push('/')
    }

    dispatch(editorAction.setEditorArticle({
      categoryId: category.id,
      title,
      content
    }))

  }, [
    dispatch,
    push,
    id,
    userInfo?.id
  ])

  useEffect(() => {
    initUpdateArticle()
    dispatch(initCategoryList())

    return () => {
      dispatch(editorAction.setEditorArticle(defaultEditor))
    }
  },
    [
      initUpdateArticle,
      dispatch
    ]
  )


  return useMemo(() => ({
    editorArticle,
    dispatch,
  }), [
    editorArticle,
    dispatch
  ])
}
