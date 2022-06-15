import { requestCategoryList } from 'api/category';
import { AppDispatch } from './../index';
import { RootState } from '../index';
import { createSlice } from "@reduxjs/toolkit"
import { ICaytegory } from 'types/category';

export type EditorArticle = {
  title: string
  content: string
  categoryId: number
}

interface State {
  categorys: ICaytegory[] | null
  editorArticle: EditorArticle
}

export const defaultEditor = {
  title: '',
  content: '',
  categoryId: 0
}

const initialState: State = {
  categorys: null,
  editorArticle: defaultEditor
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCategorys(state, action) {
      state.categorys = action.payload
    },
    setEditorArticle(state, action) {
      state.editorArticle = {
        ...state.editorArticle,
        ...action.payload
      }
    }
  }
})

const { setCategorys } = editorSlice.actions
export const editorAction = editorSlice.actions
export const selectEditorArticle = (state: RootState) => state.editor.editorArticle
export const selectCategorys = (state: RootState) => state.editor.categorys

export const initCategoryList = () =>
  (dispatch: AppDispatch) =>
    requestCategoryList().then(res => {
      dispatch(setCategorys(res))
    })


