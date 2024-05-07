import './App.css'
// import Menubar from './components/menubar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/signup'
import LoginPage from './pages/login'
import LandingPage from './pages/landing'
import Home from './pages/home'
import Budget from './pages/budget'
import Goals from './pages/goals'
import Analytics from './pages/analytics'
// import Transactions from './pages/transactions'
// import { AuthProvider } from './context/AuthProvider'
import GoalForm from './pages/goalSetup'
import PreAuth from './layouts/PreAuth'
import NotFound from './404'
import RequireAuth from './layouts/RequireAuth'

function App() {
  return (

    <BrowserRouter>
      
        <Routes>
          <Route index element={<LandingPage />} />

          <Route element={<PreAuth />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="home" element={<Home />} />
            <Route path="budget" element={<Budget />} />
            <Route path="goals" element={<Goals />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="addgoal" element={<GoalForm />} />
          </Route>
          {/* <Route path="transactions" element={<Transactions />} /> */}


          <Route path="*" element={<NotFound />} />
        </Routes>
      
    </BrowserRouter>

    // <>
    //   <main>

    //     <LoginPage />
    //   </main>
    // </>
  )
}

export default App
