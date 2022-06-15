import { useCallback, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { defaultEditor, editorAction, initCategoryList, initEditorArticle, selectEditorArticle } from "store/slices/editor.slice"

export const useInitEditorArticle = (id?: number) => {
  const dispatch = useDispatch() as any
  const editorArticle = useSelector(selectEditorArticle)
  const isUpdate = useRef(false)

  const initUpdateArticle = useCallback(async () => {
    if (!id) return false
    await dispatch(initEditorArticle(id))
    isUpdate.current = true
  }, [
    dispatch,
    initEditorArticle,
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
