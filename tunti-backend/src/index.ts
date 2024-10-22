import express, { Request, Response } from "express";
import cors from "cors";
import https from "https";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { calculateAveragePrice, getPriceDescription } from "./priceUtils";

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

// Function to fetch latest prices
const fetchLatestPrices = (): Promise<any> => {
  return new Promise((resolve, reject) => {
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
            resolve(jsonData);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            reject(new Error("Internal Server Error"));
          }
        });
      })
      .on("error", (error) => {
        console.error("Error fetching latest prices:", error);
        reject(new Error("Internal Server Error"));
      });
  });
};

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
app.get(
  "/api/latest-prices",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const jsonData = await fetchLatestPrices();
      res.status(200).json(jsonData);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  }
);

// New endpoint to get today's average price and description
/**
 * @swagger
 * /api/keskiarvohinta:
 *   get:
 *     summary: Retrieve the average price and variability description
 *     responses:
 *       200:
 *         description: The average price calculated from fetched data and a description of price variability.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 keskiarvohinta:
 *                   type: number
 *                 description:
 *                   type: string
 *       404:
 *         description: No prices available.
 */
app.get(
  "/api/keskiarvohinta",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const jsonData = await fetchLatestPrices(); // Fetch latest prices

      const todaysPrices = jsonData.prices; // Assuming you have today's prices in jsonData
      const result = calculateAveragePrice(todaysPrices); // Calculate average based on today's prices

      if (result.message) {
        res.status(404).json({ message: result.message });
        return;
      }

      const description = getPriceDescription(todaysPrices, result.average); // Get description based on average price and variability

      res.status(200).json({ keskiarvohinta: result.average, description }); // Return today's average price and description
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  }
);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
