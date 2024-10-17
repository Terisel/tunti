// tunti-frontend/src/components/domain/price-list.tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { usePriceContext } from "@/contexts/price-context.tsx"
import { Moon } from "lucide-react"
import { PriceEntry } from "@/types/types"
import { formatStartDate, formatPrice } from "@/utils/priceUtils" // Import the utility functions

// New interface for PriceListScrollArea props
export interface PriceListScrollAreaProps {
  priceData: PriceEntry[] // Array of price entries
  currentHour: string // Current hour in ISO format
}

const getCurrentHour = (): string => {
  const now = new Date()
  return now.toISOString().substring(0, 13) + ":00:00.000Z" // Format as "YYYY-MM-DDTHH:00:00.000Z"
}

// Helper function to get colors based on price
const getColorsByPrice = (price: number) => {
  if (price > 8 && price < 15) {
    return { backgroundColor: "bg-yellow-300", textColor: "text-yellow-800" }
  } else if (price > 15) {
    return { backgroundColor: "bg-priceHighTransparent", textColor: "text-priceHigh" }
  }
  return { backgroundColor: "bg-priceLowTransparent", textColor: "text-priceLow" }
}

// Helper function to determine if moon icon should be shown
const shouldShowMoonIcon = (hour: number) => hour >= 22 || hour < 6

const PriceListScrollArea: React.FC<PriceListScrollAreaProps> = ({ priceData, currentHour }) => {
  return (
    <ScrollArea className="rounded-[16px] border">
      {priceData.map((entry, index) => {
        const entryHour = new Date(entry.startDate).getHours()
        const { backgroundColor, textColor } = getColorsByPrice(entry.price)
        const showMoonIcon = shouldShowMoonIcon(entryHour)

        // Apply styles for the first element based on whether it's the current hour
        const isCurrentHourFirstElement = index === 0 && entry.startDate === currentHour

        return (
          <div key={index}>
            <div
              className={`flex items-center p-[8px_16px] h-[36px] justify-between ${isCurrentHourFirstElement ? ` ${backgroundColor} ` : ""}`}
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