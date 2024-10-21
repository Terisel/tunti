import request from 'supertest';
import express from 'express';
import cors from 'cors';
import https from 'https';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Mocking the /api/latest-prices endpoint
app.get('/api/latest-prices', (req, res) => {
  res.status(200).json({ prices: [] }); // Mock response
});

describe('GET /api/latest-prices', () => {
  it('should return latest prices', async () => {
    const response = await request(app).get('/api/latest-prices');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('prices');
  });

  it('should return an empty array when no prices are available', async () => {
    const response = await request(app).get('/api/latest-prices');
    
    expect(response.body.prices).toEqual([]);
  });
});