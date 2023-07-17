import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { DangkyService } from '../dangky/dangky.service';
import { take } from 'rxjs';
import { AuthService } from '../../admin/auth/auth.service';
@Component({
  selector: 'tazagroup-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  token: any = localStorage.getItem('TazagroupToken');
  isInstalled:boolean = false;
  deferredPrompt: any;
  num: any = JSON.parse(localStorage.getItem('num') || '0');
  num$:any
  wishlists: any = [];
  CUser:any;
  constructor(
    private _cartService: CartService,
    private _wishlistService: WishlistService,
  ) {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  }
  isOpenCart$:any;
  showInstallPrompt() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          this.isInstalled = true;
        } else {

         }
        this.deferredPrompt = null;
      });
    }
  }
  ngOnInit(): void {   
    this.num$ = this._cartService.num$;
    this._cartService.num$.subscribe((res) => {
      if (res) {
        this.num = res;
      }
    });
    this.isOpenCart$ = this._cartService.isOpenCart$;

    // this._wishlistService.wishlist$.subscribe((response) => {
    //   if (response) {
    //     this.wishlists = response.Products;
    //   } else {
    //     this.wishlists = [];
    //   }
    // });
    // if (this.token != null) {
    //   this._dangkyService.signInUsingToken(this.token).subscribe((res) => {
    //     if (res) {
    //       this._dangkyService.user$.subscribe((data) => {
    //         if (data) {
    //           if (data.Wishlist != null) {
    //             this.wishlists = data.Wishlist.Products;
    //           }
    //         }
    //       });
    //     }
    //   });
    // }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
      
    } else {
      this.isInstalled = false;
    }
  }
  DrawToggle()
  {
    this._cartService.toggleCart();
  }
}
