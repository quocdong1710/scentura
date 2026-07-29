import React from 'react';
import { useAuth } from '../context/AuthContext';

const Toast: React.FC = () => {
  const { toast } = useAuth();

  if (!toast.visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '30px',
        right: '30px',
        padding: '15px 25px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        color: 'white',
        backgroundColor: toast.type === 'error' ? '#ff4d4d' : '#2ecc71',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      {toast.message}
    </div>
  );
};

export default Toast;
