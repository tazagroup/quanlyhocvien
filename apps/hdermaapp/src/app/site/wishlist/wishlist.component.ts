import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CartService } from '../cart/cart.service';
import { DangkyService } from '../dangky/dangky.service';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'tazagroup-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  private readonly notifier!: NotifierService;

  wishlist!: any
  products: any[] = [];
  constructor(private _wishlistService: WishlistService, private _cartService: CartService, private _dangkyService: DangkyService,
    notifierService: NotifierService // private _notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }
  removeItem(item: any) {
    this.products = this.products.filter(x => x.id != item.id)
    this.wishlist.Products = this.products
    this._wishlistService.updateWishlist(this.wishlist).subscribe()
  }
  AddCart(item: any) {
    this.products = this.products.filter(x => x.id != item.id)
    this.wishlist.Products = this.products
    this._wishlistService.updateWishlist(this.wishlist).subscribe()
    this._cartService.pushCart(item).subscribe()
    this.notifier.notify('success', `Đã thêm sản phẩm vào giỏ hàng`);

  }
  ngOnInit(): void {
    this._dangkyService.user$.subscribe(res => {
      if (res?.Wishlist) {
        this._wishlistService.getWishlistDetail(res.Wishlist.id).subscribe(data => {
          if (data) {
            this.wishlist = data
            this.products = data.Products
          }
        })
      }
    })
  }
}
