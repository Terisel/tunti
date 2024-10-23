// src/components/domain/price-description.tsx
import { TrendingUp, ArrowLeftRight, HelpCircle, LucideIcon, PiggyBank } from "lucide-react"
import React from "react"

const PRICE_DESCRIPTION_MESSAGES = {
  highPrice: "Sähkönhinnat ovat tänään korkeat",
  lowPrice: "Sähkönhinnat ovat tänään alhaiset",
  fluctuating: "Sähkönhinta vaihtelee tänään",
  noInfo: "Ei tietoa sähkönhinnoista"
} as const

const DESCRIPTION_ICONS: Record<keyof typeof PRICE_DESCRIPTION_MESSAGES, LucideIcon> = {
  highPrice: TrendingUp,
  lowPrice: PiggyBank,
  fluctuating: ArrowLeftRight,
  noInfo: HelpCircle
}

interface PriceDescriptionProps {
  description: string
}

export const PriceDescription: React.FC<PriceDescriptionProps> = ({ description }) => {
  const descriptionType = description as keyof typeof PRICE_DESCRIPTION_MESSAGES
  const descriptionText = PRICE_DESCRIPTION_MESSAGES[descriptionType] || "Unknown description"
  const IconComponent = DESCRIPTION_ICONS[descriptionType] || HelpCircle

  return (
    <div className={`box description-box p-6 rounded-xl`}>
      <div className="description-text">
        <span>{descriptionText} </span>
        <IconComponent className="h-8 w-8" />
      </div>
    </div>
  )
}
