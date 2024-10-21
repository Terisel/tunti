import express from "express";
import cors from "cors";
import https from "https";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CORS options
const corsOptions = {
  origin: ["https://terisel.github.io", "http://localhost:5173"],
  methods: "GET",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use CORS with the specified options

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Latest Prices API",
      version: "1.0.0",
      description: "API for fetching the latest prices.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/*.ts"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API endpoint for latest prices
/**
 * @swagger
 * /api/latest-prices:
 *   get:
 *     summary: Retrieve latest prices
 *     responses:
 *       200:
 *         description: A JSON object containing the latest prices
 *       500:
 *         description: Internal Server Error
 */
app.get("/api/latest-prices", (req, res) => {
  const url = "https://api.porssisahko.net/v1/latest-prices.json";

  https
    .get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          res.status(200).json(jsonData);
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
