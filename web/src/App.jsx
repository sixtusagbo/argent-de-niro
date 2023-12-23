import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menubar from './components/menubar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <Menubar/>
    </main>
    </>
  )
}

export default App
