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
import Dashboard from './pages/dashboard'
import SharedLanding from './pages/sharedlanding'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLanding />} >
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<Home />} />
          <Route path="budget" element={<Budget />} />
          <Route path="goals" element={<Goals />} />
          <Route path="analytics" element={<Analytics />} />
          {/* <Route path="transactions" element={<Transactions />} /> */}
        </Route>
      </Routes>
    </BrowserRouter >

    // <>
    //   <main>

    //     <LoginPage />
    //   </main>
    // </>
  )
}

export default App
