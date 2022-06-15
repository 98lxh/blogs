import message from 'libs/message';
import { requestArticleDetail } from "api/article"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "store/slices/auth.slice"
import { useRouter } from 'next/router';
import { defaultEditor, editorAction, initCategoryList, selectEditorArticle } from 'store/slices/editor.slice';

export const useInitEditorArticle = (id?: number) => {
  const dispatch = useDispatch() as any
  const editorArticle = useSelector(selectEditorArticle)
  const isUpdate = useRef(false)
  const userInfo = useSelector(selectUser)
  const { push } = useRouter()
  const initUpdateArticle = useCallback(async () => {
    if (!id) return false

    message.warning('等待文章初始化~')
    const { user, category, title, content } = await requestArticleDetail(id)
    message.success('文章初始化完成,请开始编辑~')

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
    id
  ])

  useEffect(() => {
    initUpdateArticle()
    dispatch(initCategoryList())

    return () => {
      dispatch(editorAction.setEditorArticle(defaultEditor))
    }
  }, [])


  return useMemo(() => ({
    editorArticle,
    dispatch,
    isUpdate
  }), [
    editorArticle,
    dispatch
  ])
}
