// tunti-frontend/src/contexts/price-context.tsx
import { createContext, useEffect, useContext, useMemo } from "react"
import React, { useState, ReactNode } from "react"
import { fetchPriceData } from "@/api.ts"
import { PriceEntry } from "@/types/types.ts"
import { filterPastPrices } from "@/lib/utils" // Import the utility function

// Define the shape of your context
interface PriceContextType {
  priceData: PriceEntry[]
  loading: boolean
  error: string
  todaysAveragePrice: number
  description: string
}

// Create the context with a default value
const PriceContext = createContext<PriceContextType | undefined>(undefined)

const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [priceData, setPriceData] = useState<PriceEntry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [description, setFescription] = useState<string>("")
  const [todaysAveragePrice, setTodaysAveragePrice] = useState<number>(0)

  const currentHour = new Date().toISOString().substring(0, 13) + ":00:00.000Z" // Get current hour in required format

  // Fetch price data on component mount
  useEffect(() => {
    const getPriceData = async () => {
      try {
        const data = await fetchPriceData()
        // Sort and filter price data here before setting it
        const sortedData = data.prices.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
        const filteredData = filterPastPrices(sortedData, currentHour) // Filter past prices
        setPriceData(filteredData) // Set filtered price entries directly
        setFescription(data.description)
        setTodaysAveragePrice(data.todaysAveragePrice)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    getPriceData()
  }, []) // Empty dependency array ensures this runs once on mount

  const value = useMemo(
    () => ({ priceData, loading, error, description, todaysAveragePrice }),
    [priceData, loading, error]
  )

  return <PriceContext.Provider value={value}>{children}</PriceContext.Provider>
}

// Custom hook to access PriceContext
const usePriceContext = () => {
  const context = useContext(PriceContext) // Get context value
  if (!context) {
    throw new Error("usePriceContext must be used within a PriceProvider")
  }
  return context // Return the context value
}

export { PriceProvider, usePriceContext }
