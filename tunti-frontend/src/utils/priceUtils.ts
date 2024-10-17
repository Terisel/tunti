// src/utils/priceUtils.ts

// Function to format the start date
export const formatStartDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) // Formats to HH:mm
}

// Function to format price
export const formatPrice = (price: number): string => {
  return (Math.round(price * 100) / 100).toFixed(2) // Round and format to two decimals
}

export const getDayNameInFinnish = (dateString: string) => {
  const date = new Date(dateString)

  // Get the day name in Finnish
  const dayName = new Intl.DateTimeFormat("fi-FI", { weekday: "long" }).format(date)

  // Format the date as "DD.MM"
  const formattedDate = new Intl.DateTimeFormat("fi-FI", {
    day: "2-digit",
    month: "2-digit"
  }).format(date)

  return `${dayName} ${formattedDate}` // Combine day name and formatted date
}
