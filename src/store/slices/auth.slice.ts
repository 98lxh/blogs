import { AppDispatch } from './../index';
import { UserForm, userLogin, userLogout } from './../../api/user';
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

const { setUser } = authSlice.actions
export const authActions = authSlice.actions

export const login = (form: UserForm) =>
  (dispatch: AppDispatch) =>
    userLogin(form)
      .then(user => dispatch(setUser(user)))

export const logout = () =>
  (dispatch: AppDispatch) =>
    userLogout()
      .then(() => dispatch(setUser(null)))

export const selectUser = (state: RootState) => state.auth.user
