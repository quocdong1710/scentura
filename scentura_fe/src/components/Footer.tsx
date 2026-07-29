import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/login-success') {
    return null;
  }

  return (
    <footer className="footer">
      <div className="watermark">SCENTURA</div>
      
      <div className="footer_container">
        <div className="footer_column footer_brand">
          <h2>SCENTURA</h2>
          <p>Stay Fresh, Stay Confident</p>
          <div className="footer_contact">
            <p><strong>📍 Location: </strong> <a href="https://maps.app.goo.gl/AhSawKuV1vk2oPX48" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px dashed rgba(255,255,255,0.4)' }}>2 Mai Thị Lựu, Phường Sài Gòn, Hồ Chí Minh, Việt Nam</a></p>
            <p><strong>📞 Hotline:</strong>  0905 145 789</p>
            <p><strong>✉ Email:</strong> support@scentura.com</p>
          </div>
        </div>

        <div className="footer_column">
          <h3>Về Chúng Tôi</h3>
          <Link to="/intro">Giới thiệu</Link>
          <Link to="/products">Sản phẩm</Link>
          <a href="#">Bài viết</a>
          <a href="#">Liên hệ</a>
        </div>

        <div className="footer_column">
          <h3>Chính Sách</h3>
          <Link to="/policy">Chính sách bảo mật</Link>
          <Link to="/policy">Điều khoản dịch vụ</Link>
          <Link to="/policy">Chính sách đổi trả</Link>
          <Link to="/policy">Chính sách giao hàng</Link>
        </div>

        <div className="footer_column">
          <h3>Phương Thức Thanh Toán</h3>
          <p>Hỗ trợ đa dạng phương thức thanh toán an toàn, bảo mật cao.</p>
          <div className="payment">
            <img src="/images/payment_visa.webp" alt="Visa" />
            <img src="/images/payment_mastercard.png" alt="MasterCard" />
            <img src="/images/payment_momo.png" alt="MoMo" />
            <img src="/images/payment_vnpay.webp" alt="VNPay" />
            <img src="/images/payment_zalopay.webp" alt="Zalopay" />
            
          </div>
        </div>
      </div>

      <div className="footer_bottom">
        <p>&copy; 2026 SCENTURA. Tất cả các quyền được bảo lưu. Thiết kế và phát triển bởi Scentura Team.</p>
      </div>
    </footer>
  );
};

export default Footer;
