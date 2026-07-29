import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InfiniteSlider from '../components/InfiniteSlider';
import '../styles/Products.css';
import '../styles/Home.css'; // Shared product card styles

const productsData = [
  // Trial Box
  { id: '1', name: 'Campus Soft Citrus', code: 'SC-TR-001', scent: 'Cam chanh', price: '49.000đ', originalPrice: '59.000đ', desc: 'Mùi năng động, phù hợp với sinh viên thường xuyên hoạt động ngoài lớp học.', image: 'images/prd_trial1.jpg', category: 'trial' },
  { id: '2', name: 'Commute Citrus Rush', code: 'SC-TR-002', scent: 'Cam chanh', price: '49.000đ', originalPrice: '59.000đ', desc: 'Hương cam chanh tươi mát, phù hợp với người thường xuyên di chuyển ngoài trời.', image: 'images/prd_trial2.jpg', category: 'trial' },
  { id: '3', name: 'Social White Tea Elegance', code: 'SC-TR-003', scent: 'Trà trắng', price: '49.000đ', originalPrice: '59.000đ', desc: 'Mùi trà trắng thanh lịch, phù hợp cho các buổi gặp gỡ, hẹn hò.', image: 'images/prd_trial3.jpg', category: 'trial' },
  { id: '4', name: 'Sensitive White Tea Light', code: 'SC-TR-004', scent: 'Trà trắng nhẹ', price: '49.000đ', originalPrice: '59.000đ', desc: 'Hương trà trắng nhẹ nhàng, phù hợp với người thích mùi hương tinh tế.', image: 'images/prd_trial4.jpg', category: 'trial' },
  { id: '5', name: 'Workday Soft Musk', code: 'SC-TR-005', scent: 'Xạ hương', price: '49.000đ', originalPrice: '59.000đ', desc: 'Mùi xạ hương mềm mại, phù hợp với môi trường công sở, họp hành.', image: 'images/prd_trial5.jpg', category: 'trial' },
  
  // Workday
  { id: '6', name: 'Workday Clean Cotton', code: 'SC-WD-001', scent: 'Cotton sạch', price: '79.000đ', originalPrice: '89.000đ', desc: 'Phù hợp sử dụng ngày tại văn phòng, tạo cảm giác sạch và dễ chịu.', image: 'images/work_day_clean_cotton.png', category: 'workday' },
  { id: '7', name: 'Workday Office Jasmine', code: 'SC-WD-002', scent: 'Hoa nhài', price: '79.000đ', originalPrice: '89.000đ', desc: 'Hương nhài văn phòng tinh tế, mang lại phong thái làm việc chỉn chu.', image: 'images/work_day_office_jasmine.png', category: 'workday' },
  { id: '8', name: 'Workday White Tea', code: 'SC-WD-003', scent: 'Trà trắng', price: '79.000đ', originalPrice: '89.000đ', desc: 'Hương trà trắng thanh lịch, nhẹ nhàng phù hợp không gian kín.', image: 'images/work_day_white_tea.png', category: 'workday' },
  { id: '9', name: 'Workday Soft Musk', code: 'SC-WD-004', scent: 'Xạ hương', price: '79.000đ', originalPrice: '89.000đ', desc: 'Xạ hương dịu nhẹ, giữ hương suốt 8 tiếng làm việc.', image: 'images/work_day_soft_musk.png', category: 'workday' },
  { id: '10', name: 'Workday Fresh Linen', code: 'SC-WD-005', scent: 'Vải lanh', price: '79.000đ', originalPrice: '89.000đ', desc: 'Hương vải lanh tươi mát, đem lại cảm giác tự tin năng động.', image: 'images/work_day_fresh_linen.png', category: 'workday' },

  // Campus
  { id: '11', name: 'Campus Pear Clean', code: 'SC-CP-001', scent: 'Quả lê', price: '79.000đ', desc: 'Mùi quả lê tươi ngọt thanh, lý tưởng cho các buổi học nhóm.', image: 'images/campus_pear_clean.png', category: 'campus' },
  { id: '12', name: 'Campus Fresh Tea', code: 'SC-CP-002', scent: 'Trà xanh', price: '79.000đ', desc: 'Hương trà tươi mát giúp giải tỏa căng thẳng học tập.', image: 'images/campus_fresh_tea.png', category: 'campus' },
  { id: '13', name: 'Campus Soft Citrus', code: 'SC-CP-003', scent: 'Cam chanh', price: '79.000đ', desc: 'Hương cam chanh tràn đầy sức sống cho ngày dài năng động.', image: 'images/campus_soft_citrus.png', category: 'campus' },
  { id: '14', name: 'Campus Light Cotton', code: 'SC-CP-004', scent: 'Cotton nhẹ', price: '79.000đ', desc: 'Mùi cotton nhẹ êm dịu, tạo cảm giác sạch thoáng.', image: 'images/campus_light_cotton.png', category: 'campus' },
  { id: '15', name: 'Campus Fresh Soft', code: 'SC-CP-005', scent: 'Hương hoa ngọt', price: '79.000đ', desc: 'Hương hoa cỏ ngọt lành phù hợp cho các bạn nữ sinh.', image: 'images/campus_fresh_soft.png', category: 'campus' },

  // Commute
  { id: '16', name: 'Commute Citrus Rush', code: 'SC-CO-001', scent: 'Cam chanh', price: '79.000đ', desc: 'Bừng tỉnh năng lượng, xua tan khói bụi đường phố.', image: 'images/commute_citrus_rush.png', category: 'commute' },
  { id: '17', name: 'Commute Aqua Fresh', code: 'SC-CO-002', scent: 'Hương biển', price: '79.000đ', desc: 'Mùi hương đại dương sảng khoái, bất chấp thời tiết nóng nực.', image: 'images/commute_aqua_fresh.png', category: 'commute' },
  { id: '18', name: 'Commute Mint Cool', code: 'SC-CO-003', scent: 'Bạc hà', price: '79.000đ', desc: 'Hương bạc hà mát lạnh, cực kỳ thoải mái khi đi xe máy.', image: 'images/commute_mint_cool.png', category: 'commute' },
  { id: '19', name: 'Commute Green Tea Air', code: 'SC-CO-004', scent: 'Trà xanh', price: '79.000đ', desc: 'Hương trà xanh thoang thoảng giúp thư giãn tinh thần.', image: 'images/commute_green_tea_air.png', category: 'commute' },
  { id: '20', name: 'Commute Fresh Sport', code: 'SC-CO-005', scent: 'Thể thao', price: '79.000đ', desc: 'Mùi hương thể thao năng động, chống mồ hôi hiệu quả.', image: 'images/commute_fresh_sport.png', category: 'commute' },

  // Social
  { id: '21', name: 'Social White Tea Elegance', code: 'SC-SO-001', scent: 'Trà trắng', price: '79.000đ', desc: 'Trà trắng thanh tao nâng tầm phong cách lịch lãm của bạn.', image: 'images/social_white_tea_elegance.png', category: 'social' },
  { id: '22', name: 'Social Pear Rose', code: 'SC-SO-002', scent: 'Hoa hồng lê', price: '79.000đ', desc: 'Hương hoa hồng sang trọng pha chút quả lê lãng mạn.', image: 'images/social_pear_rose.png', category: 'social' },
  { id: '23', name: 'Social Clean Musk', code: 'SC-SO-003', scent: 'Xạ hương sạch', price: '79.000đ', desc: 'Xạ hương sạch tinh tế tạo ấn tượng tốt khi tiếp xúc gần.', image: 'images/social_clean_musk.png', category: 'social' },
  { id: '24', name: 'Social Soft Floral', code: 'SC-SO-004', scent: 'Hương hoa mềm', price: '79.000đ', desc: 'Hương hoa mềm mại đầy lôi cuốn cho các buổi hẹn hò.', image: 'images/social_soft_floral.png', category: 'social' },
  { id: '25', name: 'Social Amber Cotton', code: 'SC-SO-005', scent: 'Hổ phách', price: '79.000đ', desc: 'Hổ phách ấm áp gần gũi, cuốn hút người đối diện.', image: 'images/social_amber_cotton.png', category: 'social' },

  // Sensitive
  { id: '26', name: 'Sensitive Unscented', code: 'SC-SE-001', scent: 'Không mùi', price: '79.000đ', desc: 'Chuyên biệt thấm hút và cảnh báo đổi màu, hoàn toàn không mùi.', image: 'images/sensitive_unscented.png', category: 'sensitive' },
  { id: '27', name: 'Sensitive White Tea Light', code: 'SC-SE-002', scent: 'Trà trắng nhẹ', price: '79.000đ', desc: 'Trà trắng siêu nhẹ an toàn, dịu lành nhất cho da nhạy cảm.', image: 'images/sensitive_white_tea_light.png', category: 'sensitive' },
  { id: '28', name: 'Sensitive Clean Basic', code: 'SC-SE-003', scent: 'Sạch thoáng', price: '79.000đ', desc: 'Hương dịu thoáng cơ bản, nâng niu làn da nhạy cảm.', image: 'images/sensitive_clean_basic.png', category: 'sensitive' },
  { id: '29', name: 'Sensitive Light Cotton', code: 'SC-SE-004', scent: 'Cotton nhẹ', price: '79.000đ', desc: 'Thành phần hữu cơ lành tính bảo vệ da khỏi kích ứng.', image: 'images/sensitive_light_cotton.png', category: 'sensitive' },
  { id: '30', name: 'Sensitive Soft Neutral', code: 'SC-SE-005', scent: 'Trung tính', price: '79.000đ', desc: 'Độ PH trung tính kết hợp hương thơm nhẹ dịu mát.', image: 'images/sensitive_soft_neutral.png', category: 'sensitive' }
];

