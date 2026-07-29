import React from 'react';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  return (
    <div style={{ paddingTop: '130px' }}>
      <div className="main_content">
        {/* HERO SECTION */}
        <div className="contact_hero">
          <h1>Liên Hệ Với Scentura</h1>
        </div>

        <div className="contact_container">
          {/* Info Column */}
          <div className="contact_info_col">
            <div className="contact_card">
              <h2>Thông tin liên hệ</h2>
              
              <div className="info_item">
                <div className="info_icon">📍</div>
                <div className="info_text">
                  <h3>Địa chỉ văn phòng</h3>
                  <p>2 Mai Thị Lựu, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>

              <div className="info_item">
                <div className="info_icon">📞</div>
                <div className="info_text">
                  <h3>Hotline hỗ trợ</h3>
                  <p>0905.145.789 (Hỗ trợ 24/7)</p>
                </div>
              </div>

              <div className="info_item">
                <div className="info_icon">✉</div>
                <div className="info_text">
                  <h3>Email liên hệ</h3>
                  <p>contact@scentura.com</p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div style={{ marginTop: '25px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(30, 63, 34, 0.1)', width: '100%', height: '260px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <iframe 
                  src="https://maps.google.com/maps?q=Trường%20Đại%20học%20Mở%20TP.%20Hồ%20Chí%20Minh%20-%20Cơ%20sở%204&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              </div>
            </div>

            <div className="contact_card">
              <h2>Thời gian làm việc</h2>
              <div className="info_item">
                <div className="info_icon">⏰</div>
                <div className="info_text">
                  <h3>Giờ hoạt động</h3>
                  <p>Thứ Hai - Chủ Nhật: 08:00 - 21:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact_form_col" style={{ padding: '25px 15px 15px 15px' }}>
            <h2 style={{ marginBottom: '20px', padding: '0 15px 10px', borderBottom: '1px solid rgba(30, 63, 34, 0.1)', fontFamily: 'Lora, serif', fontSize: '20px', color: '#1e3f22' }}>
              Gửi lời nhắn cho Scentura
            </h2>
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSd46feq-uA8PM50O1SgWJmYUA9uUYOEBBJVnEybDdJ_-D2yDw/viewform?embedded=true" 
              width="100%" 
              height="680" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0} 
              style={{ borderRadius: '8px', display: 'block', background: '#ffffff' }}
              title="Contact Google Form"
            >
              Đang tải…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
