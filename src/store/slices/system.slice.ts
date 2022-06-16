import { RootState } from '../index';
import { createSlice } from "@reduxjs/toolkit"
import { THEME_TYPE } from 'constant';

interface State {
  isMobile?: boolean
  themeType?: THEME_TYPE
  currentTheme?: THEME_TYPE
}

const initialState: State = {
  isMobile: undefined,
  themeType: undefined,
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
    setCurrentTheme(state, action) {
      state.currentTheme = action.payload
    },
  }
})


export const systemActions = systemSlice.actions
export const selectIsMobile = (state: RootState) => state.system.isMobile
export const selectThemeType = (state: RootState) => state.system.themeType
export const selectCurrentTheme = (state: RootState) => state.system.currentTheme
