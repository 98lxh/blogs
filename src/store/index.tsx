import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./auth.slice"
import { historySlice } from "./history.slice"
import { systemSlice } from "./system.slice"


export const rootReducer = {
  auth: authSlice.reducer,
  system: systemSlice.reducer,
  history:historySlice.reducer
}

export const store = configureStore({
  reducer:rootReducer
})



export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
