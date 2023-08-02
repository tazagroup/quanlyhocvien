import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { NotifierService } from 'angular-notifier';
import { FormControl, Validators } from '@angular/forms';
import { isNull } from 'lodash-es';

@Component({
  selector: 'tazagroup-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() isShowCart!: boolean;
  product!: any;
  num: number = 0;
  amount: number = 0;
  carts: any[] = [];
  constructor(
    private _cartService: CartService,
    private _router: Router,
    private _notifierService: NotifierService,

    ) { }
  removeItem(item: any) {
    this._cartService.removeCart(item).subscribe()
  }
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9','Backspace'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  onBlur(i:any)
  {
      if(this.carts[i].cartNum==null || this.carts[i].cartNum==0)
      {
        this.carts[i].cartNum =1;
      }
}
  ngOnInit(): void {
    this._cartService.getCart().subscribe();
    this._cartService.carts$.subscribe((res) => {
      if (res) {
        this.carts = res;
        // console.log(this.carts);
      }
    });
    this._cartService.num$.subscribe((res) => {
      this.num = res;
    });
    this._cartService.amount$.subscribe((res) => {
      this.amount = res;
    });
  }
  Total(items:any)
  {
    return items.reduce((acc:any, item:any) => acc + item.cartNum * item.Gia, 0)
  }
  DrawToggle()
  {
    this._cartService.toggleCart();
  }
  Dathang()
  {
    this._cartService.toggleCart();
    this._router.navigate(['checkout']);
  }
  updateCart(item:any,cartNum:any)
  {
    if(cartNum>0)
    {
    this._cartService.pushQuantityCart(item, cartNum).subscribe((res) =>
    this._notifierService.notify('success','Cập nhật giỏ hàng thành công')
    );
    }
  }
}
