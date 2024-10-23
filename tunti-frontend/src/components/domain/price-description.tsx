// src/components/domain/price-description.tsx
const PRICE_DESCRIPTION_MESSAGES = {
  highPrice: "Sähkönhinnat ovat tänään korkeat",
  lowPrice: "Sähkönhinnat ovat tänään alhaiset",
  fluctuating: "Sähkönhinta vaihtelee tänään",
  noInfo: "Ei tietoa sähkönhinnoista"
} as const

// Helper function to get background color based on description type
const getDescriptionBackground = (description: keyof typeof PRICE_DESCRIPTION_MESSAGES) => {
  switch (description) {
    case 'highPrice':
      return 'bg-priceHighTransparent'
    case 'lowPrice':
      return 'bg-priceLowTransparent'
    case 'fluctuating':
      return 'bg-purple-100'
    case 'noInfo':
      return 'bg-[rgba(251,24,28,0.15)]'
    default:
      return ''
  }
}

interface PriceDescriptionProps {
  description: string
}

function PriceDescription({ description }: PriceDescriptionProps) {
  const descriptionType = description as keyof typeof PRICE_DESCRIPTION_MESSAGES
  const descriptionText = PRICE_DESCRIPTION_MESSAGES[descriptionType] || "Unknown description"
  const descriptionBgColor = getDescriptionBackground(descriptionType)

  return (
    <div className={`box description-box ${descriptionBgColor}`}>
      <div className="description-text">{descriptionText}</div>
    </div>
  )
}

export { PriceDescription }