import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Policy.css';

const Policy: React.FC = () => {
  return (
    <div style={{ paddingTop: '130px' }}>
      <div className="main_content">
        {/* HERO SECTION */}
        <div className="policy_hero">
          <h1>Chính Sách Và Quy Định</h1>
          <p style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', color: '#666', fontSize: '16px' }}>Thông tin chi tiết về các chính sách hoạt động của Scentura</p>
        </div>

        {/* 1. Chính sách thanh toán */}
        <section className="policy_row_section">
          <div className="policy_row">
            <div className="policy_img_col">
              <img src="images/policy_chinhsachthanhtoan.png" alt="Chính sách thanh toán" />
            </div>
            <div className="policy_text_col">
              <h2>Chính sách thanh toán</h2>
              <p>Scentura hỗ trợ các hình thức thanh toán sau:</p>
              
              <p><em>Thanh toán khi nhận hàng (COD)</em><br />
              Bạn thanh toán trực tiếp cho nhân viên giao hàng sau khi nhận đơn. Đơn hàng sẽ được xử lý sau khi Scentura xác nhận đầy đủ tên người nhận, số điện thoại, địa chỉ và sản phẩm đã đặt.</p>
              
              <p><em>Chuyển khoản ngân hàng</em><br />
              Sau khi đặt hàng, bạn sẽ nhận được thông tin tài khoản, số tiền cần thanh toán và nội dung chuyển khoản. Đơn hàng được chuyển sang bước xử lý khi Scentura ghi nhận giao dịch thành công.</p>
              
              <p><em>Thanh toán trực tuyến</em><br />
              Website có thể hỗ trợ thẻ tín dụng, thẻ ghi nợ quốc tế và Apple Pay thông qua cổng thanh toán trung gian. Scentura không trực tiếp lưu trữ thông tin thẻ của khách hàng trên hệ thống.</p>
              
              <p>Sau khi hoàn tất đặt hàng, Scentura sẽ gửi xác nhận qua email, tin nhắn hoặc cuộc gọi. Trường hợp thông tin chưa đầy đủ hoặc giao dịch chưa thành công, đội ngũ chăm sóc khách hàng sẽ liên hệ để hỗ trợ trước khi đóng gói.</p>
            </div>
          </div>
        </section>

        {/* 2. Chính sách giao hàng */}
        <section className="policy_row_section">
          <div className="policy_row reverse">
            <div className="policy_img_col">
              <img src="images/policy_chinhsachgiaohang.jpg" alt="Chính sách giao hàng" />
            </div>
            <div className="policy_text_col">
              <h2>Chính sách giao hàng</h2>
              
              <p>Đối với đơn hàng trên Shopee, TikTok Shop hoặc Lazada, phí vận chuyển, thời gian giao hàng và đơn vị giao nhận được áp dụng theo chính sách của từng nền tảng.</p>
              
              <p>Đối với đơn hàng trên website Scentura, khách hàng có thể lựa chọn:</p>
              <ul>
                <li>Giao hàng tiết kiệm.</li>
                <li>Giao hàng nhanh.</li>
                <li>Giao hàng có thu hộ COD.</li>
              </ul>
              
              <p>Đơn hàng sẽ được xử lý, đóng gói và bàn giao cho đơn vị vận chuyển trong vòng 24 - 48 giờ làm việc sau khi được xác nhận.</p>
              
              <p>Thời gian nhận hàng thực tế có thể thay đổi tùy theo khu vực, phương thức vận chuyển, thời tiết, ngày lễ hoặc thời gian cao điểm. Mọi chi phí giao hàng sẽ được thông báo rõ trước khi đơn hàng được xác nhận.</p>
              
              <p>Trong trường hợp giao hàng không thành công do sai thông tin, không liên lạc được hoặc khách hàng từ chối nhận không có lý do phù hợp, đơn hàng có thể được hoàn về. Khi cần giao lại, chi phí phát sinh sẽ do khách hàng thanh toán.</p>
            </div>
          </div>
        </section>

        {/* 3. Chính sách đổi trả và hoàn tiền */}
        <section className="policy_row_section">
          <div className="policy_row">
            <div className="policy_img_col">
              <img src="images/policy_chinhsachdoitra.png" alt="Chính sách đổi trả và hoàn tiền" />
            </div>
            <div className="policy_text_col">
              <h2>Chính sách đổi trả và hoàn tiền</h2>
              
              <p>Scentura hỗ trợ đổi trả hoặc hoàn tiền trong các trường hợp:</p>
              <ul>
                <li>Giao sai sản phẩm.</li>
                <li>Giao thiếu số lượng.</li>
                <li>Sản phẩm có lỗi từ nhà sản xuất.</li>
                <li>Sản phẩm bị hư hỏng nghiêm trọng khi vận chuyển.</li>
                <li>Sản phẩm hết hạn sử dụng.</li>
                <li>Sản phẩm không đúng với thông tin được mô tả trên website.</li>
              </ul>
              
              <p>Khách hàng cần liên hệ trong vòng 48 giờ kể từ khi nhận hàng và cung cấp hình ảnh hoặc video mở kiện hàng.</p>
              
              <p>Sản phẩm đổi trả cần:</p>
              <ul>
                <li>Còn đầy đủ hộp, bao bì, tem và seal.</li>
                <li>Chưa được mở hoặc sử dụng.</li>
                <li>Không bị rách, ướt, bẩn hoặc biến dạng.</li>
                <li>Có thông tin chứng minh được mua từ kênh chính thức của Scentura.</li>
              </ul>
              
              <p>Các sản phẩm quà tặng, dùng thử hoặc thuộc chương trình ưu đãi đặc biệt sẽ không áp dụng đổi trả khi có thông báo trước, trừ trường hợp lỗi từ phía thương hiệu.</p>
              
              <p>Đối với đơn hàng đủ điều kiện hoàn tiền, thời gian xử lý dự kiến từ 3 - 7 ngày làm việc sau khi Scentura hoàn tất xác nhận.</p>
            </div>
          </div>
        </section>

        {/* 4. Chính sách kiểm tra hàng */}
        <section className="policy_row_section">
          <div className="policy_row reverse">
            <div className="policy_img_col">
              <img src="images/policy_chinhsachkiemtrahang.png" alt="Chính sách kiểm tra hàng" />
            </div>
            <div className="policy_text_col">
              <h2>Chính sách kiểm tra hàng</h2>
              
              <p>Khi nhận đơn, bạn có thể kiểm tra:</p>
              <ul>
                <li>Tình trạng bên ngoài của kiện hàng.</li>
                <li>Số lượng sản phẩm.</li>
                <li>Tên sản phẩm, phiên bản hoặc mùi hương.</li>
                <li>Tình trạng hộp, tem và seal.</li>
                <li>Hạn sử dụng.</li>
              </ul>
              
              <p>Nếu kiện hàng bị móp, rách, ướt hoặc có dấu hiệu hư hỏng, bạn nên chụp ảnh hoặc quay video để Scentura có cơ sở hỗ trợ.</p>
              
              <p>Vì đây là sản phẩm chăm sóc cá nhân, khách hàng không nên mở seal từng miếng dán hoặc sử dụng thử trong quá trình kiểm tra. Việc mở hoặc sử dụng sản phẩm có thể ảnh hưởng đến điều kiện đổi trả.</p>
              
              <p>Scentura khuyến khích bạn quay video từ khi kiện hàng còn nguyên trạng đến lúc kiểm tra sản phẩm bên trong. Đây sẽ là căn cứ hữu ích khi phát sinh trường hợp giao sai, giao thiếu hoặc hư hỏng.</p>
            </div>
          </div>
        </section>

        {/* 5. Chính sách bảo mật thông tin */}
        <section className="policy_row_section">
          <div className="policy_row">
            <div className="policy_img_col">
              <img src="images/policy_chinhsachbaomatthongtin.jpg" alt="Chính sách bảo mật thông tin" />
            </div>
            <div className="policy_text_col">
              <h2>Chính sách bảo mật thông tin</h2>
              
              <p>Scentura có thể thu thập những thông tin cần thiết trong quá trình mua hàng như:</p>
              <ul>
                <li>Họ và tên.</li>
                <li>Số điện thoại.</li>
                <li>Email.</li>
                <li>Địa chỉ giao hàng.</li>
                <li>Thông tin và lịch sử đơn hàng.</li>
                <li>Nội dung trao đổi với bộ phận chăm sóc khách hàng.</li>
              </ul>
              
              <p>Các thông tin này được sử dụng để xác nhận và giao đơn, hỗ trợ đổi trả, hoàn tiền, giải quyết khiếu nại, chăm sóc sau mua và cải thiện trải nghiệm trên website.</p>
              
              <p>Scentura không bán hoặc chia sẻ thông tin cá nhân cho bên thứ ba vì mục đích thương mại trái phép. Trong phạm vi cần thiết, thông tin có thể được cung cấp cho đơn vị vận chuyển, cổng thanh toán hoặc đối tác kỹ thuật để hoàn tất đơn hàng và vận hành website.</p>
              
              <p>Khách hàng có thể yêu cầu kiểm tra, cập nhật, chỉnh sửa hoặc xóa thông tin cá nhân bằng cách liên hệ với Scentura.</p>
            </div>
          </div>
        </section>

        {/* 6. Chính sách giải quyết khiếu nại */}
        <section className="policy_row_section">
          <div className="policy_row reverse">
            <div className="policy_img_col" style={{ marginTop: '15px', marginBottom: '15px', borderRadius: '8px', overflow: 'hidden', maxWidth: '100%', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', aspectRatio: 'auto', height: 'auto', display: 'block' }}>
              <img src="images/policy_pattern_rp.jpg" alt="Chính sách giải quyết khiếu nại" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>
            <div className="policy_text_col">
              <h2>Chính sách giải quyết khiếu nại</h2>
              
              <p>Scentura tiếp nhận các phản hồi liên quan đến:</p>
              <ul>
                <li>Giao sai hoặc giao thiếu sản phẩm.</li>
                <li>Sản phẩm hư hỏng hoặc có lỗi.</li>
                <li>Đơn hàng giao chậm.</li>
                <li>Sai thông tin đơn hàng.</li>
                <li>Vấn đề thanh toán.</li>
                <li>Đổi trả và hoàn tiền.</li>
                <li>Trải nghiệm trong quá trình sử dụng.</li>
              </ul>
              
              <p>Khách hàng có thể gửi thông tin qua:</p>
              <ul>
                <li><strong>Hotline:</strong> 0905.145.789</li>
                <li><strong>Email:</strong> contact@scentura.com</li>
                <li>
                  <strong>Biểu mẫu liên hệ trên website:</strong> <a href="https://forms.gle/JuWAKvnHouEYf94y8" target="_blank" rel="noopener noreferrer" style={{ color: '#1e3f22', fontWeight: 600, textDecoration: 'underline' }}>https://forms.gle/JuWAKvnHouEYf94y8</a>
                </li>
              </ul>
              
              <p>Khi gửi yêu cầu, vui lòng cung cấp mã đơn hàng, họ tên, số điện thoại, nội dung cần hỗ trợ cùng hình ảnh hoặc video liên quan.</p>
              
              <p>Scentura sẽ phản hồi trong vòng 24 - 48 giờ làm việc kể từ khi nhận đủ thông tin. Với những trường hợp cần xác minh thêm từ đơn vị vận chuyển hoặc đối tác, thời gian xử lý có thể kéo dài hơn và tiến độ sẽ được chủ động cập nhật đến khách hàng.</p>
            </div>
          </div>
        </section>

        {/* Khung màu be hỗ trợ liên hệ */}
        <div className="support_box_beige">
          <h3>Cần Scentura hỗ trợ?</h3>
          <p>Mỗi phản hồi đều là một phần giúp chúng tôi chăm chút trải nghiệm tốt hơn.</p>
          <Link to="/contact" target="_blank" rel="noopener noreferrer" className="support_btn">LIÊN HỆ SCENTURA</Link>
        </div>
      </div>
    </div>
  );
};

export default Policy;
