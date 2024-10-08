import { useState, useEffect } from "react"
import "./App.css"

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

// API URL for fetching latest price data
// In development, this URL is proxied through Vite's server to avoid CORS issues.
// The '/api' prefix will be rewritten to point to the actual API endpoint.
// Uncomment the line below for production deployment, where requests will go through a CORS proxy.
// This is necessary if the target API does not support CORS for your domain.
const API_URL = "/api/v1/latest-prices.json"
// const API_URL = 'https://cors-anywhere.herokuapp.com/https://api.porssisahko.net/v1/latest-prices.json';

// Function to fetch price data from the API
const fetchPriceData = async (): Promise<PriceData> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const data: PriceData = await response.json() // Map directly to PriceData type
  return data
}

// Main App Component
function App() {
  const [priceData, setPriceData] = useState<PriceEntry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  // Fetch price data on component mount
  useEffect(() => {
    const getPriceData = async () => {
      try {
        const data = await fetchPriceData()
        setPriceData(data.prices) // Set price entries directly
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    getPriceData()
  }, []) // Empty dependency array ensures this runs once on mount

  // Function to format the start date
  const formatStartDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit"
    }) // Formats to HH:mm
  }

  // Sort price data by endDate in descending order (latest first)
  const sortedPriceData = [...priceData].sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())

  // Render loading state or error message
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <h1>Tunti - Pörssisähkön seuranta</h1>
      <ScrollArea className="rounded-md border">
        <div className="p-4">
          {sortedPriceData.map((entry, index) => (
            <div key={index}>
              {formatStartDate(entry.startDate)} - Price: {entry.price}
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}

export default App
