import { PriceData } from "@/types/types.ts"

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined. Please check your environment variables.");
}

// Function to fetch price data from the API
export const fetchPriceData = async (): Promise<PriceData> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: PriceData = await response.json();
  return data;
}