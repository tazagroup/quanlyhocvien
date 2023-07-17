import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import SwiperCore, { Scrollbar } from "swiper";
import { SwiperComponent } from 'swiper/angular';
import { BaivietService } from '../../../shared/baiviet.service';
SwiperCore.use([Scrollbar]);
@Component({
  selector: 'tazagroup-blog-danhmuc',
  templateUrl: './blog-danhmuc.component.html',
  styleUrls: ['./blog-danhmuc.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogDanhmucComponent implements OnInit {
  @ViewChild(SwiperComponent) swiper!: SwiperComponent;

  constructor(private _baivietService: BaivietService, private route: ActivatedRoute) {
    this.APITINYMCE = environment.APITINYMCE;
  }
  configBlog!:any
  APITINYMCE!: string
  id!: string
  arr!:any[]
  indexPaginate = 0;
  lamdeps:any = [

  ]
  courses!:any[]
  swipePrev() {
    this.swiper.swiperRef.slidePrev();
  }
  swipeNext() {
    this.swiper.swiperRef.slideNext();
  }

  paginateNumber(i: number) {
    
    localStorage.setItem("paginate", `${i}`);

    this.indexPaginate = i;
    if (i == -1) {
      i = this.arr.length - 1;
      this.indexPaginate = i;
    }
    if (i > this.arr.length - 1) {
      i = 0;
      this.indexPaginate = i;
    }
    this.courses = this.arr[i];

  }

  ngOnInit(): void {
    this.configBlog = {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    }
    this.lamdeps = {}
    this._baivietService.getBaiviets().subscribe()
      this._baivietService.baiviets$.subscribe(res => {
        if (res) {
          this.lamdeps = res.filter(x=> x.Trangthai == 0)
          this.lamdeps.sort((a: any, b: any) => {
            return a.Ordering - b.Ordering;
          });
          this.arr = [];
          const x = this.lamdeps?.length / 9;
          if (this.lamdeps?.length > 0) {
            for (let i = 0; i < x; i++) {
              this.arr.push(this.lamdeps.slice(9 * i, 9 * i + 9));
            }
            const i:string  = localStorage.getItem("paginate") || '0'
            this.indexPaginate = parseInt(i)
            this.courses = this.arr[parseInt(i)];
          }
        }
    })
  }
}
