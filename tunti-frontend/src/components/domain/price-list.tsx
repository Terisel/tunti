// tunti-frontend/src/components/domain/price-list.tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { usePriceContext } from "@/contexts/price-context.tsx"
import { Moon } from "lucide-react"
import { PriceEntry } from "@/types/types"

// New interface for PriceListScrollArea props
export interface PriceListScrollAreaProps {
  priceData: PriceEntry[] // Array of price entries
  currentHour: string // Current hour in ISO format
}
const getCurrentHour = (): string => {
  const now = new Date()
  return now.toISOString().substring(0, 13) + ":00:00.000Z" // Format as "YYYY-MM-DDTHH:00:00.000Z"
}

// Function to format the start date
const formatStartDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) // Formats to HH:mm
}

// Function to format price
const formatPrice = (price: number): string => {
  return (Math.round(price * 100) / 100).toFixed(2) // Round and format to two decimals
}

const PriceListScrollArea: React.FC<PriceListScrollAreaProps> = ({ priceData, currentHour }) => {
  return (
    <ScrollArea className="rounded-[16px] border">
      {priceData.map((entry, index) => {
        // Get hour from entry's startDate
        const entryHour = new Date(entry.startDate).getHours()
        let showMoonIcon = false // Flag for showing moon icon
        let elementBackgroundColor = "bg-priceLowTransparent" // Default background color
        let textColor = "text-priceLow" // Default text color

        if (entry.price > 8 && entry.price < 15) {
          elementBackgroundColor = "bg-yellow-300"
          textColor = "text-yellow-800" // Change text color for yellow range
        } else if (entry.price > 15) {
          elementBackgroundColor = "bg-priceHighTransparent"
          textColor = "text-priceHigh" // Change text color for red range
        }

        // Check if hour is between 22 and 06 for moon icon
        if (entryHour >= 22 || entryHour < 6) {
          showMoonIcon = true // Set flag to show moon icon
        }

        // Apply styles for the first element based on whether it's the current hour
        const isCurrentHourFirstElement = index === 0 && entry.startDate === currentHour

        return (
          <div key={index}>
            <div
              className={`flex items-center p-[8px_16px] h-[36px] justify-between ${isCurrentHourFirstElement ? ` ${elementBackgroundColor} ` : ""}`}
            >
              <span className="flex-grow text-left">
                {formatStartDate(entry.startDate)}
                {showMoonIcon && <Moon className="inline-block ml-1 w-4 h-4" />}
              </span>
              <span className={`text-right ${textColor}`}>{formatPrice(entry.price)} c/kWh</span>
            </div>
            <Separator className="" />
          </div>
        )
      })}
    </ScrollArea>
  )
}

function PriceList() {
  const context = usePriceContext()
  const { priceData } = context
  const currentHour = getCurrentHour()

  // Check if there are future prices
  if (priceData.length === 0) {
    return <h1 className="text-2xl font-bold text-center">No future price data available.</h1>
  }

  return (
    <div>
      <PriceListScrollArea priceData={priceData} currentHour={currentHour} />
    </div>
  )
}

export { PriceList }