const collectionsInfo = [
  { key: 'trial', title: 'Scentura Trial Box', desc: 'Với 05 miếng vừa đủ trải nghiệm giúp bạn nhẹ nhàng làm quen với công năng đặc trưng của Scentura.', id: 'trialSection' },
  { key: 'workday', title: 'Scentura Workday Collection', desc: 'Dành cho người đi làm văn phòng, mặc áo sơ mi, họp hành hoặc làm việc phòng kín.', id: 'workdaySection' },
  { key: 'campus', title: 'Scentura Campus Collection', desc: 'Phù hợp cho các bạn học sinh, sinh viên năng động, học nhóm hay tham gia hoạt động trường lớp.', id: 'campusSection' },
  { key: 'commute', title: 'Scentura Commute Rush Collection', desc: 'Hương cam chanh và bạc hà mát lạnh lý tưởng cho người thường xuyên di chuyển ngoài trời.', id: 'commuteSection' },
  { key: 'social', title: 'Scentura Social Confidence Collection', desc: 'Hương trà trắng và hổ phách thanh tao cho các buổi tiệc tùng, hẹn hò hay tiếp xúc gần.', id: 'socialSection' },
  { key: 'sensitive', title: 'Scentura Sensitive Collection', desc: 'Dành riêng cho làn da nhạy cảm với kết cấu sợi hữu cơ êm dịu và dòng không mùi tinh tế.', id: 'sensitiveSection' }
];

