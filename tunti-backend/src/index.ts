import express from "express";
import cors from 'cors';
import https from 'https';

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

app.get("/api/latest-prices", (req, res) => {
  const url = "https://api.porssisahko.net/v1/latest-prices.json";

  https.get(url, (response) => {
    let data = '';

    // A chunk of data has been received.
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    response.on('end', () => {
      try {
        const jsonData = JSON.parse(data); // Parse the JSON data
        res.status(200).json(jsonData); // Send the fetched data to the frontend
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
  }).on('error', (error) => {
    console.error("Error fetching latest prices:", error);
    res.status(500).send({ message: "Internal Server Error" });
  });
});

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
