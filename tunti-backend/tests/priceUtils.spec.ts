import { getPriceDescription, Price } from "../src/priceUtils"; // Adjust the import path accordingly

describe("getPriceDescription", () => {
  it("should return no information when average is undefined", () => {
    const prices: Price[] = [];
    expect(getPriceDescription(prices)).toBe("noInfo");
  });

  it("should indicate high price when average is above threshold", () => {
    const prices: Price[] = [
      { price: 20, startDate: "2024-10-18", endDate: "2024-10-18" },
      { price: 25, startDate: "2024-10-18", endDate: "2024-10-18" },
    ];
    expect(getPriceDescription(prices, 22)).toBe("highPrice");
  });

  it("should indicate low price when average is below threshold", () => {
    const prices: Price[] = [
      { price: 5, startDate: "2024-04-22", endDate: "2024-04-22" },
      { price: 10, startDate: "2024-04-22", endDate: "2024-04-22" },
    ];
    expect(getPriceDescription(prices, 7.5)).toBe("lowPrice");
  });

  it("should indicate significant fluctuation in prices", () => {
    const prices: Price[] = [
      { price: 5, startDate: "2024-10-22", endDate: "2024-10-22" },
      { price: 30, startDate: "2024-10-22", endDate: "2024-10-22" },
    ];
    expect(getPriceDescription(prices, 17.5)).toBe("fluctuating");
  });

  it("should indicate no significant fluctuation in prices", () => {
    const prices: Price[] = [
      { price: 12, startDate: "2024-10-22", endDate: "2024-10-22" },
      { price: 14, startDate: "2024-10-22", endDate: "2024-10-22" },
    ];
    expect(getPriceDescription(prices, 13)).toBe("lowPrice"); // Average is below threshold
  });
});
