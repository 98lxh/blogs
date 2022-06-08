import { RootState } from '../index';
import { createSlice } from "@reduxjs/toolkit"

interface State {
  aticleFloat: {
    cover: { inStyle: any },
    title: { inStyle: any },
    author: { inStyle: any },
  } | null
}

const initialState: State = {
  aticleFloat: null
}


export const floatSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setArticleFloat(state, action) {
      state.aticleFloat = action.payload
    }
  }
})

export const floatActions = floatSlice.actions

export const selecrArticleFloat = (state: RootState) => state.float.aticleFloat

