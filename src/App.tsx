import { useState } from 'react'
import reactLogo from './assets/react.svg'
import T0 from './assets/T-0.png'
import T1 from './assets/T-1.png'
import T2 from './assets/T-2.png'
import T3 from './assets/T-3.png'
import './App.css'
import PostForm from './Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        {/* <img src={T0} alt="Vite logo" /> */}
        <img src={T1} className='logo' alt="blogginator writer" />
        <img src={T2} className='logo' alt="blogginator writer" />
        <img src={T3} className='logo' alt="blogginator writer" />
      </div>
      <h1>The Blogginator</h1>
      <PostForm />
    </div>
  )
}

export default App
