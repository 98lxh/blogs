import { RootState } from './index';
import { createSlice } from "@reduxjs/toolkit"

interface State {
  historys: string[]
}

const initialState: State = {
  historys: []
}

export const historySlice = createSlice({
  name: 'history',
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
    }
  }
})


export const historyActions = historySlice.actions
export const selectHistorys = (state: RootState) => state.history.historys
