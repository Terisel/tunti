// tunti-frontend/src/components/domain/price-list.tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePriceContext } from "@/contexts/price-context.tsx"
import { Moon } from "lucide-react"
import { PriceEntry } from "@/types/types"
import { formatStartDate, formatPrice, getDayNameInFinnish } from "@/utils/priceUtils"

export interface PriceListScrollAreaProps {
  priceData: PriceEntry[] 
  currentHour: string 
}

// Function to check if the given date is the first hour of the day (00:00)
const isFirstHourOfDay = (dateString: string): boolean => {
  const date = new Date(dateString)
  return date.getHours() === 0 && date.getMinutes() === 0 // Check for 00:00
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

        // Determine if this is the first element and if it matches the current hour
        const isCurrentHourFirstElement = index === 0 && entry.startDate === currentHour

        // Determine final background color based on conditions
        const finalBackgroundColor = isCurrentHourFirstElement
          ? backgroundColor // Use price-based color for the first element
          : showMoonIcon
            ? "bg-nightTime" // Use purple background if not first and moon icon should be shown
            : "" // No specific background if neither condition is met
        const isMidnight = isFirstHourOfDay(entry.startDate)
        return (
          <div key={index}>
            {isMidnight ? (
              <div
                className={`flex border-b border-b-lightGray items-center p-[8px_16px] h-[36px] justify-between ${finalBackgroundColor}`}
              >
                <span>{getDayNameInFinnish(entry.startDate)}</span>
              </div>
            ) : (
              <></>
            )}
            <div
              className={`flex border-b border-b-lightGray items-center p-[8px_16px] h-[36px] justify-between ${finalBackgroundColor}`}
            >
              <span className="flex-grow text-left">
                {formatStartDate(entry.startDate)}
                {showMoonIcon && <Moon className="inline-block ml-1 w-4 h-4" />}
              </span>
              <span className={`font-right ${textColor}`}>{formatPrice(entry.price)} c/kWh</span>
            </div>
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
