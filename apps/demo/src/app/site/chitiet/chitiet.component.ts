import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { FreeMode, Navigation, Thumbs, EffectFade } from 'swiper';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from 'apps/demo/src/environments/environment';
import { ProductService } from '../../admin/product/product.service';
import { CartService } from '../cart/cart.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { LinkService } from '../../admin/product/link.service';
import { DangkyService } from '../dangky/dangky.service';
import { NotifierService } from 'angular-notifier';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
SwiperCore.use([FreeMode, Navigation, Thumbs, EffectFade]);
@Component({
  selector: 'tazagroup-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.scss'],
})
export class ChitietComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    if (window.pageYOffset > 700) {
      this.showcartmenu=true
    }
    else
    {
      this.showcartmenu=false
    }
  }
  @ViewChild(SwiperComponent) swiper!: SwiperComponent;
  showcartmenu:boolean=false;
  slug!: string;
  id!: string
  isCopy = false
  isUser = false
  user!: any
  APITINYMCE!: string;
  hotProduct!: any[]
  product: any = [{}];
  ListImage: any;
  thumbsSwiper: any;
  thumbsSwiper1: any;
  configProduct: any;
  panelOpenState = false;
  show = false;
  show1 = false;
  isGetLink = false
  cartNum = 1;
  wishlistNum = 1;
  num!: number;
  amount!: number;
  carts!: any[];
  idlink!: string
  wishlists: any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private _sanphamService: ProductService,
    private _cartService: CartService,
    private _dangkyService: DangkyService,
    private _wishlistService: WishlistService,
    private route: ActivatedRoute,
    private router: Router,
    private _linkService: LinkService,
    private _notifierService: NotifierService,
    private _snackBar: MatSnackBar
  ) {
    this.APITINYMCE = environment.APITINYMCE;
  }
  // updateWishlist() {
  //   if (this.wishlistNum >= 1) {
  //     this._wishlistService.pushQuantityWishlist(this.product, this.wishlistNum).subscribe((res) => alert('Đã thêm vào danh sách yêu thích!'));
  //   }
  // }
  increment(item: any) {
    ++this.cartNum;
    this.carts.find((x) => {
      if (x.id == item.id) {
        x.num = this.cartNum;
      }
    });
  }
  decrement(item: any) {
    if (this.cartNum > 1) {
      --this.cartNum;
      this.carts.find((x) => {
        if (x.id == item.id) {
          x.num = this.cartNum;
        }
      });
    }
  }
  onKeyDown(event: KeyboardEvent): void {   
    const allowedKeys = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9','Backspace'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  onBlur()
  {
      if(this.cartNum==null || this.cartNum==0)
      {
        this.cartNum =1;
      }
  }
  changeQuantity(item: any, e: any) {
    if (this.cartNum >= 1) {
      this.cartNum = Number(e);
      if (this.cartNum != undefined) {
        this.carts.find((x) => {
          if (x.id == item.id) {
            x.num = this.cartNum;
          }
        });
      }
    }
  }
  updateCart() {
    if (this.cartNum >= 1) {
      this.product.idGioithieu = this.id
      this._cartService.pushQuantityCart(this.product, this.cartNum).subscribe((res) =>
       this._notifierService.notify('success','Cập nhật giỏ hàng thành công')
       );
    }
  }
  slideNext() {
    this.swiper.swiperRef.slideNext(100);
  }
  slidePrev() {
    this.swiper.swiperRef.slidePrev(100);
  }
  getLink() {
    if (this.isCopy) {
      let link = {
        pid: '',
        idUser: this.user.id,
        idProduct: this.product.id,
      }
      let url: any = window.location.href

      if (this.id) {
        link.pid = this.id
        let index = url.lastIndexOf('/')
        url = url.substring(0, index)
      }
      this._linkService.postLink(link).subscribe((res: any) => {
        if (res) {
          url = url + `/${res.id}`
          navigator.clipboard.writeText(url);
          this.isCopy = true
        }
      })
    }
  }
  copyLink() {
    let url: any = window.location.href
    let index = url.lastIndexOf('/')
    let slug = url.substring(index+1)

    if (slug == this.slug) {
      url = url +`/${this.idlink}`
    }else{
      console.log('aaa');
      url = url.substring(0, index)
      url = url +`/${this.idlink}`
    }
    navigator.clipboard.writeText(url);

  }
  ngOnInit(): void {
    this.configProduct = {};

    this.route.params.subscribe((paramsId) => {
      this.slug = paramsId['slug'];
      this.id = paramsId['id'];
      this.product = {};
      if (this.slug) {
        this._cartService.getCart().subscribe();
        this._sanphamService.getProductDetail(this.slug).subscribe();
        this._sanphamService.product$.subscribe((res) => {
          if (res) {
            this._cartService.amount$.subscribe((res) => (this.amount = res));
            this._cartService.num$.subscribe((res) => (this.num = res));
            this.product = res;
            this.ListImage = this.product.ListImage;
            this._cartService.carts$.subscribe((data) => {
              if (data) {
                const index = data.findIndex((x: any) => x.id == this.product.id)
                this.carts = data;
                if (index == -1) {
                  this.cartNum = 1
                } else {
                  this.cartNum = data[index].cartNum
                }
              }
            });
          }
        });
        this._sanphamService.getProduct().subscribe();
        this._sanphamService.products$.subscribe((res) => {
          if (res) {
            res.sort((a: any, b: any) => {
              return a.Ordering - b.Ordering;
            });
            this.hotProduct = res.filter(x => x.Noibat[0] == "0" || x.Noibat[1] == "0");
          }
        });
        this._dangkyService.authenticated$.subscribe(res => {
          if (res) {
            this.isCopy = true
            this._dangkyService.getProfile().subscribe(data => {
              this.user = data
              this._linkService.getLink().subscribe((response: any) => {
                if (response) {
                  let itemLink = response.find((x: any) => x.idUser == this.user.id && x.idProduct == this.product.id)
                  if (itemLink) {
                    this.idlink = itemLink.id
                    this.isUser = true
                  }else{
                    this.isUser = false
                  }
                }
              })
            })
          } else {
            this.isCopy = false
          }
        })

      }

    });

  }
}
