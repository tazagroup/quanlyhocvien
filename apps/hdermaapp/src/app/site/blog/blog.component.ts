import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Scrollbar } from "swiper";
import { BaivietService } from '../../shared/baiviet.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { DanhmucService } from '../../shared/danhmuc.service';

// install Swiper modules
SwiperCore.use([Scrollbar]);
@Component({
  selector: 'tazagroup-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogComponent implements OnInit {
  configBlog!: any
  config!: any
  APITINYMCE!: any
  Slug!: string
  baivietnoibat!: any
  danhmucs!: any[]
  lamdeps: any = [
    {
      Date: '01.10.21',
      Title: 'Vài “tip” giúp bạn tận hưởng trọn vẹn từng giây phút làm sạch da chết trên cơ thể cùng Cà phê Đắk Lắk',
      Des: 'Hãy thử áp dụng một vài tip sau để gia tăng thêm những trải nghiệm thật “chill” với sản phẩm Cà phê Đắk Lắk làm sạch da chết cơ thể.',
      Image: 'https://image.cocoonvietnam.com/uploads/81245781_579846235913417_8400551857373577216_n_bbdc0e28c8.jpg'
    },
    {
      Date: '23.09.21',
      Title: 'Da dầu, mụn sẽ “ăn chay” như thế nào?',
      Des: 'Giống như các loại da khác, da dầu cũng sẽ đạt được trạng thái khỏe mạnh và mịn màng nếu được làm sạch đúng cách và được bảo vệ với các sản phẩm phù hợp.',
      Image: 'https://image.cocoonvietnam.com/uploads/255851207_4488384907923767_5021908811223513261_n_d1d0829cfb.jpg'
    }, {
      Date: '22.09.21',
      Title: '3 bước tẩy da chết hiệu quả dành cho mặt từ cà phê Đắk Lắk',
      Des: 'Việc tẩy da chết tuy chỉ mất từ 10 – 15s nhưng nó sẽ giúp bạn loại bỏ các tế bào da chết trên bề mặt da một cách dễ dàng, giảm nguy cơ tắc nghẽn lỗ',
      Image: 'https://image.cocoonvietnam.com/uploads/z3096547222807_536764ea18f31c0dfe4a73709d2b592b_1_92185e3983.jpg'
    }

  ]
  @ViewChild(SwiperComponent) swiper!: SwiperComponent;

  constructor(private _baivietService: BaivietService, private route: ActivatedRoute, private _danhmucService: DanhmucService) {
    this.APITINYMCE = environment.APITINYMCE;
  }

  swipePrev() {
    this.swiper.swiperRef.slidePrev();
  }
  swipeNext() {
    this.swiper.swiperRef.slideNext();
  }
  ngOnInit(): void {
    this.configBlog = {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    }
    this.config = {

      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },

        982: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    };
    //bai viet
    this._baivietService.getBaiviets().subscribe()
    this._baivietService.baiviets$.subscribe(res => {
      if (res) {
        this.baivietnoibat = res.filter(x => x.Loaibaiviet == 1)[0]
      }
    })
    //danh muc
    this._danhmucService.getDanhmucs().subscribe()
    this._danhmucService.danhmucs$.subscribe(res => {
      if (res) {
        this.danhmucs = res
        this.danhmucs.sort((a: any, b: any) => {
          return a.Ordering - b.Ordering;
        });
        this.danhmucs.forEach(x=>{
          x.Baiviets.sort((a: any, b: any) => {
            return b.Ordering - a.Ordering;
          });
          x.Baiviets = x.Baiviets.filter((y:any)=> y.Trangthai == 0)
        })
      }
    })
  }
}
