// tunti-frontend/src/App.tsx
import { PriceList } from "@/components/domain/price-list"
import { usePriceContext } from "@/contexts/price-context.tsx"

// Main App Component
function App() {
  const context = usePriceContext()
  const { loading, error } = context

  // Render loading state or error message
  if (loading) return <h1 className="text-2xl font-bold text-center">Loading...</h1>
  if (error) return <h1 className="text-2xl font-bold text-center">Error: {error}</h1>

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Tunti - Pörssisähkön seuranta</h1>
      <div className="flex gap-4 mb-4 ">
        <div className="w-1/2 h-104 pt-4 pr-2 pb-4 pl-4 items-center justify-center rounded-[16px] border h-[36px]">
          <div>keskihinta tänään</div>
          <span> klo 0-24</span>
          <div> 7,68 c/kWh</div>
        </div>

        <div className="w-1/2 h-104 pt-4 pr-2 pb-4 pl-4 items-center justify-center rounded-[16px] border h-[36px]">
          <div>Sähkönhinta jee on alhaista tänään wuhuu</div>
        </div>
      </div>
      <PriceList />
    </>
  )
}

export default App
