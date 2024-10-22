// tunti-frontend/src/App.tsx
import { PriceList } from "@/components/domain/price-list"
import { usePriceContext } from "@/contexts/price-context.tsx"
import { formatPrice } from "@/utils/priceUtils" // Import the utility functions

const PriceDescription = {
  highPrice: "Sähkönhinnat ovat tänään korkeat",
  lowPrice: "Sähkönhinnat ovat tänään alhaiset",
  fluctuating: "Sähkönhinta vaihtelee tänään",
  noInfo: "Ei tietoa sähkönhinnoista"
} as const

// Main App Component
function App() {
  const context = usePriceContext()
  const { loading, error, description, todaysAveragePrice } = context

  // Helper function to get colors based on price
  const getColorsByPrice = (price: number) => {
    if (price > 8 && price < 15) {
      return "text-yellow-800"
    } else if (price > 15) {
      return "text-priceHigh"
    }
    return "text-priceLow"
  }

  const descriptionText = PriceDescription[description as keyof typeof PriceDescription] || "Unknown description"

  // Render loading state or error message
  if (loading) return <h1 className="text-2xl font-bold text-center">Loading...</h1>
  if (error) return <h1 className="text-2xl font-bold text-center">Error: {error}</h1>

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Tunti - Pörssisähkön seuranta</h1>
      <div className="container">
        <div className="box">
          <div>keskihinta tänään</div>
          <span> klo 0-24</span>
          <div className={getColorsByPrice(todaysAveragePrice)}> {formatPrice(todaysAveragePrice)} c/kWh</div>
        </div>

        <div className="box">
          <div>{descriptionText}</div>
        </div>
      </div>
      <PriceList />
    </>
  )
}

export default App
