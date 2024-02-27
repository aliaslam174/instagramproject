import { configureStore } from '@reduxjs/toolkit'
import {userauthslice} from '../redux/userauthslice'
export const store = configureStore({
  reducer: {
userAuth:userauthslice.reducer
  },
})