const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = 4000;

// Configure CORS
const allowedOrigins = ['https://terisel.github.io']; // Replace with your frontend domain

app.use(cors());

// Sample data for demonstration
const latestPrices = {
  prices: [
    { item: "Item 1", price: 100 },
    { item: "Item 2", price: 200 },
  ],
};

// API endpoint to get latest prices
app.get("/new-api/v1/hinnat", (req, res) => {
  res.json(latestPrices);
});

app.listen(PORT, () => {
  console.log(`Node express server is running on ${PORT}. Enjoy NodeJS`);
});
