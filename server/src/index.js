require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authService = require('./services/AuthService');
const hotelRepository = require('./repositories/HotelRepository');
const restaurantRepository = require('./repositories/RestaurantRepository');
const companyRepository = require('./repositories/CompanyRepository');
const dbManager = require('./core/DatabaseManager');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: '*' })); // Allow all origins for local dev
app.use(express.json());

// Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing access token' });

  try {
    const payload = authService.verifyAccessToken(token);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid access token' });
  }
}

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { userId, password } = req.body;
    const result = await authService.login(userId, password);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { userId, password, name } = req.body;
    if (!userId || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const result = await authService.register(userId, password, name);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(403).json({ error: error.message });
  }
});

// Resource Routes
app.get('/api/health', authenticateToken, async (req, res) => {
  try {
    await dbManager.queryTenant(req.userId, 'SELECT 1');
    res.json({ status: 'ok', user: req.userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to verify user database' });
  }
});

app.get('/api/hotels', authenticateToken, async (req, res) => {
  try {
    const hotels = await hotelRepository.findAll(req.userId);
    res.json({ user: req.userId, hotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load hotels' });
  }
});

app.get('/api/restaurants', authenticateToken, async (req, res) => {
  try {
    const restaurants = await restaurantRepository.findAll(req.userId);
    res.json({ user: req.userId, restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load restaurants' });
  }
});

app.get('/api/companies', authenticateToken, async (req, res) => {
  try {
    const companies = await companyRepository.findAll(req.userId);
    res.json({ user: req.userId, companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load companies' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
