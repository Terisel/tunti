import express, { Request, Response } from "express";
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

interface Price {
  price: number;
  startDate: string;
  endDate: string;
}

const prices: Price[] = [
  {
    price: -0.205,
    startDate: "2024-10-21T21:00:00.000Z",
    endDate: "2024-10-21T22:00:00.000Z",
  },
  {
    price: -0.168,
    startDate: "2024-10-21T20:00:00.000Z",
    endDate: "2024-10-21T21:00:00.000Z",
  },
  {
    price: -0.081,
    startDate: "2024-10-21T19:00:00.000Z",
    endDate: "2024-10-21T20:00:00.000Z",
  },
  {
    price: -0.059,
    startDate: "2024-10-21T18:00:00.000Z",
    endDate: "2024-10-21T19:00:00.000Z",
  },
  {
    price: -0.009,
    startDate: "2024-10-21T17:00:00.000Z",
    endDate: "2024-10-21T18:00:00.000Z",
  },
  {
    price: -0.001,
    startDate: "2024-10-21T16:00:00.000Z",
    endDate: "2024-10-21T17:00:00.000Z",
  },
  {
    price: -0.001,
    startDate: "2024-10-21T15:00:00.000Z",
    endDate: "2024-10-21T16:00:00.000Z",
  },
  {
    price: -0.026,
    startDate: "2024-10-21T14:00:00.000Z",
    endDate: "2024-10-21T15:00:00.000Z",
  },
  {
    price: -0.052,
    startDate: "2024-10-21T13:00:00.000Z",
    endDate: "2024-10-21T14:00:00.000Z",
  },
  {
    price: -0.057,
    startDate: "2024-10-21T12:00:00.000Z",
    endDate: "2024-10-21T13:00:00.000Z",
  },
  {
    price: -0.058,
    startDate: "2024-10-21T11:00:00.000Z",
    endDate: "2024-10-21T12:00:00.000Z",
  },
  {
    price: -0.057,
    startDate: "2024-10-21T10:00:00.000Z",
    endDate: "2024-10-21T11:00:00.000Z",
  },
  {
    price: -0.021,
    startDate: "2024-10-21T09:00:00.000Z",
    endDate: "2024-10-21T10:00:00.000Z",
  },
  {
    price: -0.01,
    startDate: "2024-10-21T08:00:00.000Z",
    endDate: "2024-10-21T09:00:00.000Z",
  },
  {
    price: -0.001,
    startDate: "2024-10-21T07:00:00.000Z",
    endDate: "2024-10-21T08:00:00.000Z",
  },
  {
    price: -0.001,
    startDate: "2024-10-21T06:00:00.000Z",
    endDate: "2024-10-21T07:00:00.000Z",
  },
  {
    price: -0.008,
    startDate: "2024-10-21T05:00:00.000Z",
    endDate: "2024-10-21T06:00:00.000Z",
  },
  {
    price: -0.081,
    startDate: "2024-10-21T04:00:00.000Z",
    endDate: "2024-10-21T05:00:00.000Z",
  },
  {
    price: -0.2,
    startDate: "2024-10-21T03:00:00.000Z",
    endDate: "2024-10-21T04:00:00.000Z",
  },
  {
    price: -0.262,
    startDate: "2024-10-21T02:00:00.000Z",
    endDate: "2024-10-21T03:00:00.000Z",
  },
  {
    price: -0.3,
    startDate: "2024-10-21T01:00:00.000Z",
    endDate: "2024-10-21T02:00:00.000Z",
  },
  {
    price: -0.263,
    startDate: "2024-10-21T00:00:00.000Z",
    endDate: "2024-10-21T01:00:00.000Z",
  },
  {
    price: -0.247,
    startDate: "2024-10-20T23:00:00.000Z",
    endDate: "2024-10-21T00:00:00.000Z",
  },
  {
    price: -0.201,
    startDate: "2024-10-20T22:00:00.000Z",
    endDate: "2024-10-20T23:00:00.000Z",
  },
  {
    price: -0.08,
    startDate: "2024-10-20T21:00:00.000Z",
    endDate: "2024-10-20T22:00:00.000Z",
  },
  {
    price: -0.002,
    startDate: "2024-10-20T20:00:00.000Z",
    endDate: "2024-10-20T21:00:00.000Z",
  },
  {
    price: 23,
    startDate: "2024-10-20T19:00:00.000Z",
    endDate: "2024-10-20T20:00:00.000Z",
  },
  {
    price: 75.001,
    startDate: "2024-10-20T18:00:00.000Z",
    endDate: "2024-10-20T19:00:00.000Z",
  },
  {
    price: 85.326,
    startDate: "2024-10-20T17:00:00.000Z",
    endDate: "2024-10-20T18:00:00.000Z",
  },
  {
    price: 0.395,
    startDate: "2024-10-20T16:00:00.000Z",
    endDate: "2024-10-20T17:00:00.000Z",
  },
  {
    price: 1.389,
    startDate: "2024-10-20T15:00:00.000Z",
    endDate: "2024-10-20T16:00:00.000Z",
  },
  {
    price: 0.264,
    startDate: "2024-10-20T14:00:00.000Z",
    endDate: "2024-10-20T15:00:00.000Z",
  },
  {
    price: 0,
    startDate: "2024-10-20T13:00:00.000Z",
    endDate: "2024-10-20T14:00:00.000Z",
  },
  {
    price: -0.201,
    startDate: "2024-10-20T12:00:00.000Z",
    endDate: "2024-10-20T13:00:00.000Z",
  },
  {
    price: -0.098,
    startDate: "2024-10-20T11:00:00.000Z",
    endDate: "2024-10-20T12:00:00.000Z",
  },
  {
    price: 32,
    startDate: "2024-10-20T10:00:00.000Z",
    endDate: "2024-10-20T11:00:00.000Z",
  },
  {
    price: 0.01,
    startDate: "2024-10-20T09:00:00.000Z",
    endDate: "2024-10-20T10:00:00.000Z",
  },
  {
    price: 0.233,
    startDate: "2024-10-20T08:00:00.000Z",
    endDate: "2024-10-20T09:00:00.000Z",
  },
  {
    price: 0.254,
    startDate: "2024-10-20T07:00:00.000Z",
    endDate: "2024-10-20T08:00:00.000Z",
  },
  {
    price: 53.267,
    startDate: "2024-10-20T06:00:00.000Z",
    endDate: "2024-10-20T07:00:00.000Z",
  },
  {
    price: 0.251,
    startDate: "2024-10-20T05:00:00.000Z",
    endDate: "2024-10-20T06:00:00.000Z",
  },
  {
    price: 0.069,
    startDate: "2024-10-20T04:00:00.000Z",
    endDate: "2024-10-20T05:00:00.000Z",
  },
  {
    price: 0.193,
    startDate: "2024-10-20T03:00:00.000Z",
    endDate: "2024-10-20T04:00:00.000Z",
  },
  {
    price: 0.172,
    startDate: "2024-10-20T02:00:00.000Z",
    endDate: "2024-10-20T03:00:00.000Z",
  },
  {
    price: 0.068,
    startDate: "2024-10-20T01:00:00.000Z",
    endDate: "2024-10-20T02:00:00.000Z",
  },
  {
    price: 0.12,
    startDate: "2024-10-20T00:00:00.000Z",
    endDate: "2024-10-20T01:00:00.000Z",
  },
  {
    price: 0.248,
    startDate: "2024-10-19T23:00:00.000Z",
    endDate: "2024-10-20T00:00:00.000Z",
  },
  {
    price: 0.31,
    startDate: "2024-10-19T22:00:00.000Z",
    endDate: "2024-10-19T23:00:00.000Z",
  },
];

const calculateAveragePrice = (
  prices: Price[]
): { average?: number; message?: string } => {
  if (prices.length === 0) {
    return { message: "No prices available." };
  }

  const total = prices.reduce((acc, curr) => acc + curr.price, 0);
  const average = total / prices.length;

  return { average };
};

// New endpoint to get keskiarvohinnan (average price)
/**
 * @swagger
 * /api/keskiarvohinnan:
 *   get:
 *     summary: Retrieve the average price (keskiarvohinnan)
 *     responses:
 *       200:
 *         description: The average price calculated from hardcoded data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 keskiarvohinnan:
 *                   type: number
 *       404:
 *         description: No prices available.
 */

app.get(
  "/api/keskiarvohinnan",
  async (req: Request, res: Response): Promise<void> => {
    const result = calculateAveragePrice(prices);

    if (result.message) {
      res.status(404).json({ message: result.message });
    }

    res.status(200).json({ keskiarvohinnan: result.average });
  }
);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
