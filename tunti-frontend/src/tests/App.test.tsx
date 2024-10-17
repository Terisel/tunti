// tunti-frontend/src/tests/App.test.tsx
import { ReactNode } from 'react';
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "@/App.tsx"
import { PriceProvider, usePriceContext } from "@/contexts/price-context.tsx"

// Mocking the usePriceContext hook
jest.mock("@/contexts/price-context.tsx", () => ({
  PriceProvider: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  usePriceContext: jest.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    // Set up the mocked return value for usePriceContext
    ;(usePriceContext as jest.Mock).mockReset()
  })

  test("renders loading when loading is true", () => {
    ;(usePriceContext as jest.Mock).mockReturnValue({
      priceData: [],
      loading: true,
      error: ""
    })
    render(
      <PriceProvider>
        <App />
      </PriceProvider>
    )

    // Assert that the correct price data is displayed
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  test("renders error message when there is an error", () => {
    ;(usePriceContext as jest.Mock).mockReturnValue({
      priceData: [],
      loading: false,
      error: "Failed to fetch data"
    })

    render(
      <PriceProvider>
        <App />
      </PriceProvider>
    )

    expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument()
  })
})
