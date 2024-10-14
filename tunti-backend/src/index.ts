import express from "express";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Sample data for demonstration
const latestPrices = {
  prices: [
    { item: "Item 1", price: 100 },
    { item: "Item 2", price: 200 },
  ],
};

// New route to return latest prices
app.get("/new-api/v1/hinnat", async (req, res) => {
  try {
    // Return the latest prices data
    res.status(200).json(latestPrices);
  } catch (error) {
    console.error("Error fetching latest prices:", error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
