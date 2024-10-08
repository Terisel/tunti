import { createContext, useEffect, useContext } from "react"
import React, { useState, ReactNode } from "react"
import { fetchPriceData } from  "@/api.ts"
import { PriceEntry } from  "@/types/types.ts"

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
