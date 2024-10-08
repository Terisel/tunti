import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Interfaces for Price Data
interface PriceEntry {
  price: number
  startDate: string // You can also use Date if you want to convert it later
  endDate: string // Same as above
}

interface PriceData {
  prices: PriceEntry[]
}

const getCurrentHour = (): string => {
  const now = new Date()
  return now.toISOString().substring(0, 13) + ":00:00.000Z" // Format as "YYYY-MM-DDTHH:00:00.000Z"
}

function PriceList({ prices }: PriceData) {
  // Function to format the start date
  const formatStartDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { weekday: "long", hour: "2-digit", minute: "2-digit" }) // Formats to day HH:mm
  }
  const currentHour = getCurrentHour()

  return (
    <ScrollArea className="rounded-md border">
      <div className="p-4">
        {prices.map((entry, index) => {
          // Determine the color of the indicator based on price
          let indicatorColor = "bg-green-500"
          if (entry.price > 8 && entry.price < 15) {
            indicatorColor = "bg-yellow-500"
          } else if (entry.price > 15) {
            indicatorColor = "bg-red-500"
          }

          const isCurrentHour = entry.startDate === currentHour
          return (
            <>
              <div
                key={index}
                className={`flex items-center justify-between my-2 p-3 rounded-lg transition-all duration-300 ${isCurrentHour ? "bg-blue-600 text-white border border-blue-400 shadow-lg" : ""}`}
              >
                <div className={`w-3 h-3  ${indicatorColor} mr-2`} />
                <span className="flex-grow text-left">{formatStartDate(entry.startDate)}</span>
                <span className="text-right">{entry.price} c/kWh</span>
              </div>
              <Separator className="my-2" />
            </>
          )
        })}
      </div>
    </ScrollArea>
  )
}

export { PriceList }
