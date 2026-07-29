import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteSlider from '../components/InfiniteSlider';
import '../styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Slider 1: Top Rolls (3 slides)
  const topSlides = [
    'images/2_roll1.png',
    'images/2_roll2.png',
    'images/2_roll3.png'
  ];

  // Slider 2: Mid Rolls (4 slides)
  const midSlides = [
    'images/index_3roll1.png',
    'images/index_3roll2.png',
    'images/index_3roll3.png',
    'images/index_3roll4.png'
  ];

  // Slider 3: Featured (5 slides)
  const featuredProducts = [
    {
      name: 'Sensitive Unscented',
      code: 'SC-SE-001',
      truePrice: '89.000đ',
      price: '79.000đ',
      desc: 'Tập trung vào thấm hút và tín hiệu cảnh báo riêng tư, không có hương thơm.',
      image: 'images/sensitive_unscented.png',
      link: '/products#sensitiveSection'
    },
    {
      name: 'Social Amber Cotton',
      code: 'SC-SO-005',
      truePrice: '89.000đ',
      price: '79.000đ',
      desc: 'Tạo cảm giác gần gũi nhưng không nồng, phù hợp khi tiếp xúc gần.',
      image: 'images/social_amber_cotton.png',
      link: '/products#socialSection'
    },
    {
      name: 'Commute Aqua Fresh',
      code: 'SC-CO-002',
      truePrice: '89.000đ',
      price: '79.000đ',
      desc: 'Mùi sạch, unisex, phù hợp với người thường xuyên đi học hoặc đi làm xa.',
      image: 'images/commute_aqua_fresh.png',
      link: '/products#commuteSection'
    },
    {
      name: 'Campus Fresh Tea',
      code: 'SC-CP-002',
      truePrice: '89.000đ',
      price: '79.000đ',
      desc: 'Tạo cảm giác sạch và tươi mới cho ngày học dài hoặc học nhóm.',
      image: 'images/campus_fresh_tea.png',
      link: '/products#campusSection'
    },
    {
      name: 'Workday White Tea',
      code: 'SC-WD-002',
      truePrice: '89.000đ',
      price: '79.000đ',
      desc: 'Mùi thanh nhẹ, phù hợp môi trường phòng kín và không gian công sở.',
      image: 'images/work_day_white_tea.png',
      link: '/products#workdaySection'
    }
  ];

  // Parallax Scroll Effect
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const rollsSection = document.getElementById('topRollsSection');
      if (!rollsSection) return;

      const rollsBottom = rollsSection.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      // Calculate progress
      let progress = (windowHeight - rollsBottom) / (windowHeight - 130);
      progress = Math.max(0, Math.min(progress, 1));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ paddingTop: '0px' }}> {/* Overlay for fixed headers */}
      
      {/* HERO SECTION */}
      <div className="hero" />

      {/* TOP ROLLS SLIDER */}
      <section className="rolls_section" id="topRollsSection">
        <InfiniteSlider autoPlay autoPlaySpeed={4000} showDots>
          {topSlides.map((src, i) => (
            <img key={i} src={src} alt={`Roll ${i + 1}`} />
          ))}
        </InfiniteSlider>
      </section>

      {/* PARALLAX PRODUCTS DESCRIPTION */}
      <section className="parallax_section">
        <div className="container">
          <div className="parallax_images">
            <img 
              className="blue" 
              src="images/blue.png" 
              alt="Blue" 
              style={{
                transform: `translate(${90 * scrollProgress}px, ${250 * scrollProgress}px) rotate(${-8 + 8 * scrollProgress}deg)`
              }} 
            />
            <img 
              className="purple" 
              src="images/purple.png" 
              alt="Purple" 
              style={{
                transform: `translate(${-90 * scrollProgress}px, ${220 * scrollProgress}px) rotate(${8 - 8 * scrollProgress}deg)`
              }} 
            />
            <img 
              className="cushion" 
              src="images/cushion.png" 
              alt="Cushion" 
              style={{
                transform: `translateY(${-20 * scrollProgress}px)`
              }} 
            />
          </div>

          <h3 className="parallax_title">
            Chăm sóc sự tự tin<br /> Từ những điều thật nhỏ
          </h3>
          
          <p className="parallax_content">
            Sau một ngày dài di chuyển, học tập hoặc làm việc, cơ thể có thể bắt đầu đổ mồ hôi và không còn giữ được cảm giác thơm tho như ban đầu. Điều khiến chúng ta bất an đôi khi không nằm ở mồ hôi, mà ở việc không biết mình có còn giữ được sự chỉn chu hay không.<br /><br />
            Scentura được tạo ra từ sự thấu hiểu ấy. Miếng dán được đặt vào mặt trong trang phục tại vùng dễ đổ mồ hôi, giúp tiếp nhận độ ẩm, phát tín hiệu màu riêng tư và tạo hương nhẹ trong quá trình sử dụng. Một lời nhắc nhỏ để bạn chủ động chăm sóc bản thân trước khi sự lo lắng xuất hiện.
          </p>
        </div>
      </section>

      {/* MID ROLLS SLIDER */}
      <section className="rolls_section" id="midRollsSection">
        <InfiniteSlider autoPlay autoPlaySpeed={5000} showDots>
          {midSlides.map((src, i) => (
            <img key={i} src={src} alt={`Mid Roll ${i + 1}`} />
          ))}
        </InfiniteSlider>
      </section>

      {/* THREE FUNCTIONAL CORE FEATURES */}
      <section className="hdsd_section" style={{ background: '#fff', padding: '0 0 100px' }}>
        <div style={{ textAlign: 'center', padding: '0', background: '#1e3f22', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '38px', color: '#ffffff', fontFamily: 'Lora, Georgia, serif', fontWeight: 500, padding: '20px', margin: 0 }}>
            Ba công năng, trong một thiết kế mỏng nhẹ
          </h2>
        </div>

        <div className="hdsd_container" style={{ display: 'flex', gap: '30px', padding: '0 20px' }}>
          <div className="hdsd_item">
            <div className="hdsd_info" style={{ textAlign: 'center' }}>
              <img src="images/water.png" alt="Thấm hút" style={{ width: '90px', marginBottom: '15px' }} />
              <h4 style={{ fontSize: '18px', fontWeight: 500, color: '#1e3f22', marginBottom: '10px' }}>Thấm hút</h4>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', textAlign: 'justify' }}>
                Được đặt kín đáo bên trong áo, lớp thấm hút giúp tiếp nhận mồ hôi và độ ẩm tại khu vực dưới cánh tay, hạn chế cảm giác ẩm bí và giữ trang phục chỉn chu hơn.
              </p>
            </div>
          </div>

          <div className="hdsd_item">
            <div className="hdsd_info" style={{ textAlign: 'center' }}>
              <img src="images/ring.png" alt="Cảnh báo đổi màu" style={{ width: '90px', marginBottom: '15px' }} />
              <h4 style={{ fontSize: '18px', fontWeight: 500, color: '#1e3f22', marginBottom: '10px' }}>Cảnh báo đổi màu</h4>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', textAlign: 'justify' }}>
                Khi độ ẩm trên miếng dán tích tụ đến một mức nhất định, lớp chỉ thị có thể chuyển màu như một tín hiệu nhẹ nhàng, nhắc bạn chủ động kiểm tra.
              </p>
            </div>
          </div>

          <div className="hdsd_item">
            <div className="hdsd_info" style={{ textAlign: 'center' }}>
              <img src="images/wind.png" alt="Tỏa hương nhẹ" style={{ width: '90px', marginBottom: '15px' }} />
              <h4 style={{ fontSize: '18px', fontWeight: 500, color: '#1e3f22', marginBottom: '10px' }}>Tỏa hương thơm nhẹ</h4>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', textAlign: 'justify' }}>
                Các vi nang hương được kích hoạt bởi chuyển động, lan tỏa hương thơm vừa đủ và duy trì cảm giác sạch sẽ, dễ chịu trong suốt thời gian sử dụng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND PHILOSOPHY */}
      <section className="hdsd_section" style={{ background: '#fbf9f4', padding: '0 0 80px' }}>
        <div style={{ textAlign: 'center', padding: '0', background: '#1e3f22' }}>
          <h2 style={{ fontSize: '38px', color: '#ffffff', fontFamily: 'Lora, Georgia, serif', fontWeight: 500, padding: '20px', margin: 0 }}>
            Triết Lý Thương Hiệu
          </h2>
        </div>
        <div id="featuredRollsSection" style={{ padding: '40px 20px', display: 'flex', gap: '50px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="featured_left_col" style={{ flex: '1' }}>
            <div style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'justify' }}>
              <p>Chúng tôi tin rằng chăm sóc cá nhân không nên bắt đầu từ sự e ngại về cơ thể.</p>
              <p>Một giải pháp phù hợp không cần khiến bạn cảm thấy mình đang che giấu một khuyết điểm. Nó chỉ cần hiện diện đúng lúc, hoạt động đủ kín đáo và giúp bạn tiếp tục ngày dài với cảm giác an tâm hơn.</p>
              <p>Scentura được phát triển như một phụ kiện chăm sóc cá nhân hiện đại, nhẹ nhàng trong cách sử dụng, tinh tế trong cách hiện diện và thiết thực trong từng khoảnh khắc.</p>
            </div>
            <button 
              onClick={() => navigate('/intro')} 
              style={{
                marginTop: '25px',
                padding: '12px 24px',
                background: '#1e3f22',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#152c18'}
              onMouseOut={(e) => e.currentTarget.style.background = '#1e3f22'}
            >
              Khám phá câu chuyện của SCENTURA
            </button>
          </div>
          <div style={{ flex: '1.2', display: 'flex', justifyContent: 'center' }}>
            <img src="images/bottom_feature.png" alt="Philosophy" style={{ width: '100%', maxWidth: '550px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SLIDER */}
      <section className="rolls_section" id="featuredRollsSection">
        <div className="featured_left_col" style={{ flex: '0.8' }}>
          <h2>Sản phẩm<br /> Nổi bật từ Scentura</h2>
          <p style={{ marginTop: '15px', color: '#666', lineHeight: '1.6' }}>
            Khám phá những lựa chọn được yêu thích nhất nhờ thiết kế mỏng nhẹ, cách sử dụng kín đáo và mùi hương thanh lịch.
          </p>
        </div>

        <div className="rolls_container" style={{ flex: '1.2', maxWidth: '680px' }}>
          <InfiniteSlider slidesToShow={2} showDots>
            {featuredProducts.map((prod, i) => (
              <div key={i} style={{ padding: '0 10px', width: '100%' }}>
                <div className="product_card_box">
                  <img src={prod.image} alt={prod.name} style={{ width: '100%', objectFit: 'cover' }} />
                  <div className="product_hover_info">
                    <h4 className="product_hover_name">{prod.name}</h4>
                    <div style={{ fontSize: '11px', color: '#e2c076', marginBottom: '8px', letterSpacing: '1px' }}>{prod.code}</div>
                    <div className="product_hover_price">{prod.price}</div>
                    <p className="product_hover_desc">{prod.desc}</p>
                    <button onClick={() => navigate(prod.link)} className="product_hover_btn">Xem Chi Tiết</button>
                  </div>
                </div>
                <div className="product_visible_info">
                  <h5>{prod.name}</h5>
                  <h5 style={{ color: '#gray', fontWeight: 'bold', textDecoration: 'line-through' }}>{prod.truePrice}</h5>
                  <div className="visible_price" style={{ color: '#e2c076', fontWeight: 'bold' }}>
                    {prod.price}
                  </div>
                </div>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </section>

      {/* THE STORY (Fits full viewport height) */}
      <section style={{ backgroundColor: '#000', width: '100%', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', padding: '0', background: '#1e3f22' }}>
          <h2 style={{ fontSize: '38px', color: '#ffffff', fontFamily: 'Lora, Georgia, serif', fontWeight: 500, padding: '20px', margin: 0 }}>
            Hành trình bên trong mỗi miếng dán
          </h2>
        </div>
        <div className="bottom_feature_container" style={{ width: '100%', margin: 0, padding: 0 }}>
          <img 
            className="story_img" 
            src="images/story_img.jpg" 
            alt="The Story" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </div>
      </section>

    </div>
  );
};

export default Home;
