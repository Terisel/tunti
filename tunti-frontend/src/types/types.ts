// tunti-frontend/src/types/types.ts
export interface PriceEntry {
  price: number
  startDate: string
  endDate: string
}
export interface PriceData {
  prices: PriceEntry[]
  todaysAveragePrice: number
  description: string
}