const Products: React.FC = () => {
  const { token, addToCart, showToastMessage } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  


  // Filter products based on search query
  const filteredProducts = productsData.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.scent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCartClick = (prod: any) => {
    if (!token) {
      showToastMessage('Vui lòng đăng nhập để sử dụng giỏ hàng!', 'error');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    addToCart({ name: prod.name, price: prod.price, image: prod.image });
  };

  return (
    <div className="products_page" style={{ paddingTop: '50px' }}>
      
      {/* TOP SLIDER */}
      <section className="rolls_section" id="RollsSection" style={{ width: '100%', padding: '0', background: 'transparent', marginBottom: '40px' }}>
        <InfiniteSlider autoPlay autoPlaySpeed={4000} showDots fullWidth>
          <img src="images/prd_rolls1.png" alt="Roll 1" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <img src="images/prd_rolls2.png" alt="Roll 2" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <img src="images/prd_rolls3.png" alt="Roll 3" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <img src="images/prd_rolls4.png" alt="Roll 4" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <img src="images/prd_rolls5.png" alt="Roll 5" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </InfiniteSlider>
      </section>

      {/* SEARCH BOX */}
      <div className="search_wrapper">
        <div className="search_box">
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm, nhóm mùi (cam chanh, trà trắng...)..." 
            className="search_input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search_btn" aria-label="Tìm kiếm">
            <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          </button>
        </div>
      </div>

      <div className="page_header">
        <h1>Bộ Sưu Tập Scentura</h1>
        <p>Khám phá dòng miếng dán chăm sóc trang phục tích hợp công nghệ thấm hút mồ hôi và hương thơm tinh tế cho ngày dài năng động.</p>
      </div>

      {searchQuery.trim() !== '' ? (
        /* SEARCH RESULTS GRID VIEW */
        <div className="main_content" style={{ padding: '0 20px 80px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '30px', color: '#1e3f22', fontFamily: 'Lora, serif', borderBottom: '1px solid rgba(30,63,34,0.1)', paddingBottom: '10px' }}>
            Kết quả tìm kiếm cho: "{searchQuery}" ({filteredProducts.length} sản phẩm)
          </h2>
          {filteredProducts.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '16px', padding: '40px 0' }}>Không tìm thấy sản phẩm phù hợp.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
              {filteredProducts.map((prod) => (
                <div key={prod.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="product_card_box">
                    <img src={prod.image} alt={prod.name} style={{ width: '100%', objectFit: 'cover' }} />
                    <div className="product_hover_info">
                      <h4 className="product_hover_name">{prod.name}</h4>
                      <div style={{ fontSize: '11px', color: '#e2c076', marginBottom: '8px', letterSpacing: '1px' }}>{prod.code}</div>
                      <div style={{ fontSize: '13px', color: '#ffffff', opacity: 0.85, marginBottom: '8px', fontFamily: 'Lora, serif' }}>Nhóm mùi: {prod.scent}</div>
                      <div className="product_hover_price">{prod.price}</div>
                      <p className="product_hover_desc">{prod.desc}</p>
                    </div>
                  </div>
                  <div className="product_visible_info">
                    <div className="product_visible_text">
                      <h5>{prod.name}</h5>
                      {prod.originalPrice && <div className="original_price">{prod.originalPrice}</div>}
                      <div className="visible_price">{prod.price}</div>
                    </div>
                    <button onClick={() => handleAddToCartClick(prod)} className="add_to_cart_btn" aria-label="Thêm vào giỏ hàng">
                      <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* NORMAL SLIDER VIEW GROUPED BY COLLECTIONS */
        collectionsInfo.map((info) => {
          const colProducts = productsData.filter((p) => p.category === info.key);

          return (
            <section key={info.key} className="collection_section" id={info.id}>
              <div className="featured_left_col">
                <h2>{info.title.split(' ')[0]}<br />{info.title.split(' ').slice(1).join(' ')}</h2>
                <p>{info.desc}</p>
              </div>

              <div className="rolls_container" style={{ flex: '1.2' }}>
                <InfiniteSlider slidesToShow={2} showDots>
                  {colProducts.map((prod) => (
                    <div key={prod.id} style={{ padding: '0 10px', width: '100%' }}>
                      <div className="product_card_box">
                        <img src={prod.image} alt={prod.name} style={{ width: '100%', objectFit: 'cover' }} />
                        <div className="product_hover_info">
                          <h4 className="product_hover_name">{prod.name}</h4>
                          <div style={{ fontSize: '11px', color: '#e2c076', marginBottom: '8px', letterSpacing: '1px' }}>{prod.code}</div>
                          <div style={{ fontSize: '13px', color: '#ffffff', opacity: 0.85, marginBottom: '8px', fontFamily: 'Lora, serif' }}>Nhóm mùi: {prod.scent}</div>
                          <div className="product_hover_price">{prod.price}</div>
                          <p className="product_hover_desc">{prod.desc}</p>
                        </div>
                      </div>
                      <div className="product_visible_info">
                        <div className="product_visible_text">
                          <h5>{prod.name}</h5>
                          {prod.originalPrice && <div className="original_price">{prod.originalPrice}</div>}
                          <div className="visible_price">{prod.price}</div>
                        </div>
                        <button onClick={() => handleAddToCartClick(prod)} className="add_to_cart_btn" aria-label="Thêm vào giỏ hàng">
                          <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </InfiniteSlider>
              </div>
            </section>
          );
        })
      )}

      {/* 1. THÔNG TIN SẢN PHẨM */}
      <section className="info_section">
        <div className="feature_header">
          <h2>Thông Tin Sản Phẩm</h2>
        </div>
        <div className="info_container">
          <div className="info_img_box">
            <img src="images/unknown_insert_product.png" alt="Thông tin sản phẩm" />
          </div>
          <div className="info_table_box">
            <table className="product_spec_table">
              <thead>
                <tr>
                  <th>Thông tin</th>
                  <th>Nội dung</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Quy cách</strong></td>
                  <td>10 miếng/Standard Box , 06 miếng/Trial Box</td>
                </tr>
                <tr>
                  <td><strong>Mùi hương</strong></td>
                  <td>Cotton sạch</td>
                </tr>
                <tr>
                  <td><strong>Chất liệu</strong></td>
                  <td>Vải không dệt, lớp thấm hút, chỉ thị màu, vi nang hương và keo chuyên dụng cho vải</td>
                </tr>
                <tr>
                  <td><strong>Cách dùng</strong></td>
                  <td>Dán vào mặt trong trang phục</td>
                </tr>
                <tr>
                  <td><strong>Hình thức</strong></td>
                  <td>Sử dụng một lần</td>
                </tr>
                <tr>
                  <td><strong>Thương hiệu</strong></td>
                  <td>SCENTURA</td>
                </tr>
                <tr>
                  <td><strong>Nguồn gốc thương hiệu</strong></td>
                  <td>Việt Nam</td>
                </tr>
                <tr>
                  <td><strong>Nơi sản xuất</strong></td>
                  <td>Việt Nam</td>
                </tr>
                <tr>
                  <td><strong>Bảo quản</strong></td>
                  <td>Nơi khô ráo, tránh ánh nắng trực tiếp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. HƯỚNG DẪN SỬ DỤNG */}
      <section className="hdsd_section">
        <div className="feature_header">
          <h2>Hướng Dẫn Sử Dụng</h2>
        </div>
        <div className="hdsd_container">
          <div className="hdsd_item">
            <div className="hdsd_img_box">
              <img src="images/hdsd1.png" alt="Bước 1" />
            </div>
            <div className="hdsd_step_header">
              <strong>Bước 1</strong>
              <h4>Chuẩn bị bề mặt vải</h4>
            </div>
            <p className="hdsd_step_desc">Đảm bảo phần vải bên trong áo tại khu vực dưới cánh tay sạch và khô ráo trước khi sử dụng để keo bám ổn định.</p>
          </div>

          <div className="hdsd_item">
            <div className="hdsd_img_box">
              <img src="images/hdsd2.png" alt="Bước 2" />
            </div>
            <div className="hdsd_step_header">
              <strong>Bước 2</strong>
              <h4>Bóc lớp giấy bảo vệ</h4>
            </div>
            <p className="hdsd_step_desc">Nhẹ nhàng bóc lớp giấy phía sau. Hạn chế chạm tay trực tiếp vào keo dán để giữ độ bám tốt nhất.</p>
          </div>

          <div className="hdsd_item">
            <div className="hdsd_img_box">
              <img src="images/hdsd3.png" alt="Bước 3" />
            </div>
            <div className="hdsd_step_header">
              <strong>Bước 3</strong>
              <h4>Dán kín đáo vào áo</h4>
            </div>
            <p className="hdsd_step_desc">Đặt miếng dán vào mặt trong áo dưới cánh tay rồi miết nhẹ để bám đều. Lưu ý không dán trực tiếp lên da.</p>
          </div>

          <div className="hdsd_item">
            <div className="hdsd_img_box">
              <img src="images/hdsd4.png" alt="Bước 4" />
            </div>
            <div className="hdsd_step_header">
              <strong>Bước 4</strong>
              <h4>Quan sát tín hiệu màu</h4>
            </div>
            <p className="hdsd_step_desc">Lớp chỉ thị đổi màu khi ẩm để nhắc nhở bạn chủ động làm mới cơ thể hoặc thay thế miếng dán mới.</p>
          </div>
        </div>
      </section>

      {/* 3. LƯU Ý KHI SỬ DỤNG */}
      <section className="info_section">
        <div className="feature_header">
          <h2>Lưu Ý Khi Sử Dụng</h2>
        </div>
        <div className="info_container">
          <div className="info_img_box">
            <img src="images/product_note.jpg" alt="Lưu ý khi sử dụng" />
          </div>
          <div className="info_text_box">
            <h2>Một vài điều nhỏ để Scentura đồng hành cùng bạn đúng cách</h2>
            <p>
              <strong>1.</strong> Mỗi miếng Scentura được thiết kế cho một lần sử dụng. Sau khi tháo khỏi trang phục, bạn nên bỏ miếng dán và thay bằng sản phẩm mới khi cần.<br /><br />
              <strong>2.</strong> Không sử dụng nếu miếng dán đã bị rách, ẩm, bẩn hoặc biến dạng trước khi mở.<br /><br />
              <strong>3.</strong> Với những chất liệu vải mỏng, dễ xù hoặc có bề mặt đặc biệt, hãy thử độ bám trên một vùng nhỏ và khuất trước khi sử dụng.<br /><br />
              <strong>4.</strong> Tín hiệu màu là lời nhắc hỗ trợ để bạn chủ động kiểm tra trang phục, không phải kết quả đo chính xác mức độ mùi cơ thể.<br /><br />
              <strong>5.</strong> Scentura là phụ kiện chăm sóc cá nhân, không phải thiết bị y tế và không thay thế thói quen vệ sinh cơ thể hằng ngày.<br /><br />
              <strong>6.</strong> Sử dụng đúng cách để mỗi trải nghiệm luôn nhẹ nhàng, kín đáo và vừa đủ.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Products;
