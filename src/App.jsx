import { useState } from 'react'
import './App.css'
import ThreeTest from './threeTest/threeTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <ThreeTest></ThreeTest>
      </div>
    </div>
  )
}

export default App
