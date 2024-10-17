// tunti-frontend/src/components/domain/price-list.tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { usePriceContext } from "@/contexts/price-context.tsx"

const getCurrentHour = (): string => {
  const now = new Date()
  return now.toISOString().substring(0, 13) + ":00:00.000Z" // Format as "YYYY-MM-DDTHH:00:00.000Z"
}

function PriceList() {
  const context = usePriceContext()
  const { priceData } = context
  const currentHour = getCurrentHour()

  // Check if there are future prices
  if (priceData.length === 0) {
    return <h1 className="text-2xl font-bold text-center">No future price data available.</h1>
  }

  // Function to format the start date
  const formatStartDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) // Formats to HH:mm
  }

  const formatPrice = (price: number): string => {
    return (Math.round(price * 100) / 100).toFixed(2) // Round and format to two decimals
  }

  return (
    <ScrollArea className="rounded-[16px] border">
      {priceData.map((entry, index) => {
        let indicatorColor = "bg-green-500"
        if (entry.price > 8 && entry.price < 15) {
          indicatorColor = "bg-yellow-500"
        } else if (entry.price > 15) {
          indicatorColor = "bg-red-500"
        }

        // Apply styles for the first element based on whether it's the current hour
        const isCurrentHourFirstElement = index === 0 && entry.startDate === currentHour

        return (
          <div key={index}>
            <div
              className={`flex items-center p-[8px_16px] h-[36px] justify-between ${isCurrentHourFirstElement ? "bg-blue-600 text-white border border-blue-400 shadow-lg" : ""}`}
            >
              <div className={`w-3 h-3 ${indicatorColor} mr-2`} />
              <span className="flex-grow text-left">{formatStartDate(entry.startDate)}</span>
              <span className="text-right">{formatPrice(entry.price)} c/kWh</span>
            </div>
            <Separator className="my-2" />
          </div>
        )
      })}
    </ScrollArea>
  )
}

export { PriceList }
