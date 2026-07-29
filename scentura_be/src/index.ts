import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import { register, login, getMe, googleLogin, googleCallback } from './controllers/authController.js';
import { authMiddleware } from './middleware/authMiddleware.js';

dotenv.config();

// Initialize passport configuration
import './config/passport.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // We can allow all or configure specifically since Nginx handles proxying anyway
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});
app.use(passport.initialize());

// Auth routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/google-login', googleLogin);
app.get('/api/auth/me', authMiddleware as any, getMe as any);

// Server-Side Google OAuth routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost'}/login?error=auth_failed` }),
  googleCallback
);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Boot server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
