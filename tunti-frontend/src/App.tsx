import { useState } from 'react'
import './App.css'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"


const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm">
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Tunti - Pörssisähkön seuranta</h1>
      <ScrollAreaDemo/>
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
