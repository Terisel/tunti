import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Tunti - Pörssisähkön seuranta</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div className='bg-priceLow'>Price Low</div>
      <div className='bg-priceMedium'>Price medium</div>
      <div className='bg-priceHigh'>Price High</div>
    </>
  )
}

export default App
