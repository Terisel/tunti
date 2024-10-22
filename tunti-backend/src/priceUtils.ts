// priceUtils.ts

// Price interface
export interface Price {
  price: number;
  startDate: string;
  endDate: string;
}

// Constants for price descriptions
export const PriceDescription = {
  HIGH_PRICE: "highPrice",
  LOW_PRICE: "lowPrice",
  FLUCTUATING: "fluctuating",
  NO_INFO: "noInfo",
};

// Function to calculate average price
export const calculateAveragePrice = (
  prices: Price[]
): { average?: number; message?: string } => {
  if (prices.length === 0) {
    return { message: "No prices available." };
  }

  const total = prices.reduce((acc, curr) => acc + curr.price, 0);
  const average = total / prices.length;

  return { average };
};

// Function to generate a description based on average price and variability
export const getPriceDescription = (
  prices: Price[],
  average?: number
): string => {
  if (average === undefined) return PriceDescription.NO_INFO; // No information about the price.

  // Define your thresholds for high and low prices
  const highPriceThreshold = 15; // Adjust this threshold based on your criteria
  const fluctuationThreshold = 20; // Threshold for significant price fluctuation

  // Calculate max and min prices to check for fluctuation
  const pricesArray = prices.map((price) => price.price);
  const maxPrice = Math.max(...pricesArray);
  const minPrice = Math.min(...pricesArray);

  // Check if there is significant fluctuation in today's prices
  if (maxPrice - minPrice > fluctuationThreshold) {
    return PriceDescription.FLUCTUATING; // Prices are fluctuating a lot today.
  }

  // Determine if it's a high or low price day
  if (average > highPriceThreshold) {
    return PriceDescription.HIGH_PRICE; // High electricity price today.
  } else {
    return PriceDescription.LOW_PRICE; // Low electricity price today.
  }
};
