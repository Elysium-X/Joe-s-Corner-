import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const AVAILABLE_MEALS_PATH = path.join(DATA_DIR, 'available-meals.json');
const ORDERS_PATH = path.join(DATA_DIR, 'orders.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = Number(process.env.PORT) || 3000;

app.use(bodyParser.json());
app.use(express.static(PUBLIC_DIR));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res, next) => {
  try {
    const meals = await fs.readFile(AVAILABLE_MEALS_PATH, 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    next(error);
  }
});

app.post('/orders', async (req, res, next) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    !orderData.customer ||
    !orderData.customer.email ||
    !orderData.customer.email.includes('@') ||
    !orderData.customer.name ||
    orderData.customer.name.trim() === '' ||
    !orderData.customer.street ||
    orderData.customer.street.trim() === '' ||
    !orderData.customer['postal-code'] ||
    orderData.customer['postal-code'].trim() === '' ||
    !orderData.customer.city ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  try {
    const newOrder = {
      ...orderData,
      id: (Math.random() * 1000).toString(),
    };
    const orders = await fs.readFile(ORDERS_PATH, 'utf8');
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile(ORDERS_PATH, JSON.stringify(allOrders));
    res.status(201).json({ message: 'Order created!' });
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Only start a listener when running locally; Vercel serverless will invoke the handler instead.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });
}

export default app;
