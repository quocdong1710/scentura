import React from 'react';
import { useAuth } from '../context/AuthContext';

const CartDrawer: React.FC = () => {
  const {
    user,
    cart,
    isCartOpen,
    setCartOpen,
    changeQty,
    deleteItem,
    clearCart,
    showToastMessage,
  } = useAuth();

  if (!user) return null;

  const handleClose = () => setCartOpen(false);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    showToastMessage('Đặt hàng thành công! Cảm ơn bạn đã lựa chọn Scentura.');
    clearCart();
    setCartOpen(false);
  };

  // Compute total price
  const totalVal = cart.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
    return sum + priceNum * item.quantity;
  }, 0);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        id="cart-overlay"
        onClick={handleClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 9998,
          display: isCartOpen ? 'block' : 'none',
          opacity: isCartOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <div
        id="cart-drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: isCartOpen ? 0 : '-400px',
          width: '100%',
          maxWidth: '400px',
          height: '100vh',
          backgroundColor: '#141414',
          borderLeft: '1px solid rgba(197, 168, 128, 0.2)',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
          zIndex: 9999,
          transition: 'right 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          display: 'flex',
          flexDirection: 'column',
          color: '#f5f5f5',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontFamily: 'Lora, serif', color: '#c5a880', fontSize: '20px', fontWeight: 600, letterSpacing: '1px' }}>GIỎ HÀNG CỦA BẠN</h3>
          <span
            onClick={handleClose}
            style={{ cursor: 'pointer', fontSize: '28px', color: '#a0a0a0', transition: 'color 0.3s', lineHeight: 1 }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#a0a0a0')}
          >
            &times;
          </span>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#a0a0a0', gap: '15px' }}>
              <svg viewBox="0 0 24 24" style={{ width: '60px', height: '60px', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }}>
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p style={{ fontSize: '14px', textAlign: 'center' }}>Giỏ hàng của bạn đang trống.</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  paddingBottom: '15px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <img
                  src={item.image || 'images/prd_trial1.jpg'}
                  alt={item.name}
                  style={{
                    width: '65px',
                    height: '65px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#f5f5f5' }}>{item.name}</h5>
                  <span style={{ fontSize: '13px', color: '#c5a880', fontWeight: 'bold' }}>{item.price}</span>

                  {/* Quantity controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                    <button
                      onClick={() => changeQty(index, -1)}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        width: '22px',
                        height: '22px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', minWidth: '15px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => changeQty(index, 1)}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        width: '22px',
                        height: '22px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Delete button */}
                <button
                  onClick={() => deleteItem(index)}
                  style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '5px' }}
                  title="Xóa khỏi giỏ hàng"
                >
                  <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: '#0d0d0d',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 600 }}>
            <span>Tổng cộng:</span>
            <span style={{ color: '#c5a880', fontWeight: 700 }}>
              {totalVal.toLocaleString('vi-VN')}đ
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
              border: 'none',
              color: '#000',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              transition: 'all 0.3s ease',
              opacity: cart.length === 0 ? 0.5 : 1,
            }}
            onMouseOver={(e) => {
              if (cart.length > 0) e.currentTarget.style.filter = 'brightness(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = 'none';
            }}
          >
            Thanh Toán Ngay
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
