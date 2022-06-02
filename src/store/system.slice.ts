import { RootState } from './index';
import { createSlice } from "@reduxjs/toolkit"

interface State {
  isMobile: boolean
}

const initialState: State = {
  isMobile: false
}

export const systemSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload
    }
  }
})


export const systemActions = systemSlice.actions
export const selectIsMobile = (state: RootState) => state.system.isMobile
