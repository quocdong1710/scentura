import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import '../styles/Login.css';

const Login: React.FC = () => {
  const { login, showToastMessage } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);

  // Form states
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  
  const [regUser, setRegUser] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regConfirmPass, setRegConfirmPass] = useState('');

  // Password visibility toggles
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);

  // Google Login Message Listener
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      // Handle Mock/Simulation login
      if (event.data && event.data.type === 'google-login-success') {
        const { name, email, avatarUrl } = event.data;
        setLoading(true);

        try {
          const response = await fetch(API_BASE_URL + '/api/auth/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, avatarUrl }),
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'Đăng nhập Google thất bại.');

          login(data.token, data.user);
          setTimeout(() => navigate('/'), 1200);
        } catch (err: any) {
          showToastMessage(err.message, 'error');
        } finally {
          setLoading(false);
        }
      }

      // Handle Real Google redirect flow login
      if (event.data && event.data.type === 'google-login-success-token') {
        const { token } = event.data;
        setLoading(true);

        try {
          const response = await fetch(API_BASE_URL + '/api/auth/me', {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'Không thể lấy thông tin người dùng.');

          login(token, data.user);
          setTimeout(() => navigate('/'), 1200);
        } catch (err: any) {
          showToastMessage(err.message, 'error');
        } finally {
          setLoading(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [login, navigate, showToastMessage]);

  const handleGoogleLoginClick = () => {
    const width = 500;
    const height = 650;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      `${API_BASE_URL}/api/auth/google`,
      'GoogleLoginPopup',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUser || !loginPass) return;

    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail: loginUser, password: loginPass }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Đăng nhập thất bại.');

      login(data.token, data.user);
      setTimeout(() => navigate('/'), 1200);
    } catch (err: any) {
      showToastMessage(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (regPass !== regConfirmPass) {
      showToastMessage('Mật khẩu nhập lại không khớp.', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL + '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: regUser, email: regEmail, phone: regPhone, password: regPass }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Đăng ký thất bại.');

      showToastMessage('Đăng ký tài khoản thành công! Đang chuyển sang đăng nhập...');
      
      // Prefill login and switch
      setTimeout(() => {
        setLoginUser(regUser);
        setActiveTab('login');
        setRegUser('');
        setRegEmail('');
        setRegPhone('');
        setRegPass('');
        setRegConfirmPass('');
      }, 2000);
    } catch (err: any) {
      showToastMessage(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-body">
      <div className="bg-glow" />
      <div className="bg-glow-right" />

      {/* Back Home Link */}
      <Link to="/" className="back-home">
        <svg viewBox="0 0 24 24">
          <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
        </svg>
        Trở về trang chủ
      </Link>

      <div className="auth-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          SCENTURA<span>.</span>
        </Link>

        {/* Card Container */}
        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              ĐĂNG NHẬP
            </button>
            <button
              className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              ĐĂNG KÝ
            </button>
          </div>

          <div className="form-wrapper">
            <div className={`form-slider ${activeTab === 'register' ? 'show-register' : ''}`}>
              
              {/* LOGIN FORM */}
              <form onSubmit={handleLoginSubmit} className="auth-form" id="login-form">
                <div className="input-group">
                  <label htmlFor="login-username">Tên đăng nhập hoặc Email</label>
                  <input
                    type="text"
                    id="login-username"
                    className="input-field"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    placeholder="Nhập username hoặc email..."
                    required
                  />
                </div>

                <div className="input-group" style={{ position: 'relative' }}>
                  <label htmlFor="login-password">Mật khẩu</label>
                  <input
                    type={showLoginPass ? 'text' : 'password'}
                    id="login-password"
                    className="input-field"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                    required
                  />
                  <span className="password-toggle" onClick={() => setShowLoginPass(!showLoginPass)}>
                    {showLoginPass ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </span>
                </div>

                <div className="btn-container">
                  <button type="submit" className="btn-submit" disabled={loading}>
                    Đăng Nhập {loading && <span className="spinner" />}
                  </button>
                </div>

                <div className="divider">
                  <span>Hoặc</span>
                </div>

                <div className="social-login-container">
                  <button type="button" className="btn-google" onClick={handleGoogleLoginClick}>
                    <svg viewBox="0 0 24 24" className="google-icon">
                      <path fill="#EA4335" d="M12 5.04c1.67 0 3.17.58 4.35 1.71l3.25-3.25C17.65 1.58 15.01 1 12 1 7.37 1 3.4 3.63 1.44 7.45l3.86 3C6.22 7.55 8.89 5.04 12 5.04z" />
                      <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.67 2.85c2.14-1.97 3.74-4.87 3.74-8.55z" />
                      <path fill="#FBBC05" d="M5.3 14.55A7.16 7.16 0 0 1 4.9 12c0-.89.15-1.74.4-2.55L1.44 6.45C.52 8.12 0 10 0 12s.52 3.88 1.44 5.55l3.86-3z" />
                      <path fill="#34A853" d="M12 18.96c-3.11 0-5.78-2.51-6.7-5.41l-3.86 3C3.4 20.37 7.37 23 12 23c3.08 0 5.67-1.02 7.56-2.77l-3.67-2.85c-1.03.69-2.35 1.58-3.89 1.58z" />
                    </svg>
                    <span>Đăng nhập bằng Google</span>
                  </button>
                </div>

                <div className="form-footer">
                  Chưa có tài khoản? <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('register'); }}>Đăng ký ngay</a>
                </div>
              </form>

              {/* REGISTER FORM */}
              <form onSubmit={handleRegisterSubmit} className="auth-form" id="register-form">
                <div className="input-group">
                  <label htmlFor="reg-username">Tên tài khoản</label>
                  <input
                    type="text"
                    id="reg-username"
                    className="input-field"
                    value={regUser}
                    onChange={(e) => setRegUser(e.target.value)}
                    placeholder="Viết liền không dấu..."
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="reg-email">Địa chỉ Email</label>
                  <input
                    type="email"
                    id="reg-email"
                    className="input-field"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="Ví dụ: example@scentura.com"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="reg-phone">Số điện thoại</label>
                  <input
                    type="tel"
                    id="reg-phone"
                    className="input-field"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="Ví dụ: 0987654321"
                    required
                  />
                </div>

                <div className="input-group" style={{ position: 'relative' }}>
                  <label htmlFor="reg-password">Mật khẩu</label>
                  <input
                    type={showRegPass ? 'text' : 'password'}
                    id="reg-password"
                    className="input-field"
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    placeholder="Ít nhất 6 ký tự..."
                    required
                  />
                  <span className="password-toggle" onClick={() => setShowRegPass(!showRegPass)}>
                    {showRegPass ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </span>
                </div>

                <div className="input-group" style={{ position: 'relative' }}>
                  <label htmlFor="reg-confirm-password">Xác nhận mật khẩu</label>
                  <input
                    type={showRegConfirmPass ? 'text' : 'password'}
                    id="reg-confirm-password"
                    className="input-field"
                    value={regConfirmPass}
                    onChange={(e) => setRegConfirmPass(e.target.value)}
                    placeholder="Nhập lại mật khẩu..."
                    required
                  />
                  <span className="password-toggle" onClick={() => setShowRegConfirmPass(!showRegConfirmPass)}>
                    {showRegConfirmPass ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </span>
                </div>

                <div className="btn-container">
                  <button type="submit" className="btn-submit" disabled={loading}>
                    Đăng Ký {loading && <span className="spinner" />}
                  </button>
                </div>

                <div className="divider">
                  <span>Hoặc</span>
                </div>

                <div className="social-login-container">
                  <button type="button" className="btn-google" onClick={handleGoogleLoginClick}>
                    <svg viewBox="0 0 24 24" className="google-icon">
                      <path fill="#EA4335" d="M12 5.04c1.67 0 3.17.58 4.35 1.71l3.25-3.25C17.65 1.58 15.01 1 12 1 7.37 1 3.4 3.63 1.44 7.45l3.86 3C6.22 7.55 8.89 5.04 12 5.04z" />
                      <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.67 2.85c2.14-1.97 3.74-4.87 3.74-8.55z" />
                      <path fill="#FBBC05" d="M5.3 14.55A7.16 7.16 0 0 1 4.9 12c0-.89.15-1.74.4-2.55L1.44 6.45C.52 8.12 0 10 0 12s.52 3.88 1.44 5.55l3.86-3z" />
                      <path fill="#34A853" d="M12 18.96c-3.11 0-5.78-2.51-6.7-5.41l-3.86 3C3.4 20.37 7.37 23 12 23c3.08 0 5.67-1.02 7.56-2.77l-3.67-2.85c-1.03.69-2.35 1.58-3.89 1.58z" />
                    </svg>
                    <span>Đăng ký bằng Google</span>
                  </button>
                </div>

                <div className="form-footer">
                  Đã có tài khoản? <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('login'); }}>Đăng nhập</a>
                </div>
              </form>

            </div>
          </div>
        </div>

        <div className="copy">&copy; 2026 SCENTURA PERFUME. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Login;
