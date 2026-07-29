import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbRun, dbGet } from '../db.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';

const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_JWT_SECRET_KEY_PLACEHOLDER';

interface UserRow {
  id: number;
  username: string;
  email: string;
  phone: string;
  password_hash: string;
  avatar_url?: string;
  created_at: string;
}

export const register = async (req: Request, res: Response) => {
  const { username, email, phone, password } = req.body;

  // Basic Validation
  if (!username || !email || !phone || !password) {
    return res.status(400).json({ message: 'Tất cả các trường đều là bắt buộc.' });
  }

  // Validate Username format
  if (username.length < 3) {
    return res.status(400).json({ message: 'Tên đăng nhập phải có ít nhất 3 ký tự.' });
  }

  // Validate Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Định dạng email không hợp lệ.' });
  }

  // Validate Phone format (simple check)
  const phoneRegex = /^[0-9+]{9,15}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Số điện thoại không hợp lệ (chỉ nhập số từ 9 đến 15 ký tự).' });
  }

  // Validate Password length
  if (password.length < 6) {
    return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
  }

  try {
    // Check if username or email already exists
    const existingUserByUsername = await dbGet<UserRow>(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại.' });
    }

    const existingUserByEmail = await dbGet<UserRow>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Địa chỉ email đã được sử dụng.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user into SQLite database
    const result = await dbRun(
      'INSERT INTO users (username, email, phone, password_hash) VALUES (?, ?, ?, ?)',
      [username, email, phone, passwordHash]
    );

    return res.status(201).json({
      message: 'Đăng ký tài khoản thành công!',
      userId: result.id
    });
  } catch (error: any) {
    console.error('Lỗi khi đăng ký:', error.message);
    return res.status(500).json({ message: 'Có lỗi xảy ra trên máy chủ.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ message: 'Tên đăng nhập/email và mật khẩu là bắt buộc.' });
  }

  try {
    // Find user by username OR email
    const user = await dbGet<UserRow>(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [usernameOrEmail, usernameOrEmail]
    );

    if (!user) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatar_url
      }
    });
  } catch (error: any) {
    console.error('Lỗi khi đăng nhập:', error.message);
    return res.status(500).json({ message: 'Có lỗi xảy ra trên máy chủ.' });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Chưa xác thực thông tin đăng nhập.' });
  }

  try {
    const user = await dbGet<UserRow>(
      'SELECT id, username, email, phone, avatar_url, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng này.' });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatar_url,
        created_at: user.created_at
      }
    });
  } catch (error: any) {
    console.error('Lỗi khi lấy thông tin user:', error.message);
    return res.status(500).json({ message: 'Có lỗi xảy ra trên máy chủ.' });
  }
};

export const findOrCreateGoogleUser = async (name: string, email: string, avatarUrl?: string) => {
  // Check if user already exists by email
  let user = await dbGet<UserRow>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (!user) {
    // Create a unique username from Google display name
    const generateUsername = (rawName: string): string => {
      let clean = rawName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      clean = clean.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');
      clean = clean.replace(/^_+|_+$/g, '');
      return clean || 'google_user';
    };

    let username = generateUsername(name);
    let existingUserByUsername = await dbGet<UserRow>(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    let counter = 1;
    const baseUsername = username;
    while (existingUserByUsername) {
      username = `${baseUsername}_${counter}`;
      existingUserByUsername = await dbGet<UserRow>(
        'SELECT id FROM users WHERE username = ?',
        [username]
      );
      counter++;
    }

    // Create a random password for security & hash it (since password_hash is NOT NULL)
    const randomPassword = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(randomPassword, salt);

    // Insert new user
    const result = await dbRun(
      'INSERT INTO users (username, email, phone, password_hash, avatar_url) VALUES (?, ?, ?, ?, ?)',
      [username, email, 'Google Account', passwordHash, avatarUrl || null]
    );

    // Retrieve newly created user
    user = await dbGet<UserRow>(
      'SELECT * FROM users WHERE id = ?',
      [result.id]
    );
  } else if (avatarUrl && user.avatar_url !== avatarUrl) {
    // Update avatar if it changed/was added
    await dbRun('UPDATE users SET avatar_url = ? WHERE id = ?', [avatarUrl, user.id]);
    user.avatar_url = avatarUrl;
  }

  return user;
};

export const googleLogin = async (req: Request, res: Response) => {
  const { name, email, avatarUrl } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Email và Tên là bắt buộc khi đăng nhập bằng Google.' });
  }

  try {
    const user = await findOrCreateGoogleUser(name, email, avatarUrl);

    if (!user) {
      return res.status(500).json({ message: 'Không thể tạo hoặc truy xuất thông tin tài khoản.' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Đăng nhập Google thành công!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatar_url
      }
    });

  } catch (error: any) {
    console.error('Lỗi khi đăng nhập bằng Google:', error.message);
    return res.status(500).json({ message: 'Có lỗi xảy ra trên máy chủ.' });
  }
};

export const googleCallback = async (req: Request, res: Response) => {
  const user = req.user as UserRow;

  if (!user) {
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost'}/login?error=auth_failed`);
  }

  try {
    // Sign JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Redirect user back to Frontend with the token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
    return res.redirect(`${frontendUrl}/login-success?token=${token}`);
  } catch (error: any) {
    console.error('Lỗi trong callback Google OAuth:', error.message);
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost'}/login?error=server_error`);
  }
};

