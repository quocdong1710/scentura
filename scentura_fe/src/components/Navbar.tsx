import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, cart, logout, setCartOpen } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất tài khoản Scentura?");
    if (confirmLogout) {
      logout();
      navigate('/');
    }
  };

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Hide header sale and navbar on login / login-success page
  if (location.pathname === '/login' || location.pathname === '/login-success') {
    return null;
  }

  return (
    <>
      {/* HEADER SALE */}
      <div className="header_sale">
        <h3>ƯU ĐÃI RA MẮT - GIẢM [X%] CHO ĐƠN HÀNG SCENTURA ĐẦU TIÊN</h3>
        <button onClick={() => navigate('/products')}>NHẬN ƯU ĐÃI</button>
      </div>

      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar_container">
          <Link to="/" className="brand">SCENTURA</Link>

          <div className="nav_menu">
            <Link to="/">Trang chủ</Link>
            <Link to="/intro">Giới thiệu</Link>
            <Link to="/products">Sản phẩm</Link>
            <Link to="/policy">Chính sách</Link>
            <Link to="/contact">Liên hệ</Link>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', height: '100%' }}>
                {/* Cart Icon Button */}
                <div
                  id="header-cart-btn"
                  onClick={() => setCartOpen(true)}
                  style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  title="Xem giỏ hàng"
                >
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      width: '26px',
                      height: '26px',
                      fill: 'none',
                      stroke: '#c5a880',
                      strokeWidth: 2,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      transition: 'stroke 0.3s',
                    }}
                    className="cart-svg-icon"
                    onMouseOver={(e) => (e.currentTarget.style.stroke = '#1e3f22')}
                    onMouseOut={(e) => (e.currentTarget.style.stroke = '#c5a880')}
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  {/* Cart Badge Count */}
                  {totalQty > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        backgroundColor: '#ff4d4d',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1.5px solid #fff',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                      }}
                    >
                      {totalQty}
                    </span>
                  )}
                </div>

                {/* User Avatar */}
                <div
                  onClick={handleLogoutClick}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title={`${user.username} - Nhấp để đăng xuất`}
                >
                  <img
                    src={user.avatarUrl || 'images/user.png'}
                    alt={user.username}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #c5a880',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.08)';
                      e.currentTarget.style.borderColor = '#1e3f22';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = '#c5a880';
                    }}
                  />
                </div>
              </div>
            ) : (
              <Link to="/login" id="auth-nav-link">Đăng Nhập</Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
