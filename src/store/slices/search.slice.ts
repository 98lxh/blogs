import { RootState } from '../index';
import { createSlice } from "@reduxjs/toolkit"

interface State {
  historys: string[]
  categoryId: number
  searchText: string
}

const initialState: State = {
  historys: [],
  categoryId: 0,
  searchText: ''
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    initHistory(state, action) {
      state.historys = action.payload
    },
    setHistory(state, action) {
      const isFindIndex = state.historys.findIndex(h => h === action.payload)
      if (isFindIndex !== -1) {
        state.historys.splice(isFindIndex, 1)
      }
      state.historys.unshift(action.payload)
      localStorage.setItem('history', JSON.stringify(state.historys))
    },
    deleteHistory(state, action) {
      state.historys.splice(action.payload, 1)
      localStorage.setItem('history', JSON.stringify(state.historys))
    },
    clearHistory(state) {
      state.historys = []
      localStorage.setItem('history', JSON.stringify([]))
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSearchText(state, action) {
      state.searchText = action.payload
    }
  }
})


export const searchActions = searchSlice.actions
export const selectHistorys = (state: RootState) => state.search.historys
export const selectCategoryId = (state: RootState) => state.search.categoryId
export const selectSearchText = (state: RootState) => state.search.searchText
