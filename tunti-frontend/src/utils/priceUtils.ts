// src/utils/priceUtils.ts

// Function to format the start date
export const formatStartDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Formats to HH:mm
  };
  
  // Function to format price
  export const formatPrice = (price: number): string => {
    return (Math.round(price * 100) / 100).toFixed(2); // Round and format to two decimals
  };