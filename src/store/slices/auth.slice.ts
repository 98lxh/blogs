import { AppDispatch } from './../index';
import { UserForm, userLogin, userLogout, userRegister } from './../../api/user';
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
      console.log(action.payload)
      state.user = action.payload
    }
  }
})

const { setUser } = authSlice.actions
export const authActions = authSlice.actions

export const login = (form: UserForm) =>
  (dispatch: AppDispatch) =>
    userLogin(form)
      .then(user => {
        dispatch(setUser(user))
        window.localStorage.setItem('user', JSON.stringify(user))
      })

export const logout = () =>
  (dispatch: AppDispatch) =>
    userLogout()
      .then(() => {
        dispatch(setUser(null))
        window.localStorage.removeItem('user')
      })

export const register = (form: UserForm) =>
  (dispatch: AppDispatch) =>
    userRegister(form)
      .then((user) => dispatch(setUser(user)))

export const selectUser = (state: RootState) => state.auth.user
