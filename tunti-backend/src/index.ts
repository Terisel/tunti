import express from "express";
import cors from "cors";
import https from "https";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
  origin: ["https://terisel.github.io", "http://localhost:5173"],
  methods: "GET",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use CORS with the specified options

app.get("/api/latest-prices", (req, res) => {
  const url = "https://api.porssisahko.net/v1/latest-prices.json";

  https
    .get(url, (response) => {
      let data = "";

      // A chunk of data has been received.
      response.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      response.on("end", () => {
        try {
          const jsonData = JSON.parse(data); // Parse the JSON data
          res.status(200).json(jsonData); // Send the fetched data to the frontend
        } catch (error) {
          console.error("Error parsing JSON:", error);
          res.status(500).send({ message: "Internal Server Error" });
        }
      });
    })
    .on("error", (error) => {
      console.error("Error fetching latest prices:", error);
      res.status(500).send({ message: "Internal Server Error" });
    });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
