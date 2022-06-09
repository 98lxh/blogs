import { User } from 'types/user';
import { RootState } from '../index';
import { createSlice } from "@reduxjs/toolkit"


interface State {
  user: User | null
}

const initialState: State = {
  user: null
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    }
  }
})

export const authActions = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
