import "./App.css"
import { PriceList } from "@/components/domain/price-list"
import { usePriceContext } from "@/contexts/price-context.tsx"

// Main App Component
function App() {
  const context = usePriceContext()
  const { loading, error } = context

  // Render loading state or error message
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <h1>Tunti - Pörssisähkön seuranta</h1>
      <PriceList />
    </>
  )
}

export default App
