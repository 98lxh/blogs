import { RootState } from '../index';
import { createSlice } from "@reduxjs/toolkit"
import { ICaytegory } from 'types/category';

interface State {
  isMobile?: boolean
  themeType?: any
  categorys: ICaytegory[],
}

const initialState: State = {
  isMobile: undefined,
  themeType: undefined,
  categorys: [],
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload
    },
    setThemeType(state, action) {
      window.localStorage.setItem('theme', action.payload)
      state.themeType = action.payload
    },
    setCategory(state, action) {
      state.categorys = action.payload
    },
  }
})


export const systemActions = systemSlice.actions
export const selectIsMobile = (state: RootState) => state.system.isMobile
export const selectThemeType = (state: RootState) => state.system.themeType
