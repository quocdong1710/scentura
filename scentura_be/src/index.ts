import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { register, login, getMe, googleLogin } from './controllers/authController.js';
import { authMiddleware } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // We can allow all or configure specifically since Nginx handles proxying anyway
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Auth routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/google-login', googleLogin);
app.get('/api/auth/me', authMiddleware as any, getMe as any);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Boot server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
