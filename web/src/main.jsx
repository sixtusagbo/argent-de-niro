import React from 'react'
import ReactDOM from 'react-dom/client'
// import {
//   createBrowserRouter,
//   RouterProvider
// } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// import LandingPage from './pages/landing'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LandingPage />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
