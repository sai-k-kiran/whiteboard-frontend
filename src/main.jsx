import React from 'react'
import ReactDOM from 'react-dom/client'
import "./App.css"
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import SignIn from './components/Auth/Signin'
import Home from './components/Home/Home'
import LoginFailed from './components/Auth/LoginFailed'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AllDesignsContainer from './components/Folders/AllDesignsContainer'
import SavedDesigns from './components/Folders/SavedDesigns'
import UploadsContainer from './components/Folders/UploadsContainer'
import MainEditor from './components/Editor/MainEditor'

export const CanvasContext = React.createContext();

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <LoginFailed />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/allDesigns",
        element: <AllDesignsContainer />
      },
      {
        path: "/home/saved",
        element: <SavedDesigns />
      },
      {
        path: "/home/uploads",
        element: <UploadsContainer />
      }
    ]
  },
  {
    path: "/editor",
    element: <MainEditor />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CanvasContext.Provider value={React.createRef()}>
          <RouterProvider router={router} />
      </ CanvasContext.Provider>
  </React.StrictMode>,
)
