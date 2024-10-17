// tunti-frontend/src/tests/components/domain/price-list.test.tsx
import { ReactNode } from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { PriceList } from "@/components/domain/price-list"
import { PriceProvider, usePriceContext } from "@/contexts/price-context.tsx"

// Mocking the usePriceContext hook
jest.mock("@/contexts/price-context.tsx", () => ({
  PriceProvider: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  usePriceContext: jest.fn()
}))

const mockPriceData = [
  { price: 12.452, startDate: "2024-10-09T09:00:00.000Z", endDate: "2024-10-09T10:00:00.000Z" },
  { price: 15.456, startDate: "2024-10-09T10:00:00.000Z", endDate: "2024-10-09T11:00:00.000Z" },
  { price: 14.123, startDate: "2024-10-10T09:00:00.000Z", endDate: "2024-10-10T10:00:00.000Z" }
]

describe("PriceList Component", () => {
  beforeEach(() => {
    // Set up the mocked return value for usePriceContext
    ;(usePriceContext as jest.Mock).mockReset()
  })

  test("renders price list with price data", () => {
    ;(usePriceContext as jest.Mock).mockReturnValue({
      priceData: mockPriceData,
      loading: false,
      error: ""
    })
    render(
      <PriceProvider>
        <PriceList />
      </PriceProvider>
    )

    // Assert that the correct price data is displayed
    expect(screen.getByText(/12.45 c\/kWh/i)).toBeInTheDocument()
    expect(screen.getByText(/15.46 c\/kWh/i)).toBeInTheDocument()
    // Assert that the day headers are displayed correctly
    expect(screen.getByText(/Wednesday/i)).toBeInTheDocument() // For October 9
    expect(screen.getByText(/Thursday/i)).toBeInTheDocument() // For October 10
  })
})
