import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const api = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const AVAILABLE_MEALS_PATH = path.join(DATA_DIR, 'available-meals.json');
const ORDERS_PATH = path.join(DATA_DIR, 'orders.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

async function readOrdersSafe() {
  try {
    const orders = await fs.readFile(ORDERS_PATH, 'utf8');
    const parsed = JSON.parse(orders);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return [];
    }
    console.error('Failed to read orders.json:', error);
    return [];
  }
}

async function writeOrdersSafe(allOrders) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(ORDERS_PATH, JSON.stringify(allOrders));
}

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
api.use('/images', express.static(IMAGES_DIR));

api.get('/', (req, res) => {
  res.json({ message: 'API is running 🚀' });
});

api.get('/meals', async (req, res, next) => {
  try {
    const meals = await fs.readFile(AVAILABLE_MEALS_PATH, 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    next(error);
  }
});

api.post('/orders', async (req, res, next) => {
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
    const allOrders = await readOrdersSafe();
    allOrders.push(newOrder);
    await writeOrdersSafe(allOrders);
    res.status(201).json({ message: 'Order created!' });
  } catch (error) {
    next(error);
  }
});

app.use('/api', api);
// Allow root access in Vercel so hitting "/" doesn't return 404.
app.use('/', api);

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
