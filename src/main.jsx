import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  HomePage, NotFoundError,
  RegistrationPage, LoginPage, CreateBlogPage,
  BlogPage, BlogsPage, UpdateBlogPage
} from './pages'
import { AuthLayout } from './components'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundError />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/register',
        element: (
          <AuthLayout>
            <RegistrationPage />
          </AuthLayout>
        )
      },
      {
        path: '/login',
        element: (
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        )
      },
      {
        path: '/create',
        element: (
          <AuthLayout authentication>
            <CreateBlogPage />
          </AuthLayout>
        )
      },
      {
        path: '/blogs',
        element: (
          <AuthLayout authentication>
            <BlogsPage />
          </AuthLayout>
        )
      },
      {
        path: '/blogs/:blogId',
        element: (
          <AuthLayout authentication>
            <BlogPage />
          </AuthLayout>
        )
      },
      {
        path: '/blogs/:blogId/update',
        element: (
          <AuthLayout authentication>
            <UpdateBlogPage />
          </AuthLayout>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
