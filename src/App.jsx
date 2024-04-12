import { Outlet } from "react-router-dom"
import { Header, Footer, Container, LoadingIcon } from "./components"
import authService from './appwrite/auth'
import { login, logout } from "./features/authSlice"
import { selectDarkMode } from "./features/themeSlice"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'


export default function App() {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async function fetchData() {
      const userData = await authService.getCurrentUser()
      userData ? dispatch(login(userData)) : dispatch(logout())
      setIsLoading(false)
    })()
  }, []);

  useEffect(() => {
    const root = document.querySelector('html')
    darkMode ? root.classList.add('dark') : root.classList.remove('dark')
  }, [darkMode])

  if (isLoading) {
    return (
      <Container flexBox flexProp="h-screen" bgColor="dark:bg-neutral-800">
        <LoadingIcon />
      </Container >
    )
  }

  return (
    <Container flexBox flexProp="!justify-between !gap-0 min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </Container>
  )
}
