import { ReactNode } from 'react';
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { PriceList } from "@/components/domain/price-list"
import { PriceProvider, usePriceContext } from "@/contexts/price-context.tsx"

// Mocking the usePriceContext hook
jest.mock("@/contexts/price-context.tsx", () => ({
  PriceProvider: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  usePriceContext: jest.fn(),
}));

const mockPriceData = [
  { price: 5, startDate: "2024-10-09T09:00:00.000Z", endDate: "2024-10-09T10:00:00.000Z" },
  { price: 10, startDate: "2024-10-09T10:00:00.000Z", endDate: "2024-10-09T11:00:00.000Z" }
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
    expect(screen.getByText(/5 c\/kWh/i)).toBeInTheDocument()
    expect(screen.getByText(/10 c\/kWh/i)).toBeInTheDocument()
  })
})
