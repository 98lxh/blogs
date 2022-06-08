import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./slices/auth.slice"
import { floatSlice } from "./slices/float.slice"
import { searchSlice } from "./slices/search.slice"
import { systemSlice } from "./slices/system.slice"


export const rootReducer = {
  auth: authSlice.reducer,
  system: systemSlice.reducer,
  search: searchSlice.reducer,
  float:floatSlice.reducer
}

export const store = configureStore({
  reducer:rootReducer
})



export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
