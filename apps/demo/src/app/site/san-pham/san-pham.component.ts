import { Component, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'apps/demo/src/environments/environment';
import { ProductService } from '../../admin/product/product.service';
import { CartService } from '../cart/cart.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { NotifierService } from 'angular-notifier';
import { DangkyService } from '../dangky/dangky.service';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommentService } from '../../admin/comment/comment.service';

@Component({
  selector: 'tazagroup-san-pham',
  templateUrl: './san-pham.component.html',
  styleUrls: ['./san-pham.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SanPhamComponent implements OnInit {
  @Input() products!: any[]
  @Input() data!: any
  private readonly notifier!: NotifierService;
  APITINYMCE!: any;
  user!: any
  wishlist!: any
  configProduct!: any;
  commentForm!: any
  rating: number = 0
  fiveStar: number = 0
  fourStar: number = 0
  threeStar: number = 0
  twoStar: number = 0
  oneStar: number = 0
  temp!: number
  comments!: any[]
  constructor(
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private _commentService: CommentService,
    private dialog: MatDialog,
    notifierService: NotifierService // private _notifierService: NotifierService
  ) {
    this.APITINYMCE = environment.APITINYMCE;
    this.notifier = notifierService;

  }
  AddCart(item: any) {

    this._cartService.pushCart(item).subscribe(res => {
      if (res) {
        this.notifier.notify('success', `Đã thêm vào giỏ hàng`);
      }
    });
  }
  OpenDialog(templateRef: TemplateRef<any>, item: any) {
    this.commentForm.idProduct = item.id
    this.temp = 0
    this.dialog.open(templateRef);
    this.fiveStar = this.fourStar = this.threeStar = this.twoStar = this.oneStar = 0
    // this.comments.forEach(x => {
    //   if (x.Rate == 5) {
    //     ++this.fiveStar
    //   }
    //   if (x.Rate == 4) {
    //     ++this.fourStar
    //   }
    //   if (x.Rate == 3) {
    //     ++this.threeStar
    //   }
    //   if (x.Rate == 2) {
    //     ++this.twoStar
    //   }
    //   if (x.Rate == 1) {
    //     ++this.oneStar
    //   }
    //   this.temp += x.Rate
    // })

  }

  AddWishlist(item: any) {
    this.user = this.data
    if (!this.user || this.user == undefined) {
      this.notifier.notify('error', `Vui lòng đặng nhập`);
      return
    }
    this.wishlist = this.data.Wishlist

    if (this.wishlist) {
      if (this.wishlist?.Products.length > 0) {
        let index = this.wishlist.Products.findIndex((x: any) => x.id == item.id)
        if (index === -1) this.wishlist.Products.push(item)
      } else {
        this.wishlist.Products = [item]
      }
      this._wishlistService.updateWishlist(this.wishlist).subscribe()
    } else {
      let wishlistForm = {
        idKH: this.user.id,
        Products: [item]
      }
      this._wishlistService.postWishlist(wishlistForm).subscribe();
    }
    this.notifier.notify('success', `Đã thêm vào mục yêu thích`);

  }
  postComment() {
    this.user = this.data
    if (!this.user || this.user == undefined) {
      this.notifier.notify('error', `Vui lòng đặng nhập`);
      return
    }
    if (this.data.id) {
      this.commentForm.idUser = this.user.id
    }
    this.commentForm.Rate = this.rating
    this._commentService.postComment(this.commentForm).subscribe(res => {
      if (res) {
        this.resetForm()
        this.notifier.notify('success', `Đánh giá sản phẩm thành công`);
      }
    })
  }
  resetForm() {
    this.commentForm = {
      Comment: '',
      idProduct: '',
      idUser: '',
      Rate: 0,
    }
  }
  ngOnInit(): void {
    this.resetForm()
    this.configProduct = {
      freemode: true,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        982: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      },
    };


  }
}
