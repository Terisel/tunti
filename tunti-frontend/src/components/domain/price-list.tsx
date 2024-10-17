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
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) // Formats to day HH:mm
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

        const isCurrentHour = entry.startDate === currentHour
        const currentDate = new Date(entry.startDate).toLocaleDateString()
        const previousDate = index > 0 ? new Date(priceData[index - 1].startDate).toLocaleDateString() : null

        return (
          <div key={index}>
            {currentDate !== previousDate && (
              <h2 className="text-l font-bold my-4">
                {new Date(entry.startDate).toLocaleDateString("en-US", { weekday: "long" })}
              </h2>
            )}
            <div
              className={`flex items-center p-[8px_16px] h-[36px] justify-between ${isCurrentHour ? "bg-blue-600 text-white border border-blue-400 shadow-lg" : ""}`}
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
