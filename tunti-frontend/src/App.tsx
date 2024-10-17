// tunti-frontend/src/App.tsx
import { PriceList } from "@/components/domain/price-list"
import { usePriceContext } from "@/contexts/price-context.tsx"

// Main App Component
function App() {
  const context = usePriceContext()
  const { loading, error } = context

  // Render loading state or error message
  if (loading) return  <h1 className="text-2xl font-bold text-center">Loading...</h1>
  if (error) return <h1 className="text-2xl font-bold text-center">Error: {error}</h1>

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Tunti - Pörssisähkön seuranta</h1>
      <PriceList />
    </>
  )
}

export default App
