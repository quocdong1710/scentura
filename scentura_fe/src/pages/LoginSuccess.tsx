import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const LoginSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      if (window.opener) {
        // If opened in a popup, send the token back to the parent window
        window.opener.postMessage({ type: 'google-login-success-token', token }, '*');
        window.close();
      } else {
        // Fallback: if not in a popup, save token and redirect directly
        localStorage.setItem('token', token);
        window.location.href = '/';
      }
    } else {
      // If no token, redirect to login with error parameter
      navigate('/login?error=no_token');
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', backgroundColor: '#fbf9f4' }}>
      <h2 style={{ fontFamily: 'Lora, Georgia, serif', color: '#1e3f22' }}>Đang xác thực tài khoản...</h2>
      <p style={{ color: '#666', marginTop: '10px' }}>Vui lòng đợi trong giây lát.</p>
    </div>
  );
};

export default LoginSuccess;
