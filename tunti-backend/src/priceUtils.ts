// priceUtils.ts

// Price interface
export interface Price {
  price: number;
  startDate: string;
  endDate: string;
}

// Constants for price descriptions
export const PriceDescription = {
  HIGH_PRICE: 'highPrice',
  LOW_PRICE: 'lowPrice',
  FLUCTUATING: 'fluctuating',
  NO_INFO: 'noInfo',
};

// Function to calculate average price
export const calculateAveragePrice = (prices: Price[]): { average?: number; message?: string } => {
  if (prices.length === 0) {
    return { message: 'No prices available.' };
  }

  const total = prices.reduce((acc, curr) => acc + curr.price, 0);
  const average = total / prices.length;

  return { average };
};

// Function to filter prices for the current day
export const getCurrentDayPrices = (prices: Price[]): Price[] => {
  const now = new Date();

  // Get the start and end of the current day
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1); // End of the day is the next day at midnight

  // Filter prices for today
  return prices.filter((price) => {
    const startDate = new Date(price.startDate);
    const endDate = new Date(price.endDate);
    return startDate >= startOfDay && endDate < endOfDay;
  });
};

// Function to generate a description based on average price and variability
export const getPriceDescription = (prices: Price[], average?: number): string => {
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
