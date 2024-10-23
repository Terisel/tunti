// src/components/domain/average-price.tsx
import { formatPrice } from "@/utils/priceUtils"

// Helper function to get colors based on price
const getColorsByPrice = (price: number) => {
  if (price > 8 && price < 15) {
    return "text-yellow-800"
  } else if (price > 15) {
    return "text-priceHigh"
  }
  return "text-priceLow"
}

interface AveragePriceProps {
  price: number
}

export function AveragePrice({ price }: AveragePriceProps) {
  return (
    <div className="box">
      <div className="price-title">Keskihinta tänään</div>
      <span className="price-subtitle">klo 0-24</span>
      <div className={`price-value ${getColorsByPrice(price)}`}>
        {formatPrice(price)} c/kWh
      </div>
    </div>
  )
}
