import React from 'react'
import ReactDOM from 'react-dom/client'
// import {
//   createBrowserRouter,
//   RouterProvider
// } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store'
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
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
)
