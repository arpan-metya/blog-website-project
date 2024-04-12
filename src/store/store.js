import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import themeReducer from '../features/themeSlice'
import blogSlice from '../features/blogSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    blogs: blogSlice
  }
})

export default store