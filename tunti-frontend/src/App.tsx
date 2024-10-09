import "./App.css"
import { PriceList } from "@/components/domain/price-list"
import { usePriceContext } from "@/contexts/price-context.tsx"

// Main App Component
function App() {
  const context = usePriceContext()
  const { priceData, loading, error } = context

  // Sort price data by endDate in descending order (latest first)
  const sortedPriceData = [...priceData].sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())

  // Render loading state or error message
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <h1>Tunti - Pörssisähkön seuranta</h1>
      <PriceList prices={sortedPriceData} />
    </>
  )
}

export default App
