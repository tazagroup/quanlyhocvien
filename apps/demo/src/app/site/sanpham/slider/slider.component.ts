import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { SwiperComponent } from 'swiper/angular';
import { DanhmucService } from '../../../shared/danhmuc.service';
import { ProductService } from '../../../admin/product/product.service';
import { TagsService } from '../../../admin/tags/tags.service';
import { CartService } from '../../cart/cart.service';
@Component({
  selector: 'tazagroup-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() danhmucs!: any[]
  tagsFilter:any = []
  products!: any[]
  constructor(private _productService: ProductService, private _tagService: TagsService, private _cartService: CartService) { }
  @ViewChild(SwiperComponent) swiper!: SwiperComponent;
  panelOpenState = false;
  showFiller = false;
  configProduct1!: any;
  configProduct2!: any;
  slideNext() {
    this.swiper.swiperRef.slideNext(100);
  }
  slidePrev() {
    this.swiper.swiperRef.slidePrev(100);
  }

  AddCart(item: any) {
    this._cartService.pushCart(item).subscribe();
  }

  ngOnInit(): void {
   
    this.configProduct1 = {
      slidesPerView: 2,
      spaceBetween: 20,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        1024: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        500: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    };
    this.configProduct2 = {
      slidesPerView: 4,
      spaceBetween: 20,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        500: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    };
    this._productService.getProduct().subscribe();
    this._productService.products$.subscribe((res) => {
      if (res) {
        this.products = res;
      }
    });
    this._tagService.tagfilter$.subscribe(res => {
      if (res) {
        this.tagsFilter = res 
      }
    })

  }
}
