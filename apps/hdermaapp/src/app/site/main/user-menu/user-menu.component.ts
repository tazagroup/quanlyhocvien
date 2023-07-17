import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { WishlistService } from '../../wishlist/wishlist.service';
import { UsersService } from '../../../shared/users.service';
import { AuthService } from '../../../admin/auth/auth.service';

@Component({
  selector: 'tazagroup-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  token: any = localStorage.getItem('TazagroupToken');
  User: any;
  constructor(
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _usersService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.token) {
      this._usersService.getProfile().subscribe();
      this._usersService.profile$.subscribe((data) => {
        if (data) {
          this.User = data;
        }
      });
    }
  }
  Dangxuat() {
    this._authService.Dangxuat().subscribe((res) => {
      if (res == true) {
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/';
        this._router.navigate(['']);
        location.reload();
      }
    });
    this._wishlistService.deleteWishlist().subscribe();
  }
}
