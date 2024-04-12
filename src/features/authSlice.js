import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  userData: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isSignedIn = true
      state.userData = action.payload
    },
    logout: (state) => {
      state.isSignedIn = false
      state.userData = null
    }
  }
})

export const { login, logout } = authSlice.actions

export const selectSignedIn = (state) => state.auth.isSignedIn
export const selectUserData = (state) => state.auth.userData

export default authSlice.reducer