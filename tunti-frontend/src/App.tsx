// src/App.tsx
import { PriceList } from "@/components/domain/price-list"
import { AveragePrice } from "@/components/domain/average-price"
import { PriceDescription } from "@/components/domain/price-description"
import { usePriceContext } from "@/contexts/price-context.tsx"

function App() {
  const { loading, error, description, todaysAveragePrice } = usePriceContext()

  if (loading) return <h1 className="text-2xl font-bold text-center">Loading...</h1>
  if (error) return <h1 className="text-2xl font-bold text-center">Error: {error}</h1>

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Tunti - Pörssisähkön seuranta.</h1>
      <div className="container">
        <AveragePrice price={todaysAveragePrice} />
        <PriceDescription description={description} />
      </div>
      <PriceList />
    </>
  )
}

export default App
