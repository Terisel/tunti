// tunti-frontend/src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PriceEntry } from "@/types/types.ts"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const filterPastPrices = (prices: PriceEntry[], currentHour: string): PriceEntry[] => {
  return prices.filter(entry => entry.startDate >= currentHour)
}
