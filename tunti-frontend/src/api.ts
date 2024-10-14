import { PriceData } from "@/types/types.ts"

const API_URL = "https://tunti-backend.fly.dev/api/latest-prices"
// Function to fetch price data from the API
export const fetchPriceData = async (): Promise<PriceData> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const data: PriceData = await response.json()
  return data
}
