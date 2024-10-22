// priceUtils.ts

// Price interface
export interface Price {
  price: number;
  startDate: string;
  endDate: string;
}

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
  if (average === undefined) return "Ei tietoa hinnasta."; // No information about the price.

  // Define your thresholds for high and low prices
  const highPriceThreshold = 15; // Adjust this threshold based on your criteria
  const fluctuationThreshold = 20; // Threshold for significant price fluctuation

  // Calculate max and min prices to check for fluctuation
  const pricesArray = prices.map((price) => price.price);
  const maxPrice = Math.max(...pricesArray);
  const minPrice = Math.min(...pricesArray);

  // Check if there is significant fluctuation in today's prices
  if (maxPrice - minPrice > fluctuationThreshold) {
    return "Tänään hinnat vaihtelevat paljon."; // Prices are fluctuating a lot today.
  }

  // Determine if it's a high or low price day
  if (average > highPriceThreshold) {
    return "Tänään sähkön hinta on korkea."; // High electricity price today.
  } else {
    return "Tänään sähkön hinta on alhainen."; // Low electricity price today.
  }
};
