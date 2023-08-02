import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'apps/demo/src/environments/environment';
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { BaivietService } from '../../shared/baiviet.service';
import { DanhmucProductService } from '../../admin/danhmuc-product/danhmuc-product.service';
import { ProductService } from '../../admin/product/product.service';
import { TagsService } from '../../admin/tags/tags.service';
import { CartService } from '../cart/cart.service';
import { DangkyService } from '../dangky/dangky.service';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);
@Component({
  selector: 'tazagroup-trangchu',
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TrangchuComponent implements OnInit {
  config!: any;
  configProduct!: any;
  confighomepage!: any;
  APITINYMCE!: string;
  items!: any
  itemsMobile: any = [];
  hotProduct!: any
  bestSeller!: any
  wishlists!:any
  data: any = [{}];
  token: any = localStorage.getItem('TazagroupToken')

  constructor(
    private _baivietService: BaivietService,
    private _sanphamService: ProductService,
    private _dangkyService: DangkyService,
    private _cartService: CartService,
    private route: ActivatedRoute,
    private _tagService: TagsService
  ) {
    this.APITINYMCE = environment.APITINYMCE;
  }
  AddCart(item: any) {
    this._cartService.pushCart(item).subscribe()
  }
  getTags(item: any) {
    item.checked = true
    this._tagService.getTagsFilter(item).subscribe()
  }
  ngOnInit(): void {
    this.configProduct = {
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        982: {
          slidesPerView: 6,
          spaceBetween: 50,
        },
      },
    };
    this.confighomepage = {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    };
    this.config = {
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },

        982: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      },
      freeMode: true,
    };
    //bai viet
    this._baivietService.getBaiviets().subscribe();
    this._baivietService.baiviets$.subscribe((res) => {
      if (res) {
        this.data = res.filter((x) => x.Loaibaiviet === 2);
      }
    });
    //san pham
    this._sanphamService.getProduct().subscribe();
    this._sanphamService.products$.subscribe((res) => {
      if (res) {
        res.sort((a: any, b: any) => {
          return a.Ordering - b.Ordering;
        });
        this.hotProduct = res.filter(x => x.Noibat[0] == "0" || x.Noibat[1] == "0");
        this.bestSeller = res.filter(x => x.Noibat[0] == "1" || x.Noibat[1] == "1");
      }
    });
    //danh muc
    this._tagService.getTags().subscribe();
    this._tagService.tags$.subscribe((res) => {
      if (res) {
        this.items = res.filter(x => x.Loaitag == 0 && x.Trangthai == 0);
        this.items.sort((a: any, b: any) => {
          return a.Ordering - b.Ordering;
        });
        const x = this.items.length / 2;
        for (let i = 0; i < x; i++) {
          this.itemsMobile.push(this.items.slice(2 * i, 2 * i + 2));
        }
      }
    });
    if (this.token != null) {
      this._dangkyService.signInUsingToken(this.token).subscribe(res => {
        if (res) {
          this._dangkyService.user$.subscribe((data) => {
            if (data) {
              if (data.Wishlist != null) {
                this.wishlists = data
              }
            }
          })

        }
      })
    }
  }
  ngOnDestroy() {
    localStorage.removeItem('paginate');
  }
}
