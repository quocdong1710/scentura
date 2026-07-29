import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Intro.css';

const Intro: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: '130px' }}>
      {/* INTRO IMAGE BANNER */}
      <div className="intro_image">
        <img src="images/intro_pic1.jpg" alt="Scentura Introduction" />
      </div>

      <div className="main_content">
        {/* HERO SECTION */}
        <div className="intro_hero">
          <h1>Câu Chuyện Scentura</h1>
        </div>

        {/* History Section */}
        <section className="hvm_section">
          <div className="hvm_row">
            <div className="hvm_img_col auto_height">
              <img src="images/intro_history.png" alt="Lịch sử hình thành" />
            </div>
            <div className="hvm_text_col">
              <h2>Bắt đầu từ một điều không phải ai cũng dễ nói thành lời ...</h2>
              <p className="hvm_basic_text">
                Trong nhịp sống hằng ngày, chúng ta thường dành nhiều sự chuẩn bị cho trang phục, công việc và những cuộc gặp gỡ. Nhưng vẫn có những băn khoăn rất riêng mà mỗi người thường giữ lại cho mình.<br /><br />
                Đó là cảm giác không chắc chắn về sự thơm tho và chỉn chu sau một ngày dài di chuyển, học tập hoặc làm việc.<br /><br />
                Scentura ra đời từ sự thấu hiểu ấy.<br /><br />
                Chúng tôi không muốn làm lớn thêm một nỗi lo tự nhiên của cơ thể. Scentura lựa chọn đồng hành theo cách kín đáo hơn, để mỗi người có thể cảm thấy nhẹ lòng và tập trung vào những điều thực sự quan trọng.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="hvm_section">
          <div className="hvm_row reverse">
            <div className="hvm_img_col">
              <img src="images/intro_vision.png" alt="Tầm nhìn" />
            </div>
            <div className="hvm_text_col">
              <h2>TẦM NHÌN</h2>
              <p className="hvm_basic_text">
                Scentura hướng đến việc trở thành thương hiệu dẫn đầu trong lĩnh vực phụ kiện chăm sóc cá nhân thông minh tại thị trường Việt Nam và từng bước vươn tầm khu vực Đông Nam Á.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="hvm_section">
          <div className="hvm_row">
            <div className="hvm_img_col">
              <img src="images/intro_mission.png" alt="Sứ mệnh" />
            </div>
            <div className="hvm_text_col">
              <h2>SỨ MỆNH</h2>
              <p className="hvm_basic_text">
                Scentura mang đến giải pháp miếng dán kiểm soát mùi cơ thể kín đáo, tiện lợi và dễ sử dụng, giúp người dùng chủ động duy trì sự thơm tho, chỉn chu và tự tin trong học tập, công việc cũng như giao tiếp hằng ngày.
              </p>
            </div>
          </div>
        </section>

        {/* Value Section */}
        <section className="hvm_section">
          <div className="hvm_row reverse">
            <div className="hvm_img_col auto_height">
              <img src="images/intro_value.png" alt="Giá trị" />
            </div>
            <div className="hvm_text_col">
              <h2>GIÁ TRỊ CỐT LÕI</h2>
              <p className="hvm_basic_text">
                <strong>Nhẹ nhàng trong cách hiện diện, rõ ràng trong từng điều chúng tôi làm</strong><br /><br />
                <strong>Tiên phong</strong><br />
                Tìm kiếm những cách tiếp cận mới cho các nhu cầu chăm sóc cá nhân chưa được quan tâm đúng mức.<br /><br />
                <strong>Tinh tế</strong><br />
                Tôn trọng sự riêng tư, cảm xúc và trải nghiệm cá nhân của mỗi người.<br /><br />
                <strong>Thực tiễn</strong><br />
                Phát triển thương hiệu từ những tình huống gần gũi với khí hậu, thói quen di chuyển và nhịp sống hằng ngày.<br /><br />
                <strong>An tâm</strong><br />
                Giúp người dùng bớt đi một băn khoăn nhỏ để dành nhiều sự tập trung hơn cho những điều quan trọng.
              </p>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="hvm_section">
          <div className="hvm_row">
            <div className="hvm_img_col">
              <img src="images/intro_commit.png" alt="Cam kết" />
            </div>
            <div className="hvm_text_col">
              <h2>ĐIỀU CHÚNG TÔI CAM KẾT</h2>
              <p className="hvm_basic_text">
                <strong>Sự tin tưởng được vun đắp từ những điều rõ ràng</strong><br /><br />
                Scentura cam kết trung thực trong cách giới thiệu thương hiệu, minh bạch về khả năng và giới hạn của sản phẩm, đồng thời tôn trọng quyền riêng tư của người dùng.<br /><br />
                Chúng tôi không theo đuổi những lời hứa phóng đại. Mỗi bước phát triển đều được xây dựng từ việc lắng nghe nhu cầu thực tế, tiếp nhận phản hồi và không ngừng hoàn thiện trải nghiệm.<br /><br />
                Mỗi hành trình tự tin đều có thể bắt đầu từ một điều rất nhỏ
              </p>
            </div>
          </div>
        </section>

        <button onClick={() => navigate('/products')} className="bottom_feature_btn">
          Khám phá sản phẩm của SCENTURA
        </button>
      </div>
    </div>
  );
};

export default Intro;
