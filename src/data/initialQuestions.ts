import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // ==========================================
  // I. NHẬN BIẾT: 40 CÂU (NB-01 ĐẾN NB-40)
  // ==========================================
  {
    id: 'nb-01',
    code: 'NB-01',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Gang được sản xuất chủ yếu từ nguyên liệu nào và bằng thiết bị gì?',
    options: [
      'Quặng sắt bằng lò cao luyện gang',
      'Gang bằng lò oxi',
      'Gang bằng lò hồ quang',
      'Đá vôi bằng lò nung'
    ],
    correctIndex: 0,
    explanation: 'Theo SGK Công nghệ 10 Bài 3: Gang được sản xuất từ quặng sắt bằng lò cao luyện gang.'
  },
  {
    id: 'nb-02',
    code: 'NB-02',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Công nghệ trong lĩnh vực luyện kim, cơ khí được chia thành mấy công nghệ phổ biến?',
    options: ['3 công nghệ', '4 công nghệ', '5 công nghệ', '7 công nghệ'],
    correctIndex: 2,
    explanation: 'Có 5 công nghệ phổ biến trong lĩnh vực luyện kim, cơ khí: Luyện kim, Đúc, Gia công cắt gọt, Gia công áp lực, Hàn.'
  },
  {
    id: 'nb-03',
    code: 'NB-03',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Bản chất của công nghệ đúc kim loại là gì?',
    options: [
      'Bóc đi lớp vật liệu thừa trên phôi tạo thành chi tiết',
      'Nấu chảy kim loại thành trạng thái lỏng, rót vào khuôn, nguội và kết tinh tạo thành vật đúc',
      'Dùng ngoại lực làm kim loại biến dạng dẻo thành hình dáng yêu cầu',
      'Nung nóng làm chảy kim loại ở vùng tiếp xúc để tạo mối nối'
    ],
    correctIndex: 1,
    explanation: 'Đúc kim loại là phương pháp nấu kim loại thành trạng thái lỏng, sau đó rót vào khuôn có hình dạng kích thước như sản phẩm, khi nguội kết tinh tạo thành vật đúc.'
  },
  {
    id: 'nb-04',
    code: 'NB-04',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Theo sản phẩm tạo ra, công nghệ luyện kim được chia làm mấy loại chính?',
    options: ['1 loại', '2 loại', '3 loại', '4 loại'],
    correctIndex: 1,
    explanation: 'Công nghệ luyện kim chia làm 2 loại: luyện kim đen (tạo ra gang và thép) và luyện kim màu (tạo ra nhôm, đồng, vàng, chì, kẽm,...).'
  },
  {
    id: 'nb-05',
    code: 'NB-05',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Bản chất của công nghệ gia công cắt gọt là gì?',
    options: [
      'Rót kim loại lỏng vào lòng khuôn để đông đặc',
      'Bóc đi một phần kim loại của phôi dưới dạng phoi nhờ dụng cụ cắt và máy cắt',
      'Dùng ngoại lực tác dụng lên vật liệu dẻo',
      'Nung nóng chảy mép ghép nối của kim loại'
    ],
    correctIndex: 1,
    explanation: 'Gia công cắt gọt là thực hiện việc lấy đi một phần kim loại của phôi dưới dạng phoi nhờ dụng cụ cắt và máy cắt kim loại để tạo ra chi tiết có hình dạng, kích thước theo yêu cầu.'
  },
  {
    id: 'nb-06',
    code: 'NB-06',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Thép được sản xuất chủ yếu từ nguyên liệu nào và bằng các loại lò nào?',
    options: [
      'Quặng sắt bằng lò cao',
      'Gang bằng lò oxi hoặc lò hồ quang điện',
      'Than đá bằng lò nung',
      'Đồng thau bằng lò đúc'
    ],
    correctIndex: 1,
    explanation: 'Thép được sản xuất từ nguyên liệu gang bằng lò thổi oxi (lò LD) hoặc lò hồ quang điện.'
  },
  {
    id: 'nb-07',
    code: 'NB-07',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Bản chất của công nghệ gia công áp lực là gì?',
    options: [
      'Nấu chảy kim loại rồi rót vào khuôn có hình dáng định sẵn',
      'Cắt bỏ lớp kim loại thừa trên bề mặt phôi',
      'Dựa vào tính dẻo của kim loại, dùng ngoại lực tác dụng làm kim loại biến dạng theo hình dáng yêu cầu',
      'Nối các thanh kim loại lại với nhau bằng nhiệt độ cao'
    ],
    correctIndex: 2,
    explanation: 'Gia công áp lực là công nghệ dựa vào tính dẻo của kim loại, dùng ngoại lực của thiết bị làm cho kim loại biến dạng theo hình dáng yêu cầu.'
  },
  {
    id: 'nb-08',
    code: 'NB-08',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Động cơ điện gồm có mấy bộ phận chính?',
    options: ['2 bộ phận chính', '3 bộ phận chính', '4 bộ phận chính', '5 bộ phận chính'],
    correctIndex: 0,
    explanation: 'Động cơ điện có 2 bộ phận chính là: Stato (phần đứng yên) và Roto (phần quay).'
  },
  {
    id: 'nb-09',
    code: 'NB-09',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Quá trình luyện gang, thép thường phát sinh những tác nhân gây ô nhiễm nào?',
    options: ['Khí CO2', 'Bụi kim loại', 'Tiếng ồn công nghiệp', 'Cả 3 tác nhân trên'],
    correctIndex: 3,
    explanation: 'Lò luyện gang, thép xả ra lượng lớn khí CO2, phát sinh nhiều bụi và tiếng ồn lớn ảnh hưởng đến môi trường.'
  },
  {
    id: 'nb-10',
    code: 'NB-10',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Ưu điểm nổi bật giúp đèn LED được sử dụng rộng rãi hiện nay là gì?',
    options: [
      'Tiết kiệm điện năng',
      'Hiệu quả chiếu sáng cao',
      'Tuổi thọ cao',
      'Cả 3 ưu điểm trên'
    ],
    correctIndex: 3,
    explanation: 'Đèn LED có đầy đủ ưu điểm: siêu tiết kiệm điện, hiệu suất phát quang cao, tuổi thọ lên tới hàng chục nghìn giờ.'
  },
  {
    id: 'nb-11',
    code: 'NB-11',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Bản chất của công nghệ hàn là gì?',
    options: [
      'Tạo mối liên kết cố định giữa các chi tiết kim loại bằng cách nung nóng chảy ở vùng tiếp xúc, khi nguội kết thành một khối',
      'Lấy đi lượng dư kim loại nhờ dao tiện hoặc máy phay',
      'Dùng búa đập làm biến dạng thanh kim loại',
      'Đổ dung dịch kim loại lỏng vào khuôn cát'
    ],
    correctIndex: 0,
    explanation: 'Công nghệ hàn tạo mối liên kết cố định giữa các chi tiết kim loại bằng cách nung nóng chỗ nối đến trạng thái hàn (chảy hoặc dẻo), sau đó kết tinh tạo mối hàn.'
  },
  {
    id: 'nb-12',
    code: 'NB-12',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Hai bộ phận chính của động cơ điện xoay chiều là:',
    options: ['Stato và Roto', 'Piston và Xi lanh', 'Vỏ máy và Cực từ', 'Trục cán và Ổ bi'],
    correctIndex: 0,
    explanation: 'Stato là phần đứng yên tạo từ trường, Roto là phần quay chuyển động.'
  },
  {
    id: 'nb-13',
    code: 'NB-13',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Nhược điểm lớn nhất của bóng đèn sợi đốt là gì?',
    options: [
      'Tiêu thụ nhiều điện năng và tỏa nhiều nhiệt',
      'Hiệu quả chiếu sáng thấp (phần lớn điện năng biến thành nhiệt năng)',
      'Tuổi thọ thấp (khoảng 1.000 giờ)',
      'Cả 3 nhược điểm trên'
    ],
    correctIndex: 3,
    explanation: 'Đèn sợi đốt tiêu thụ nhiều điện, phần lớn biến thành nhiệt nên hiệu suất phát sáng thấp và tuổi thọ ngắn.'
  },
  {
    id: 'nb-14',
    code: 'NB-14',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Đâu là các nguồn năng lượng chính được dùng để sản xuất điện năng phổ biến?',
    options: [
      'Thủy điện (năng lượng nước)',
      'Nhiệt điện (than, dầu, khí)',
      'Điện hạt nhân, điện mặt trời, điện gió',
      'Tất cả các nguồn năng lượng trên'
    ],
    correctIndex: 3,
    explanation: 'Các công nghệ sản xuất điện năng gồm: thủy điện, nhiệt điện, điện hạt nhân, điện mặt trời, điện gió,...'
  },
  {
    id: 'nb-15',
    code: 'NB-15',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Trong lĩnh vực điện - điện tử, sách giáo khoa đề cập đến mấy công nghệ phổ biến?',
    options: ['3 công nghệ', '4 công nghệ', '5 công nghệ', '6 công nghệ'],
    correctIndex: 2,
    explanation: 'Có 5 công nghệ: 1. Sản xuất điện năng, 2. Điện - quang, 3. Điện - cơ, 4. Điều khiển và tự động hóa, 5. Truyền thông không dây.'
  },
  {
    id: 'nb-16',
    code: 'NB-16',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Sản phẩm nào sau đây là sản phẩm của công nghệ luyện kim đen?',
    options: ['Gang và thép', 'Nhôm và đồng', 'Vàng và bạc', 'Chì và kẽm'],
    correctIndex: 0,
    explanation: 'Luyện kim đen tạo ra gang và thép (hợp kim của sắt và cacbon).'
  },
  {
    id: 'nb-17',
    code: 'NB-17',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Sản phẩm nào sau đây là sản phẩm của công nghệ luyện kim màu?',
    options: ['Gang trắng', 'Thép xây dựng', 'Nhôm, đồng, kẽm, chì', 'Gang xám'],
    correctIndex: 2,
    explanation: 'Luyện kim màu tạo ra các kim loại và hợp kim không chứa sắt làm thành phần chủ yếu như nhôm, đồng, vàng, kẽm,...'
  },
  {
    id: 'nb-18',
    code: 'NB-18',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Công nghệ đúc kim loại được chia thành các loại phổ biến nào?',
    options: [
      'Đúc trong khuôn cát, khuôn kim loại',
      'Đúc ly tâm',
      'Đúc áp lực, đúc khuôn mẫu nóng chảy',
      'Cả 3 nhóm phương pháp trên'
    ],
    correctIndex: 3,
    explanation: 'SGK nêu các loại: đúc trong khuôn cát, khuôn kim loại, đúc ly tâm, đúc áp lực, đúc khuôn mẫu nóng chảy.'
  },
  {
    id: 'nb-19',
    code: 'NB-19',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Các phương pháp gia công cắt gọt kim loại truyền thống bao gồm:',
    options: [
      'Tiện, phay, bào, mài, khoan',
      'Cán, kéo, rèn, dập',
      'Hàn hồ quang, hàn hơi',
      'Đúc khuôn cát, đúc ly tâm'
    ],
    correctIndex: 0,
    explanation: 'Gia công cắt gọt bao gồm: tiện, phay, bào, mài, khoan, gia công bằng tia lửa điện, laser,...'
  },
  {
    id: 'nb-20',
    code: 'NB-20',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Những công nghệ nào sau đây thuộc công nghệ gia công áp lực?',
    options: [
      'Tiện, phay, khoan',
      'Cán, kéo, rèn và dập',
      'Hàn hồ quang, hàn TIG',
      'Đúc áp lực, đúc khuôn kim loại'
    ],
    correctIndex: 1,
    explanation: 'Những công nghệ gia công áp lực tiêu biểu gồm: Cán, kéo, rèn và dập.'
  },
  {
    id: 'nb-21',
    code: 'NB-21',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Căn cứ theo trạng thái kim loại mối hàn khi tiến hành nung nóng, công nghệ hàn chia làm 2 nhóm là:',
    options: [
      'Hàn nóng chảy và hàn áp lực',
      'Hàn điện và hàn hóa học',
      'Hàn kim loại và hàn phi kim',
      'Hàn thủ công và hàn tự động'
    ],
    correctIndex: 0,
    explanation: 'Công nghệ hàn chia thành: Hàn nóng chảy (chỗ hàn và que hàn nóng chảy) và Hàn áp lực (nung dẻo rồi ép lực).'
  },
  {
    id: 'nb-22',
    code: 'NB-22',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Đèn sợi đốt đầu tiên được nhà khoa học Thomas Edison phát minh vào năm nào?',
    options: ['Năm 1835', 'Năm 1879', 'Năm 1934', 'Năm 2006'],
    correctIndex: 1,
    explanation: 'Theo mốc thời gian SGK Công nghệ 10: Đèn sợi đốt ra đời năm 1879.'
  },
  {
    id: 'nb-23',
    code: 'NB-23',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Đèn phóng điện (đèn huỳnh quang) được phát minh và bắt đầu phát triển từ năm nào?',
    options: ['Năm 1879', 'Năm 1934', 'Năm 1986', 'Năm 2006'],
    correctIndex: 1,
    explanation: 'Đèn huỳnh quang (phóng điện) phát triển vào mốc năm 1934.'
  },
  {
    id: 'nb-24',
    code: 'NB-24',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Công nghệ đèn LED chiếu sáng hiện đại bắt đầu bùng nổ và ứng dụng rộng rãi từ mốc năm nào?',
    options: ['Năm 1879', 'Năm 1934', 'Năm 1975', 'Năm 2006'],
    correctIndex: 3,
    explanation: 'Theo dòng thời gian công nghệ điện - quang trong SGK: Đèn LED đánh dấu bước phát triển vượt bậc năm 2006.'
  },
  {
    id: 'nb-25',
    code: 'NB-25',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Rơ le điện (Relay) được sáng chế bởi nhà khoa học Joseph Henry vào năm nào?',
    options: ['Năm 1835', 'Năm 1879', 'Năm 1934', 'Năm 2000'],
    correctIndex: 0,
    explanation: 'Theo mục thông tin bổ sung: Rơ le được sáng chế vào năm 1835 bởi nhà khoa học người Mỹ Joseph Henry.'
  },
  {
    id: 'nb-26',
    code: 'NB-26',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Thiết bị nào sau đây là công tắc điện sử dụng nguồn điện áp thấp để điều khiển mạch điện áp cao?',
    options: ['Động cơ điện xoay chiều', 'Máy phát điện xoay chiều', 'Rơ le (Relay)', 'Bóng đèn huỳnh quang'],
    correctIndex: 2,
    explanation: 'Rơ le là một công tắc điện sử dụng nguồn điện áp thấp để điều khiển mạch điện áp cao nhằm mục đích tự động hóa.'
  },
  {
    id: 'nb-27',
    code: 'NB-27',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Theo dạng chuyển động đầu ra, công nghệ biến đổi năng lượng điện - cơ được chia thành 2 nhóm là:',
    options: [
      'Dạng quay và dạng tịnh tiến',
      'Dạng lắc và dạng rung',
      'Dạng sóng và dạng xung',
      'Dạng xoay chiều và một chiều'
    ],
    correctIndex: 0,
    explanation: 'Công nghệ biến đổi điện - cơ chia thành 2 nhóm: Dạng quay (động cơ điện) và Dạng tịnh tiến (van điện từ, rơ le).'
  },
  {
    id: 'nb-28',
    code: 'NB-28',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Thiết bị điện nào sau đây thuộc nhóm công nghệ điện - cơ dạng quay?',
    options: ['Quạt điện', 'Van điện từ', 'Rơ le điện', 'Bóng đèn huỳnh quang'],
    correctIndex: 0,
    explanation: 'Quạt điện biến đổi điện năng thành cơ năng chuyển động quay của trục và cánh quạt.'
  },
  {
    id: 'nb-29',
    code: 'NB-29',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Thiết bị điện nào sau đây thuộc nhóm công nghệ điện - cơ dạng tịnh tiến?',
    options: ['Máy sấy tóc', 'Máy xay sinh tố', 'Van điện từ', 'Máy bơm nước'],
    correctIndex: 2,
    explanation: 'Van điện từ (solenoid valve) và rơ le thuộc nhóm điện - cơ chuyển động tịnh tiến.'
  },
  {
    id: 'nb-30',
    code: 'NB-30',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Các công nghệ truyền thông không dây phổ biến hiện nay bao gồm:',
    options: [
      'Wi-Fi, Bluetooth, mạng di động',
      'Cáp đồng trục, cáp quang',
      'Đường dây điện thoại bàn',
      'Cáp mạng LAN xoắn đôi'
    ],
    correctIndex: 0,
    explanation: 'Truyền thông không dây bao gồm: công nghệ Wi-Fi, Bluetooth và mạng di động (3G, 4G, 5G,...).'
  },
  {
    id: 'nb-31',
    code: 'NB-31',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Kĩ sư luyện kim là người tốt nghiệp đại học chuyên ngành gì?',
    options: [
      'Kĩ thuật vật liệu kim loại',
      'Kĩ thuật điện lạnh',
      'Kĩ thuật hóa mỹ phẩm',
      'Kĩ thuật lâm sinh'
    ],
    correctIndex: 0,
    explanation: 'Kĩ sư luyện kim tốt nghiệp trường đại học kĩ thuật ngành Kĩ thuật vật liệu kim loại.'
  },
  {
    id: 'nb-32',
    code: 'NB-32',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Phương pháp gia công nào cho phép chế tạo chi tiết có độ chính xác và độ nhẵn bóng bề mặt cao nhất?',
    options: ['Đúc khuôn cát thô', 'Gia công cắt gọt', 'Rèn tự do', 'Hàn tay'],
    correctIndex: 1,
    explanation: 'Gia công cắt gọt (tiện, phay, mài,...) giúp chi tiết máy đạt kích thước chính xác và độ nhẵn bóng bề mặt cao.'
  },
  {
    id: 'nb-33',
    code: 'NB-33',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Phương pháp nào sau đây làm cho phôi kim loại đi qua khe hở giữa hai trục quay ngược chiều nhau?',
    options: ['Kéo kim loại', 'Cán kim loại', 'Rèn khuôn', 'Dập vuốt'],
    correctIndex: 1,
    explanation: 'Cán là cho phôi đi qua khe hở giữa hai trục cán quay ngược chiều nhau, làm giảm chiều dày và tăng chiều dài của phôi.'
  },
  {
    id: 'nb-34',
    code: 'NB-34',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Phương pháp làm phôi kéo dài đi qua lỗ khuôn để tạo sản phẩm dạng thỏi hoặc ống có chiều dài tùy ý là:',
    options: ['Cán kim loại', 'Kéo kim loại', 'Gia công phay', 'Đúc áp lực'],
    correctIndex: 1,
    explanation: 'Kéo kim loại là sự kéo dài phôi qua lỗ khuôn kéo để chế tạo sản phẩm thỏi, dây, ống có chiều dài liên tục.'
  },
  {
    id: 'nb-35',
    code: 'NB-35',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Công nghệ điều khiển và tự động hóa có vai trò chính là gì trong các nhà máy hiện đại?',
    options: [
      'Thay thế hoàn toàn kim loại bằng gỗ',
      'Thay thế thao tác con người bằng máy móc, robot giúp tăng năng suất và giảm chi phí',
      'Chỉ dùng để trang trí nhà xưởng',
      'Tạo ra nguồn quặng kim loại mới'
    ],
    correctIndex: 1,
    explanation: 'Điều khiển và tự động hóa giúp thay thế các thao tác con người bằng máy móc, robot tự động, nâng cao năng suất và chất lượng.'
  },
  {
    id: 'nb-36',
    code: 'NB-36',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Công nghệ truyền thông không dây truyền tải thông tin dựa vào môi trường nào?',
    options: [
      'Dây cáp quang',
      'Dây cáp kim loại',
      'Sóng điện từ trong không gian',
      'Đường ống dẫn nước áp lực'
    ],
    correctIndex: 2,
    explanation: 'Truyền thông không dây sử dụng sóng điện từ lan truyền trong không gian để truyền tải thông tin mà không cần dây dẫn.'
  },
  {
    id: 'nb-37',
    code: 'NB-37',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Chữ viết tắt LED bắt nguồn từ thuật ngữ tiếng Anh nào?',
    options: [
      'Light Emitting Diode',
      'Low Energy Device',
      'Laser Electron Detector',
      'Linear Electric Drive'
    ],
    correctIndex: 0,
    explanation: 'LED viết tắt từ "Light Emitting Diode" (Diode phát quang).'
  },
  {
    id: 'nb-38',
    code: 'NB-38',
    level: 'biet',
    topic: 'Luyện kim, cơ khí',
    question: 'Trong máy tiện kim loại, chuyển động quay tròn của phôi gọi là:',
    options: ['Chuyển động chính (cắt gọt)', 'Chuyển động tịnh tiến phụ', 'Chuyển động tiến dao', 'Chuyển động nâng hạ'],
    correctIndex: 0,
    explanation: 'Trong tiện, chuyển động quay tròn của phôi là chuyển động cắt chính, dao chuyển động tịnh tiến tạo phoi.'
  },
  {
    id: 'nb-39',
    code: 'NB-39',
    level: 'biet',
    topic: 'Điện - điện tử',
    question: 'Công nghệ truyền tải và phân phối điện năng có chức năng gì?',
    options: [
      'Đưa điện năng từ nhà máy sản xuất điện đến nơi tiêu thụ của người sử dụng',
      'Tạo ra dòng điện từ nước',
      'Nấu chảy kim loại',
      'Chế tạo các linh kiện rơ le'
    ],
    correctIndex: 0,
    explanation: 'Để phân phối điện năng từ nhà máy sản xuất đến nơi tiêu thụ, người ta dùng công nghệ truyền tải và phân phối điện năng.'
  },
  {
    id: 'nb-40',
    code: 'NB-40',
    level: 'biet',
    topic: 'Nghề nghiệp & Đời sống',
    question: 'Người làm nghề đúc kim loại thường tốt nghiệp bậc học nào ngành công nghệ đúc kim loại?',
    options: [
      'Sơ cấp, trung cấp hoặc cao đẳng nghề',
      'Bác sĩ đa khoa',
      'Thạc sĩ nông nghiệp',
      'Cử nhân sư phạm văn'
    ],
    correctIndex: 0,
    explanation: 'Người làm nghề đúc kim loại tốt nghiệp cao đẳng hoặc trung cấp ngành công nghệ đúc kim loại.'
  },

  // ==========================================
  // II. THÔNG HIỂU: 30 CÂU (TH-01 ĐẾN TH-30)
  // ==========================================
  {
    id: 'th-01',
    code: 'TH-01',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Công nghệ thứ nhất trong lĩnh vực điện – điện tử được đề cập trong bài học là:',
    options: [
      'Công nghệ sản xuất điện năng',
      'Công nghệ điện – quang',
      'Công nghệ điện – cơ',
      'Công nghệ điều khiển và tự động hóa'
    ],
    correctIndex: 0,
    explanation: 'Thứ tự trong SGK: 1. Công nghệ sản xuất điện năng, 2. Điện – quang, 3. Điện – cơ, 4. Điều khiển và tự động hóa, 5. Truyền thông không dây.'
  },
  {
    id: 'th-02',
    code: 'TH-02',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Công nghệ thứ hai trong lĩnh vực điện – điện tử được đề cập trong bài học là:',
    options: [
      'Công nghệ điện – quang',
      'Công nghệ điện – cơ',
      'Công nghệ điều khiển và tự động hóa',
      'Công nghệ truyền thông không dây'
    ],
    correctIndex: 0,
    explanation: 'Công nghệ thứ 2 trong mục II là công nghệ điện - quang.'
  },
  {
    id: 'th-03',
    code: 'TH-03',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Công nghệ thứ ba trong lĩnh vực điện – điện tử được đề cập trong bài học là:',
    options: [
      'Công nghệ sản xuất điện năng',
      'Công nghệ điện – cơ',
      'Công nghệ điện – quang',
      'Công nghệ truyền thông không dây'
    ],
    correctIndex: 1,
    explanation: 'Công nghệ thứ 3 trong mục II là công nghệ điện - cơ.'
  },
  {
    id: 'th-04',
    code: 'TH-04',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Công nghệ thứ tư trong lĩnh vực điện – điện tử được đề cập trong bài học là:',
    options: [
      'Công nghệ sản xuất điện năng',
      'Công nghệ điều khiển và tự động hóa',
      'Công nghệ điện – quang',
      'Công nghệ điện – cơ'
    ],
    correctIndex: 1,
    explanation: 'Công nghệ thứ 4 trong mục II là công nghệ điều khiển và tự động hóa.'
  },
  {
    id: 'th-05',
    code: 'TH-05',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Công nghệ thứ năm trong lĩnh vực điện – điện tử được đề cập trong bài học là:',
    options: [
      'Công nghệ điện – cơ',
      'Công nghệ điện – quang',
      'Công nghệ truyền thông không dây',
      'Công nghệ gia công cắt gọt'
    ],
    correctIndex: 2,
    explanation: 'Công nghệ thứ 5 trong mục II là công nghệ truyền thông không dây.'
  },
  {
    id: 'th-06',
    code: 'TH-06',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Công nghệ đầu tiên trong lĩnh vực luyện kim, cơ khí được đề cập trong bài học là:',
    options: [
      'Công nghệ luyện kim',
      'Công nghệ đúc',
      'Công nghệ gia công cắt gọt',
      'Công nghệ hàn'
    ],
    correctIndex: 0,
    explanation: 'Thứ tự trong SGK: 1. Công nghệ luyện kim, 2. Đúc, 3. Gia công cắt gọt, 4. Gia công áp lực, 5. Hàn.'
  },
  {
    id: 'th-07',
    code: 'TH-07',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Công nghệ thứ hai trong lĩnh vực luyện kim, cơ khí được đề cập trong bài học là:',
    options: [
      'Công nghệ đúc kim loại',
      'Công nghệ luyện kim',
      'Công nghệ gia công cắt gọt',
      'Công nghệ gia công áp lực'
    ],
    correctIndex: 0,
    explanation: 'Công nghệ thứ 2 trong lĩnh vực cơ khí luyện kim là công nghệ đúc.'
  },
  {
    id: 'th-08',
    code: 'TH-08',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Công nghệ thứ ba trong lĩnh vực luyện kim, cơ khí được đề cập trong bài học là:',
    options: [
      'Công nghệ gia công áp lực',
      'Công nghệ đúc',
      'Công nghệ luyện kim',
      'Công nghệ gia công cắt gọt'
    ],
    correctIndex: 3,
    explanation: 'Công nghệ thứ 3 là công nghệ gia công cắt gọt.'
  },
  {
    id: 'th-09',
    code: 'TH-09',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Công nghệ thứ tư trong lĩnh vực luyện kim, cơ khí được đề cập trong bài học là:',
    options: [
      'Công nghệ gia công áp lực',
      'Công nghệ hàn',
      'Công nghệ đúc',
      'Công nghệ luyện kim'
    ],
    correctIndex: 0,
    explanation: 'Công nghệ thứ 4 là công nghệ gia công áp lực (cán, kéo, rèn, dập).'
  },
  {
    id: 'th-10',
    code: 'TH-10',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Công nghệ thứ năm trong lĩnh vực luyện kim, cơ khí được đề cập trong bài học là:',
    options: [
      'Công nghệ hàn',
      'Công nghệ đúc',
      'Công nghệ tiện phay',
      'Công nghệ cán kéo'
    ],
    correctIndex: 0,
    explanation: 'Công nghệ thứ 5 trong mục I là công nghệ hàn kim loại.'
  },
  {
    id: 'th-11',
    code: 'TH-11',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Vì sao sau khi đúc kim loại, nhiều sản phẩm vẫn cần trải qua gia công cắt gọt?',
    options: [
      'Để tăng trọng lượng cho sản phẩm',
      'Để nâng cao độ chính xác kích thước và độ bóng bề mặt của chi tiết',
      'Để làm biến dạng nguội kim loại',
      'Để sản phẩm có thể dẫn điện tốt hơn'
    ],
    correctIndex: 1,
    explanation: 'Sản phẩm đúc thô gọi là phôi đúc, cần gia công cắt gọt để đạt độ chính xác cao và độ nhẵn bóng theo bản vẽ thiết kế.'
  },
  {
    id: 'th-12',
    code: 'TH-12',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Điểm khác biệt cốt lõi giữa "Gia công cắt gọt" và "Gia công áp lực" là gì?',
    options: [
      'Cắt gọt sinh ra phoi thừa bỏ đi, còn gia công áp lực tận dụng tính dẻo biến dạng không sinh phoi',
      'Cắt gọt dùng kim loại lỏng, gia công áp lực dùng kim loại rắn',
      'Cắt gọt chỉ làm được với nhôm, gia công áp lực chỉ làm được với sắt',
      'Gia công áp lực không dùng đến máy móc'
    ],
    correctIndex: 0,
    explanation: 'Gia công cắt gọt lấy đi phần kim loại thừa dưới dạng phoi; còn gia công áp lực dùng lực biến dạng dẻo kim loại thành hình dáng mong muốn mà không tách bỏ phoi.'
  },
  {
    id: 'th-13',
    code: 'TH-13',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Vì sao đèn LED tiết kiệm điện năng hơn rất nhiều so với đèn sợi đốt?',
    options: [
      'Vì đèn LED đốt cháy khí trơ phát quang',
      'Vì đèn LED chuyển hóa trực tiếp điện năng thành quang năng qua diode mà không sinh nhiều nhiệt lượng dư thừa',
      'Vì đèn LED sử dụng dòng điện áp siêu cao',
      'Vì đèn LED có vỏ bằng thủy tinh dày hơn'
    ],
    correctIndex: 1,
    explanation: 'Đèn sợi đốt nung nóng dây tóc phát sáng nên 90-95% năng lượng tỏa nhiệt; đèn LED chuyển trực tiếp điện năng thành quang năng qua chất bán dẫn nên hiệu suất rất cao.'
  },
  {
    id: 'th-14',
    code: 'TH-14',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Trong phương pháp đúc ly tâm, lực ly tâm có tác dụng gì đối với kim loại lỏng?',
    options: [
      'Làm kim loại bay hơi nhanh hơn',
      'Đẩy kim loại lỏng ép chặt vào thành khuôn quay tròn giúp tạo sản phẩm rỗng ruột đồng đều (như ống đúc)',
      'Làm nguội kim loại tức thì',
      'Ngăn không cho kim loại kết tinh'
    ],
    correctIndex: 1,
    explanation: 'Đúc ly tâm rót kim loại lỏng vào khuôn đang quay nhanh, lực ly tâm ép kim loại lỏng ra thành ngoài tạo thành vật đúc dạng ống rỗng ruột sít chặt.'
  },
  {
    id: 'th-15',
    code: 'TH-15',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Phân biệt giữa hàn nóng chảy và hàn áp lực:',
    options: [
      'Hàn nóng chảy nung mép kim loại đến chảy lỏng hoàn toàn; hàn áp lực nung dẻo rồi dùng ngoại lực ép dính',
      'Hàn nóng chảy không cần que hàn, hàn áp lực luôn dùng que hàn',
      'Hàn nóng chảy chỉ dùng cho gỗ, hàn áp lực dùng cho sắt thép',
      'Hàn nóng chảy làm lạnh bằng nước, hàn áp lực làm nóng bằng lò sưởi'
    ],
    correctIndex: 0,
    explanation: 'Hàn nóng chảy nung chỗ hàn đến trạng thái lỏng; còn hàn áp lực nung nóng đến trạng thái dẻo rồi dùng ngoại lực ép lại.'
  },
  {
    id: 'th-16',
    code: 'TH-16',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Nguyên lý cơ bản biến đổi điện năng thành cơ năng trong động cơ điện dựa trên:',
    options: [
      'Hiện tượng tán sắc ánh sáng',
      'Hiện tượng cảm ứng điện từ (tương tác giữa từ trường của stato và dòng điện trong roto)',
      'Hiện tượng ma sát tĩnh điện',
      'Hiện tượng phân rã hạt nhân'
    ],
    correctIndex: 1,
    explanation: 'Động cơ điện hoạt động dựa trên hiện tượng cảm ứng điện từ, khi dòng điện qua cuộn dây đặt trong từ trường sẽ sinh ra lực từ làm roto quay.'
  },
  {
    id: 'th-17',
    code: 'TH-17',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Máy sấy tóc thuộc loại thiết bị điện - cơ nào?',
    options: [
      'Thiết bị điện - cơ dạng tịnh tiến',
      'Thiết bị điện - cơ dạng quay (động cơ điện quay cánh quạt thổi gió qua cuộn dây nhiệt)',
      'Thiết bị điện - quang thuần túy',
      'Thiết bị truyền thông không dây'
    ],
    correctIndex: 1,
    explanation: 'Máy sấy tóc gồm một động cơ điện quay gắn cánh quạt hút và đẩy luồng không khí qua sợi đốt.'
  },
  {
    id: 'th-18',
    code: 'TH-18',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Tại sao van điện từ (solenoid) lại được xếp vào nhóm điện - cơ dạng tịnh tiến?',
    options: [
      'Vì van chuyển động xoay tròn liên tục 360 độ',
      'Vì khi có điện, cuộn dây tạo từ trường hút lõi thép di chuyển dọc trục tịnh tiến để đóng/mở cửa van',
      'Vì van phát ra ánh sáng huỳnh quang',
      'Vì van truyền sóng Wi-Fi'
    ],
    correctIndex: 1,
    explanation: 'Lực từ trường tác dụng kéo hoặc đẩy lõi van chuyển động thẳng tới lui (tịnh tiến) để đóng hoặc mở đường dẫn chất lỏng/khí.'
  },
  {
    id: 'th-19',
    code: 'TH-19',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Nhà máy thủy điện biến đổi năng lượng theo chu trình nào?',
    options: [
      'Nhiệt năng của than -> cơ năng -> điện năng',
      'Thế năng (và động năng) của dòng nước chảy -> cơ năng quay tua-bin -> máy phát điện tạo điện năng',
      'Năng lượng ánh sáng -> pin quang điện -> điện năng',
      'Năng lượng gió -> điện phân nước -> điện năng'
    ],
    correctIndex: 1,
    explanation: 'Nước từ hồ chứa trên cao chảy xuống làm quay tuabin nước, tuabin kéo máy phát điện quay sinh ra dòng điện.'
  },
  {
    id: 'th-20',
    code: 'TH-20',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Công nghệ hàn hồ quang MAG (Metal Active Gas) là công nghệ hàn trong môi trường khí gì?',
    options: [
      'Khí bảo vệ hoạt tính (thường là CO2 hoặc trộn Ar + CO2)',
      'Khí oxi nguyên chất',
      'Khí hidro cháy',
      'Khí heli không màu'
    ],
    correctIndex: 0,
    explanation: 'MAG là hàn hồ quang kim loại trong môi trường khí bảo vệ hoạt tính (Active Gas), phổ biến nhất là khí CO2 để bảo vệ mối hàn khỏi oxi hóa.'
  },
  {
    id: 'th-21',
    code: 'TH-21',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Điểm khác biệt giữa cán nóng và cán nguội trong công nghệ cán kim loại là:',
    options: [
      'Cán nóng thực hiện khi kim loại được nung trên nhiệt độ kết tinh lại, cán nguội thực hiện ở nhiệt độ phòng',
      'Cán nóng chỉ làm việc với nhôm, cán nguội chỉ làm việc với vàng',
      'Cán nóng không dùng trục quay, cán nguội dùng 4 trục',
      'Cán nguội làm kim loại chảy thành nước'
    ],
    correctIndex: 0,
    explanation: 'Cán nóng biến dạng kim loại ở nhiệt độ cao (giảm lực cán), cán nguội thực hiện ở nhiệt độ thấp cho độ chính xác và bề mặt sáng bóng.'
  },
  {
    id: 'th-22',
    code: 'TH-22',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Nguyên lý phát sáng của đèn huỳnh quang (phóng điện) là gì?',
    options: [
      'Đốt nóng sợi vonfram đến nhiệt độ phát quang',
      'Phóng điện giữa 2 điện cực trong hơi thủy ngân tạo tia tử ngoại, kích thích lớp bột huỳnh quang phát ra ánh sáng nhìn thấy',
      'Dòng điện đi qua lớp bán dẫn p-n',
      'Phản ứng cháy của phốt pho với không khí'
    ],
    correctIndex: 1,
    explanation: 'Khi điện áp đặt vào hai cực, phóng điện xảy ra tạo tia tử ngoại tác dụng vào lớp bột huỳnh quang phủ trong ống thủy tinh phát ra ánh sáng.'
  },
  {
    id: 'th-23',
    code: 'TH-23',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Trong các công nghệ sau, công nghệ nào tạo ra phế phẩm dưới dạng "bavia" hoặc "phoi cắt"?',
    options: [
      'Gia công cắt gọt kim loại',
      'Công nghệ truyền tải điện',
      'Công nghệ sản xuất điện gió',
      'Công nghệ chiếu sáng LED'
    ],
    correctIndex: 0,
    explanation: 'Gia công cắt gọt bóc tách lớp vật liệu thừa trên phôi kim loại tạo thành các phoi cắt (phoi vụn, phoi dây,...).'
  },
  {
    id: 'th-24',
    code: 'TH-24',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Sự khác nhau về phạm vi truyền sóng giữa Bluetooth và Wi-Fi là:',
    options: [
      'Bluetooth truyền khoảng cách ngắn (thường dưới 10m - 15m), Wi-Fi phủ sóng rộng hơn (vài chục đến hàng trăm mét) và tốc độ cao hơn',
      'Bluetooth truyền hàng nghìn kilomet, Wi-Fi chỉ truyền trong phòng ngủ',
      'Bluetooth dùng dây cáp quang, Wi-Fi dùng vệ tinh',
      'Bluetooth không dùng sóng vô tuyến'
    ],
    correctIndex: 0,
    explanation: 'Bluetooth thiết kế kết nối các thiết bị cá nhân ở khoảng cách gần, Wi-Fi dùng mạng cục bộ không dây phạm vi rộng hơn và lưu lượng lớn.'
  },
  {
    id: 'th-25',
    code: 'TH-25',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Tại sao việc tự động hóa dây chuyền lắp ráp ô tô bằng robot lại mang lại hiệu quả vượt trội?',
    options: [
      'Robot làm việc liên tục, độ chuẩn xác đồng đều cao, đảm bảo an toàn trong môi trường độc hại nặng nhọc',
      'Robot không cần cung cấp điện năng khi vận hành',
      'Robot tự sinh ra sắt thép để làm vỏ xe',
      'Robot chỉ có thể sơn màu trắng'
    ],
    correctIndex: 0,
    explanation: 'Dây chuyền tự động hóa giúp các thao tác con người được thay thế bằng cánh tay robot, tăng năng suất, giảm chi phí nhân công và an toàn tuyệt đối.'
  },
  {
    id: 'th-26',
    code: 'TH-26',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Hình thức "Rèn" trong gia công áp lực được chia thành 2 hình thức chính là:',
    options: [
      'Rèn tự do và rèn khuôn (dập thể tích)',
      'Rèn nóng và rèn bằng laser',
      'Rèn bằng tay và rèn trong nước',
      'Rèn điện và rèn hóa'
    ],
    correctIndex: 0,
    explanation: 'Rèn chia thành rèn tự do (biến dạng không bị hạn chế bởi lòng khuôn) và rèn khuôn (dập trong lòng khuôn định hình sẵn).'
  },
  {
    id: 'th-27',
    code: 'TH-27',
    level: 'hieu',
    topic: 'Điện - điện tử',
    question: 'Công nghệ truyền tải điện năng đi xa dùng điện áp rất cao (đường dây cao thế 500kV, 220kV) nhằm mục đích chính là:',
    options: [
      'Giảm hao phí do tỏa nhiệt trên đường dây truyền tải điện',
      'Làm dây điện phát sáng ban đêm',
      'Tăng điện trở của dây dẫn',
      'Làm giảm tốc độ lan truyền của dòng điện'
    ],
    correctIndex: 0,
    explanation: 'Hao phí trên đường dây tỉ lệ nghịch với bình phương hiệu điện thế (P_hp = R * P^2 / U^2). Nâng U lên cao sẽ giảm hao phí truyền tải rất nhiều.'
  },
  {
    id: 'th-28',
    code: 'TH-28',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Hạn chế lớn nhất của công nghệ đúc trong khuôn cát là gì so với đúc trong khuôn kim loại?',
    options: [
      'Độ bóng bề mặt và độ chính xác kích thước thấp hơn, khuôn chỉ dùng được 1 lần (phải phá vỡ sau đúc)',
      'Không thể đúc các chi tiết lớn',
      'Nhiệt độ nóng chảy của cát quá thấp',
      'Chi phí cát đắt hơn kim loại'
    ],
    correctIndex: 0,
    explanation: 'Đúc khuôn cát có ưu điểm đúc được chi tiết lớn phức tạp nhưng bề mặt thô nhám, độ chính xác không cao và khuôn bị phá hủy sau khi lấy vật đúc.'
  },
  {
    id: 'th-29',
    code: 'TH-29',
    level: 'hieu',
    topic: 'Luyện kim, cơ khí',
    question: 'Trong các sản phẩm sau, sản phẩm nào được chế tạo trực tiếp bằng công nghệ hàn?',
    options: [
      'Cổng sắt hoa văn, giàn giáo xây dựng, khung nhà thép tiền chế',
      'Thanh ray đường sắt đúc nguyên khối',
      'Lưỡi cưa gỗ dập nổi',
      'Bóng đèn compact'
    ],
    correctIndex: 0,
    explanation: 'Cổng sắt hoa văn, bàn ghế sắt, giàn giáo xây dựng, khung thép nhà máy được liên kết chắc chắn bằng công nghệ hàn.'
  },
  {
    id: 'th-30',
    code: 'TH-30',
    level: 'hieu',
    topic: 'Nghề nghiệp & Đời sống',
    question: 'Kĩ sư mạng máy tính và truyền thông dữ liệu đảm nhận công việc chính nào?',
    options: [
      'Nghiên cứu nguyên lí mạng, thiết kế, xây dựng và quản trị hệ thống mạng từ nội bộ đến diện rộng',
      'Nấu quặng sắt trong lò cao',
      'Hàn ống nước ngầm bằng khí MAG',
      'Tiện ren ốc trên máy tiện cơ khí'
    ],
    correctIndex: 0,
    explanation: 'Kĩ sư mạng máy tính thiết kế, xây dựng và vận hành hệ thống mạng máy tính từ mạng nội bộ (LAN) đến mạng diện rộng (WAN, Internet).'
  },

  // ==========================================
  // III. VẬN DỤNG: 30 CÂU (VD-01 ĐẾN VD-30)
  // ==========================================
  {
    id: 'vd-01',
    code: 'VD-01',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Để lắp đặt hệ thống đèn chiếu sáng cho một trường học nhằm tối ưu hóa chi phí tiền điện lâu dài và bảo vệ thị lực cho học sinh, loại đèn nào là lựa chọn tốt nhất?',
    options: [
      'Đèn LED hiện đại',
      'Đèn sợi đốt Edison',
      'Đèn dầu hỏa',
      'Đèn khí cacbon'
    ],
    correctIndex: 0,
    explanation: 'Đèn LED tiết kiệm tới 60-80% điện năng so với sợi đốt, phát sáng êm dịu, không nhấp nháy tần số thấp, tuổi thọ bền bỉ từ 30.000 đến 50.000 giờ.'
  },
  {
    id: 'vd-02',
    code: 'VD-02',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Để sản xuất hàng loạt thân động cơ xe máy hoặc vỏ hộp số ô tô có hình dạng rỗng và gân gia cường phức tạp, người ta ưu tiên sử dụng công nghệ nào đầu tiên để tạo phôi?',
    options: [
      'Công nghệ đúc kim loại (đúc áp lực hoặc đúc khuôn kim loại)',
      'Công nghệ hàn que',
      'Công nghệ kéo sợi',
      'Công nghệ rèn tự do bằng tay'
    ],
    correctIndex: 0,
    explanation: 'Công nghệ đúc kim loại (đặc biệt đúc áp lực khuôn kim loại) là lựa chọn tối ưu để tạo các chi tiết phức tạp như vỏ máy, lốc động cơ.'
  },
  {
    id: 'vd-03',
    code: 'VD-03',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Để gia công trục tròn xoay của một máy bơm nước đạt độ tròn và độ bóng bề mặt cao, thợ cơ khí sẽ sử dụng phương pháp gia công cắt gọt nào?',
    options: [
      'Công nghệ tiện kết hợp mài tinh',
      'Công nghệ hàn nóng chảy',
      'Công nghệ rèn tự do',
      'Công nghệ đúc khuôn cát'
    ],
    correctIndex: 0,
    explanation: 'Chi tiết tròn xoay (như trục máy, bu lông) được gia công chủ yếu trên máy tiện, sau đó mài bóng để đạt độ chính xác bề mặt cao.'
  },
  {
    id: 'vd-04',
    code: 'VD-04',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Để sản xuất dây điện bằng đồng có đường kính nhỏ 1mm và chiều dài hàng trăm mét từ thanh phôi đồng lớn, xí nghiệp phải ứng dụng công nghệ gia công áp lực nào?',
    options: [
      'Công nghệ kéo kim loại qua lỗ khuôn',
      'Công nghệ hàn hồ quang',
      'Công nghệ phay rãnh xoắn',
      'Công nghệ đúc ly tâm'
    ],
    correctIndex: 0,
    explanation: 'Kéo kim loại là sự kéo dài phôi qua chuỗi lỗ khuôn có đường kính nhỏ dần để tạo ra dây kim loại có tiết diện nhỏ và chiều dài không hạn chế.'
  },
  {
    id: 'vd-05',
    code: 'VD-05',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Tại sao trong các nhà xưởng cơ khí hiện đại, người ta thường dùng máy hàn MAG có khí CO2 bảo vệ thay cho que hàn thuốc bọc truyền thống khi hàn kết cấu dày?',
    options: [
      'Mối hàn sạch, ít xỉ, tốc độ hàn nhanh, độ ngấu sâu và năng suất cao hơn hẳn',
      'Hàn MAG không cần nguồn điện',
      'Hàn MAG làm kim loại hóa lỏng ở nhiệt độ âm',
      'Hàn MAG không tạo ra bất kì bức xạ ánh sáng nào'
    ],
    correctIndex: 0,
    explanation: 'Hàn MAG trong môi trường khí bảo vệ CO2 cấp dây hàn tự động liên tục, tốc độ hàn cao, mối hàn đẹp, ngấu tốt và ít bám xỉ.'
  },
  {
    id: 'vd-06',
    code: 'VD-06',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Trong hệ thống bơm nước tự động của gia đình lên bồn nước trên cao, thiết bị điện - cơ nào vừa đóng vai trò cảm ứng ngắt mạch điện khi bồn đầy nước?',
    options: [
      'Rơ le phao điện (Relay điện từ kết hợp phao ngắt)',
      'Đèn LED tín hiệu',
      'Bóng đèn sợi đốt',
      'Khối nam châm vĩnh cửu'
    ],
    correctIndex: 0,
    explanation: 'Rơ le điện từ kết hợp với phao đóng/ngắt mạch điều khiển điện áp an toàn để bật/tắt máy bơm tự động.'
  },
  {
    id: 'vd-07',
    code: 'VD-07',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Một học sinh muốn nghe nhạc từ điện thoại thông minh sang tai nghe không dây khi đang chạy bộ thể dục. Công nghệ truyền thông không dây phù hợp nhất được tích hợp là:',
    options: [
      'Công nghệ Bluetooth',
      'Công nghệ cáp truyền hình',
      'Công nghệ mạng cáp quang FTTH',
      'Công nghệ phát sóng vô tuyến AM công suất lớn'
    ],
    correctIndex: 0,
    explanation: 'Bluetooth tiêu tốn ít năng lượng, truyền âm thanh ổn định trong khoảng cách ngắn vài mét, rất thích hợp cho tai nghe cá nhân.'
  },
  {
    id: 'vd-08',
    code: 'VD-08',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Để chế tạo tôn lợp nhà mạ kẽm có độ dày mỏng đều 0.4mm từ phôi thép tấm dày, nhà máy thép cần thực hiện qua quy trình gia công áp lực nào?',
    options: [
      'Cán nóng rồi cán nguội qua các trục cán',
      'Rèn khuôn bằng búa máy',
      'Đúc áp lực trong khuôn mẫu chảy',
      'Hàn điện tiếp xúc'
    ],
    correctIndex: 0,
    explanation: 'Công nghệ cán thép cho phôi đi qua các cặp trục quay ngược chiều nén phôi mỏng dần đến kích thước yêu cầu (tấm lá mỏng).'
  },
  {
    id: 'vd-09',
    code: 'VD-09',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Quan sát các thiết bị gia dụng: (1) Quạt bàn, (2) Máy sấy tóc, (3) Rơ le ngắt nhiệt ấm siêu tốc, (4) Van xả nước tự động của máy giặt. Các thiết bị thuộc nhóm điện - cơ dạng tịnh tiến là:',
    options: [
      '(3) và (4)',
      '(1) và (2)',
      '(1) và (3)',
      '(2) và (4)'
    ],
    correctIndex: 0,
    explanation: 'Quạt bàn và máy sấy tóc là động cơ quay (dạng quay); còn rơ le ngắt nhiệt và van điện từ xả nước chuyển động tịnh tiến lõi sắt (dạng tịnh tiến).'
  },
  {
    id: 'vd-10',
    code: 'VD-10',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Khi xây dựng một nhà máy nhiệt điện đốt than, để giảm thiểu ô nhiễm khói bụi và khí độc theo quy chuẩn bảo vệ môi trường, giải pháp kĩ thuật bắt buộc là:',
    options: [
      'Lắp đặt hệ thống lọc bụi tĩnh điện và tháp xử lý khử khí SO2, NOx trước khi thải ra ống khói',
      'Chôn than trực tiếp xuống lòng đất',
      'Thay nước làm mát bằng dầu nhớt thải',
      'Không dùng ống khói mà xả trực tiếp vào nguồn nước'
    ],
    correctIndex: 0,
    explanation: 'Nhiệt điện đốt than sinh nhiều bụi và khí độc, cần trang bị lọc bụi tĩnh điện và tháp hấp phụ khí độc để bảo vệ môi trường sinh thái.'
  },
  {
    id: 'vd-11',
    code: 'VD-11',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Để tạo một chiếc cổng sắt nghệ thuật với các thanh uốn cong và hoa văn phức tạp ghép nối bền chặt, người thợ kết hợp những công nghệ nào?',
    options: [
      'Gia công áp lực (uốn rèn tạo hình hoa văn) và Công nghệ hàn (ghép nối cố định)',
      'Công nghệ đúc khuôn cát và mài phẳng',
      'Công nghệ kéo sợi và điện phân',
      'Công nghệ tiện trục và cán tấm'
    ],
    correctIndex: 0,
    explanation: 'Người thợ uốn nắn hoa văn sắt bằng gia công áp lực (uốn, dập rèn mỹ thuật) sau đó dùng công nghệ hàn để liên kết thành khung cổng vững chắc.'
  },
  {
    id: 'vd-12',
    code: 'VD-12',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Tại các vùng đồi núi có địa hình dốc và dòng sông có lưu lượng nước lớn quanh năm, phương thức sản xuất điện năng nào tận dụng tối đa điều kiện tự nhiên?',
    options: [
      'Công nghệ thủy điện',
      'Công nghệ nhiệt điện khí hóa lỏng',
      'Công nghệ điện hạt nhân',
      'Công nghệ nhiệt điện than'
    ],
    correctIndex: 0,
    explanation: 'Địa hình đồi núi dốc tạo cột nước cao và lưu lượng lớn, là điều kiện lý tưởng để xây dựng đập tích nước và nhà máy thủy điện.'
  },
  {
    id: 'vd-13',
    code: 'VD-13',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Ống dẫn dầu bằng gang hình trụ dài rỗng ruột với thành ống dày đều và không có đường hàn giáp mí thường được sản xuất bằng phương pháp đúc nào?',
    options: [
      'Công nghệ đúc ly tâm',
      'Công nghệ đúc mẫu sáp chảy',
      'Công nghệ rèn tay tự do',
      'Công nghệ hàn ghép tấm mỏng'
    ],
    correctIndex: 0,
    explanation: 'Đúc ly tâm là phương pháp chuyên dùng sản xuất các ống kim loại tròn rỗng (như ống nước, ống dẫn dầu gang) cho mật độ vật liệu sít chặt và không có mối hàn.'
  },
  {
    id: 'vd-14',
    code: 'VD-14',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Một nông trại trồng thanh long nghịch vụ cần thắp sáng ban đêm hàng nghìn bóng đèn. Tại sao chuyển đổi từ đèn sợi đốt sang đèn LED chuyên dụng giúp nhà nông tăng lợi nhuận?',
    options: [
      'Giảm hơn 70% tiền điện mỗi tháng, tuổi thọ bóng lâu năm ít hỏng hóc và bước sóng ánh sáng kích thích ra hoa tối ưu',
      'Đèn LED tạo ra nhiều nhiệt sưởi ấm quả thanh long chín nhanh hơn',
      'Đèn LED không cần dùng điện lưới',
      'Đèn LED phát ra tia phóng xạ diệt sâu bọ'
    ],
    correctIndex: 0,
    explanation: 'Đèn LED giúp tiết kiệm đáng kể chi phí tiền điện, bền hơn trước mưa gió ngoài đồng, hiệu quả kinh tế cao vượt trội so với đèn sợi đốt.'
  },
  {
    id: 'vd-15',
    code: 'VD-15',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Để cắt các tấm thép dày 50mm dùng làm thân tàu thủy với đường cắt hình học uốn lượn phức tạp một cách nhanh chóng, công nghệ gia công hiện đại nào thường được sử dụng?',
    options: [
      'Cắt bằng tia nước áp lực cao trộn hạt mài hoặc công nghệ cắt Plasma/Laser CNC',
      'Cưa tay bằng lưỡi cưa sắt',
      'Đục bằng búa và đục tay',
      'Khoan lỗ thủ công'
    ],
    correctIndex: 0,
    explanation: 'Cắt Plasma CNC, Laser công suất lớn hoặc tia nước áp lực cao cho phép cắt thép tấm dày chính xác theo biên dạng bản vẽ số hóa.'
  },
  {
    id: 'vd-16',
    code: 'VD-16',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Trong ô tô thông minh, cảm biến lùi phát hiện chướng ngại vật rồi truyền tín hiệu điều khiển kích hoạt hệ thống tự động phanh. Đây là ứng dụng tiêu biểu của:',
    options: [
      'Công nghệ điều khiển và tự động hóa',
      'Công nghệ luyện kim màu',
      'Công nghệ gia công áp lực',
      'Công nghệ đúc ly tâm'
    ],
    correctIndex: 0,
    explanation: 'Hệ thống phanh khẩn cấp tự động là một chuỗi điều khiển tự động hóa khép kín: Cảm biến -> Bộ vi xử lý -> Cơ cấu chấp hành phanh an toàn.'
  },
  {
    id: 'vd-17',
    code: 'VD-17',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Để nâng cao cơ tính (độ cứng, độ bền mài mòn) của một chiếc bánh răng thép sau khi đã gia công cắt gọt xong, quy trình xử lý nhiệt luyện tiếp theo là:',
    options: [
      'Nung nóng rồi tôi cứng bề mặt và ram tôi',
      'Ngâm bánh răng vào nước lạnh ngay từ đầu',
      'Cán mỏng bánh răng qua 2 trục quay',
      'Nấu chảy bánh răng đổ vào khuôn cát'
    ],
    correctIndex: 0,
    explanation: 'Sau khi gia công răng, bánh răng được nhiệt luyện (tôi cứng và ram) để bề mặt răng cứng chống mài mòn mà lõi vẫn dai chịu tải va đập.'
  },
  {
    id: 'vd-18',
    code: 'VD-18',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Tại sao mạng di động thế hệ mới 5G lại được xem là chìa khóa mở đường cho xe tự hành (xe không người lái) và phẫu thuật từ xa?',
    options: [
      'Tốc độ truyền dữ liệu siêu cao và độ trễ cực thấp (dưới 1ms), phản hồi tức thì theo thời gian thực',
      'Sóng 5G biến pin xe điện thành pin vĩnh cửu',
      '5G không cần trạm thu phát sóng trên mặt đất',
      '5G chỉ dùng được vào ban ngày'
    ],
    correctIndex: 0,
    explanation: 'Ưu thế then chốt của 5G là băng thông cực lớn và độ trễ phản hồi siêu thấp (ultra-low latency), giúp thiết bị ra quyết định tức thì, bảo đảm an toàn tính mạng.'
  },
  {
    id: 'vd-19',
    code: 'VD-19',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Dụng cụ nhà bếp nào sau đây thường được đúc nguyên khối từ gang vì tính giữ nhiệt lâu và chịu nhiệt cao?',
    options: [
      'Chảo gang, nồi kho tộ bằng gang',
      'Dao gọt hoa quả bằng sứ mỏng',
      'Bình thủy tinh chịu nhiệt',
      'Thìa nhựa ăn dặm'
    ],
    correctIndex: 0,
    explanation: 'Nồi chảo gang đúc có độ dày dặn, khả năng tích nhiệt và tỏa nhiệt đều, rất bền bỉ trong nấu nướng.'
  },
  {
    id: 'vd-20',
    code: 'VD-20',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Một học sinh thiết kế mô hình nhà thông minh có đèn tự động sáng khi trời tối. Học sinh đó cần phối hợp các công nghệ nào?',
    options: [
      'Cảm biến ánh sáng quang trở + Mạch điều khiển đóng ngắt + Đèn LED chiếu sáng',
      'Lò cao luyện thép + Tua bin gió',
      'Máy cán tôn + Máy tiện vạn năng',
      'Ống đúc ly tâm + Que hàn điện'
    ],
    correctIndex: 0,
    explanation: 'Hệ thống gồm cảm biến nhận biết quang năng, mạch tự động hóa xử lý tín hiệu và đèn chiếu sáng công nghệ LED.'
  },
  {
    id: 'vd-21',
    code: 'VD-21',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Tại một xưởng sản xuất bu-lông, đai ốc với số lượng hàng vạn chiếc mỗi ngày, người ta dùng phương pháp nào để tạo đầu bu-lông hình lục giác nhanh và tiết kiệm nguyên liệu nhất?',
    options: [
      'Công nghệ dập nguội (gia công áp lực)',
      'Tiện từng góc cạnh trên máy tiện thủ công',
      'Hàn 6 mảnh sắt nhỏ vào đầu que bu-lông',
      'Đục thủ công bằng búa'
    ],
    correctIndex: 0,
    explanation: 'Công nghệ dập đầu nguội (gia công áp lực) ép phôi thép thành đầu lục giác chỉ trong tích tắc, không sinh phoi vụn, năng suất hàng nghìn cái/giờ.'
  },
  {
    id: 'vd-22',
    code: 'VD-22',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Để đo lường hiệu quả năng lượng của bóng đèn trong thực tế, chỉ tiêu kĩ thuật nào thể hiện rõ nhất tỷ số giữa quang thông phát ra trên một đơn vị công suất điện tiêu thụ?',
    options: [
      'Hiệu suất phát quang (Lumen/Watt - lm/W)',
      'Khối lượng bóng đèn (gam)',
      'Điện trở cuộn dây (Ohm)',
      'Đường kính đui đèn (mm)'
    ],
    correctIndex: 0,
    explanation: 'Hiệu suất phát quang (lm/W) cho biết với 1 Watt điện năng tiêu thụ, đèn tạo ra được bao nhiêu quang thông ánh sáng. Đèn LED đạt hiệu suất lm/W cao nhất.'
  },
  {
    id: 'vd-23',
    code: 'VD-23',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Khi hàn nối hai tấm thép chịu lực của bồn chứa khí hóa lỏng áp lực cao, thợ hàn cần kiểm tra khuyết tật mối hàn bên trong bằng phương pháp không phá hủy nào?',
    options: [
      'Chiếu chụp tia X (chụp X-quang) hoặc siêu âm mối hàn',
      'Dùng búa đập vỡ xem bên trong',
      'Ngửi mùi khí xung quanh bồn',
      'Cân trọng lượng của cả bồn'
    ],
    correctIndex: 0,
    explanation: 'Kiểm tra không phá hủy (NDT) bằng sóng siêu âm hoặc chụp ảnh phóng xạ tia X giúp phát hiện bọt khí, nứt ngầm bên trong mối hàn mà không làm hỏng kết cấu.'
  },
  {
    id: 'vd-24',
    code: 'VD-24',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Một trạm biến áp trung gian ở khu dân cư có tiếng kêu "u u" liên tục khi vận hành. Hiện tượng này chủ yếu bắt nguồn từ nguyên nhân cơ học nào bên trong máy biến áp?',
    options: [
      'Hiện tượng từ giảo (lõi thép silic co dãn nhẹ theo chu kì của từ trường xoay chiều 50Hz)',
      'Gió thổi qua các dây dẫn',
      'Nước rò rỉ trong bình dầu',
      'Bóng đèn trang trí nhấp nháy'
    ],
    correctIndex: 0,
    explanation: 'Dưới tác dụng của từ trường biến thiên 50Hz, các lá thép kĩ thuật điện trong lõi từ biến dạng đàn hồi vi mô (hiện tượng từ giảo) gây rung động phát ra âm thanh tần số 100Hz.'
  },
  {
    id: 'vd-25',
    code: 'VD-25',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Trong quy trình đúc chuông đồng lớn của các làng nghề truyền thống (như Ngũ Xã, Huế), vì sao thợ đúc phải dùng khuôn đất sét trộn rơm và trấu mịn?',
    options: [
      'Tăng độ xốp thoáng khí giúp khí thoát ra ngoài khi rót đồng lỏng, tránh rỗ khí và nứt vỡ chuông',
      'Làm cho chuông đồng có màu vàng rơm tự nhiên',
      'Để khuôn dễ bắt lửa bốc cháy tạo nhiệt',
      'Để giảm khối lượng của khuôn đúc'
    ],
    correctIndex: 0,
    explanation: 'Rơm trấu trong đất sét khi nung khuôn sẽ cháy thành tro, để lại các mao dẫn vi mô giúp khí nóng thoát ra dễ dàng khi rót kim loại, vật đúc không bị rỗ rỉ.'
  },
  {
    id: 'vd-26',
    code: 'VD-26',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Trong máy xay sinh tố, khi động cơ bị kẹt do thực phẩm quá cứng, rơ le nhiệt bên trong tự động ngắt điện. Thiết bị này hoạt động để bảo vệ điều gì?',
    options: [
      'Bảo vệ cuộn dây động cơ không bị quá dòng gây cháy nổ và hỏng máy',
      'Bảo vệ lưỡi dao không bị cùn',
      'Bảo vệ cối xay không bị xước',
      'Giúp sinh tố thơm ngon hơn'
    ],
    correctIndex: 0,
    explanation: 'Khi roto bị kẹt, dòng điện tăng vọt sinh nhiệt lớn; rơ le nhiệt tác động ngắt nguồn tức thời để bảo vệ cuộn dây stator khỏi quá nhiệt cháy hỏng.'
  },
  {
    id: 'vd-27',
    code: 'VD-27',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Một gia đình lắp pin năng lượng mặt trời trên mái nhà. Để hòa vào lưới điện sinh hoạt 220V xoay chiều, thiết bị điện tử bắt buộc phải có là:',
    options: [
      'Bộ biến tần Inverter (chuyển dòng một chiều DC từ tấm pin thành xoay chiều AC 220V)',
      'Máy khoan bàn cơ khí',
      'Đèn hồ quang thắp sáng',
      'Động cơ quạt bàn'
    ],
    correctIndex: 0,
    explanation: 'Pin mặt trời sinh dòng điện 1 chiều (DC). Bộ Inverter có chức năng nghịch lưu biến dòng DC thành dòng AC chuẩn 220V hòa lưới gia đình.'
  },
  {
    id: 'vd-28',
    code: 'VD-28',
    level: 'van_dung',
    topic: 'Luyện kim, cơ khí',
    question: 'Để gia công các chi tiết có hình dạng 3D phức tạp như cánh tuabin máy bay hoặc khuôn dập mẫu xe ô tô từ khối hợp kim siêu cứng, công nghệ gia công cắt gọt tiên tiến nào được áp dụng?',
    options: [
      'Máy phay CNC nhiều trục (4 trục, 5 trục) có điều khiển số bằng máy tính',
      'Cưa gỗ thủ công',
      'Máy uốn thanh sắt xây dựng',
      'Đục đá thủ công mỹ nghệ'
    ],
    correctIndex: 0,
    explanation: 'Máy phay trung tâm CNC 5 trục lập trình bằng máy tính (CAM/CNC) có khả năng gia công biên dạng mặt cong 3D phức tạp với độ chính xác micromet.'
  },
  {
    id: 'vd-29',
    code: 'VD-29',
    level: 'van_dung',
    topic: 'Điện - điện tử',
    question: 'Khi sử dụng sóng Wi-Fi trong ngôi nhà nhiều tầng, nếu router đặt ở góc tầng 1 thì tầng 3 sóng rất yếu. Giải pháp kĩ thuật truyền thông không dây tối ưu là:',
    options: [
      'Lắp hệ thống Wi-Fi Mesh đa điểm phủ sóng liền mạch toàn bộ các tầng',
      'Thay bóng đèn sợi đốt thành đèn dầu',
      'Nối dây đồng hồ nước vào router',
      'Tắt điện thoại khi lên tầng 3'
    ],
    correctIndex: 0,
    explanation: 'Hệ thống Wi-Fi Mesh gồm nhiều thiết bị phân tán kết nối với nhau đồng nhất một tên mạng (SSID), tự động chuyển vùng sóng mạnh khắp nhà nhiều tầng.'
  },
  {
    id: 'vd-30',
    code: 'VD-30',
    level: 'van_dung',
    topic: 'Nghề nghiệp & Đời sống',
    question: 'Học sinh Mai rất yêu thích máy tính, các thiết bị thông minh IoT và robot tự hành trong công nghiệp. Em mong muốn thiết kế dây chuyền tự động cho các nhà máy lớn. Ngành học đại học phù hợp nhất với Mai là:',
    options: [
      'Kĩ thuật điều khiển và tự động hóa',
      'Khoa học đất nông nghiệp',
      'Khảo cổ học lịch sử',
      'Kĩ thuật dệt may thủ công'
    ],
    correctIndex: 0,
    explanation: 'Ngành Kĩ thuật Điều khiển và Tự động hóa đào tạo chuyên sâu về robot công nghiệp, PLC, vi điều khiển, dây chuyền tự động trong các nhà máy thông minh.'
  }
];
