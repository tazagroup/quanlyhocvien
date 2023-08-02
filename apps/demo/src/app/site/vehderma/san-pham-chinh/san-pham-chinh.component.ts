import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'tazagroup-san-pham-chinh',
  templateUrl: './san-pham-chinh.component.html',
  styleUrls: ['./san-pham-chinh.component.scss'],
})
export class SanPhamChinhComponent implements OnInit {
  confighomepage!: any;
  product = [
    {
      id: 1,
      title: 'Chăm sóc làn da khỏe đẹp khởi nguồn từ bước làm sạch da',
      name: 'Làm sạch chuyên sâu và dịu nhẹ',
      description:
        'Sau một ngày dài tiếp xúc với các yếu tố như khói bụi, ô nhiễm, tia cực tím…  làn da cũng cần được nghỉ ngơi và thư giãn.  Nếu không được chăm chút và làm sạch cẩn thận, làn da sẽ trở nên xỉn màu, bị viêm mụn và xuất hiện các dấu hiệu lão hóa. <br><br> Dòng sản phẩm chăm sóc da hằng ngày từ H.Derma với công thức riêng biệt, an toàn và lành tính cho mọi làn da. Với sự kết hợp của các thành phần làm sạch sâu và cấp ẩm phục hồi giúp da sáng khỏe và ngăn ngừa mụn hiệu quả.',
      image: '/assets/vehderma/hinh4.jpg',
    },
    {
      id: 2,
      title: 'Duy trì vẻ đẹp thanh xuân với làn da căng mịn',
      name: 'Trẻ hóa làn da và ngăn ngừa lão hóa',
      description:
        'Sau 25 tuổi, lượng collagen bắt đầu suy giảm, da kém đàn hồi và dễ bị tổn thương bởi các yếu tố hệ  tác nhân (môi trường, lối sống, nội tiết tố) là nguyên nhân chính dẫn đến lão hóa.<br><br>Với sự kết hợp các thành phần chính Retinol, Bakuchiol nồng độ cao, dòng sản phẩm ngăn ngừa lão hóa từ H.Derma sẽ thúc đẩy nhanh quá trình sản xuất collagen, dưỡng da sáng mịn và không gây kích ứng với các thành phần dưỡng ẩm dịu nhẹ và phục hồi đặc biệt từ H.Derma.',
      image: '/assets/vehderma/hinh5.jpg',
    },
    {
      id: 3,
      title: 'Bảo vệ làn da rạng rỡ và tránh xa mụn',
      name: 'Kiểm soát bã nhờn và điều trị mụn',
      description:
        'Mụn được hình thành từ 3 tác nhân chính: bã nhờn, bụi bẩn và vi khuẩn. Thấu hiểu điều đó, các sản phẩm chăm sóc và điều trị mụn từ H.Derma được hình thành dựa trên cơ chế khắc trị 3 tác nhân chính gây viêm mụn.<br><br>Các sản phẩm điều trị mụn với đặc tính làm sạch sâu lỗ chân lông, giảm sưng viêm, kháng khuẩn, hỗ trợ làm khô nhanh cồi mụn và làm mờ thâm hiệu quả mà không gây kích ứng da.',
      image: '/assets/vehderma/hinh6.jpg',
    },
    {
      id: 4,
      title: 'Da căng mướt và khỏe hơn mỗi ngày',
      name: 'Cấp ẩm chuyên sâu và phục hồi da',
      description:
        'Da khô, thiếu ẩm xuất phát từ nhiều nguyên nhân như ô nhiễm môi trường, thay đổi nội tiết tố, da đang treatment dẫn đến hậu quả da kém đàn hồi, bong khô, yếu ớt và lão hóa sớm.  Vì thế làn da rất cần được cấp ẩm, phục hồi và tăng cường sức mạnh bảo vệ da.<br><br>Với công thức dưỡng ẩm và phục hồi độc đáo, các sản phẩm cấp ẩm từ H.Derma giúp củng cố hàng rào bảo vệ da, giúp da mịn màng, săn chắc và ngăn ngừa các dấu hiệu lão hóa.',
      image: '/assets/vehderma/hinh7.jpg',
    },
    {
      id: 5,
      title: 'Nuôi dưỡng làn da sáng mịn và làm mờ thâm nám',
      name: 'Điều trị thâm nám',
      description:
        'Rối loạn nội tiết tố, tăng sinh hắc tố melanin là các nguyên nhân hàng đầu gây thâm nám.<br><br>Để khắc chế hiệu quả tình trạng này, các sản phẩm điều trị thâm nám từ H.Derma với khả năng ức chế hoạt động của các enzyme hình thành melanin hình thành thâm nám kết hợp cùng hoạt chất dưỡng da thế hệ mới giúp da sáng mịn, đều màu và làm mờ thâm nám, tàn nhang.',
      image: '/assets/vehderma/hinh8.jpg',
    },
    {
      id: 6,
      title: 'Tăng cường hàng rào bảo vệ da dưới tác động của ánh sáng mặt trời',
      name: 'Chống nắng và bảo vệ da',
      description:
        'Ánh sáng mặt trời là nhân tố chủ yếu gây nên tình trạng tăng sắc tố, lão hóa và ung thư da.<br><br>Để bảo vệ làn da trước tác động của ánh sáng mặt trời, kem chống nắng H.Derma với màng lọc chống nắng vượt trội giúp ngăn ngừa sự xâm nhập của các tia UV, ánh sáng xanh gây thâm nám và lão hóa da với chất kem mềm mịn, không gây khô da, đặc biệt có tác dụng dưỡng sáng và lành tính với mọi làn da.',
      image: '/assets/vehderma/hinh9.jpg',
    },
  ];
  config = {
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 2000,
    },
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
  };
  ngOnInit(): void {
    this.confighomepage = {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    };
  }
}
