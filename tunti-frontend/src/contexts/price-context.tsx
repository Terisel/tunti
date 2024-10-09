import { createContext, useEffect, useContext } from "react"
import React, { useState, ReactNode } from "react"

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
  const data: PriceData = await response.json()
  return data
}

interface PriceEntry {
  price: number
  startDate: string
  endDate: string
}

interface PriceData {
  prices: PriceEntry[]
}

// Define the shape of your context
interface PriceContextType {
  priceData: PriceEntry[]
  loading: boolean
  error: string
}

// Create the context with a default value
const PriceContext = createContext<PriceContextType | undefined>(undefined)

const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  return <PriceContext.Provider value={{ priceData, loading, error }}>{children}</PriceContext.Provider>
}

// Custom hook to access PriceContext
const usePriceContext = () => {
    const context = useContext(PriceContext); // Get context value

    // Ensure the hook is used within a PriceProvider
    if (!context) {
        throw new Error("usePriceContext must be used within a PriceProvider");
    }

    return context; // Return the context value
};

export { PriceProvider, usePriceContext }
