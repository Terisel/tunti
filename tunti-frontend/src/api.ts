import { PriceData } from  "@/types/types.ts"

// API URL for fetching latest price data
// In development, this URL is proxied through Vite's server to avoid CORS issues.
// The '/api' prefix will be rewritten to point to the actual API endpoint.
// Uncomment the line below for production deployment, where requests will go through a CORS proxy.
// This is necessary if the target API does not support CORS for your domain.
const API_URL = "/api/v1/latest-prices.json"
// const API_URL = 'https://cors-anywhere.herokuapp.com/https://api.porssisahko.net/v1/latest-prices.json';

// Function to fetch price data from the API
export const fetchPriceData = async (): Promise<PriceData> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const data: PriceData = await response.json()
  return data
}