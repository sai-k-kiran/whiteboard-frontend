import React from 'react'
import ReactDOM from 'react-dom/client'
import "./App.css"
import Login from './components/Auth/Login'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  }
  // {
  //   path: "/register",
  //   element: <Register />
  // },
  // {
  //   path: "/home",
  //   element:  <AllDesignsContainer />
  // },
  // {
  //   path: "/home/saved",
  //   element:  <SavedDesignsContainer />
  // },
  // {
  //   path: "/home/uploads",
  //   element:  <UploadsContainer />
  // },
  // {
  //   path: "/design",
  //   element:  <MainEditor />
  // },
  // {
  //   path: "dashboard",
  //   element: <ProtectedRoutes>
  //     <App />
  //   </ProtectedRoutes>
  // }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
