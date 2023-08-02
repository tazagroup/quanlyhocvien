import { Component, OnInit, TemplateRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CheckoutService } from '../checkout/checkout.service';
import { DangkyService } from '../dangky/dangky.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UsersService } from '../../shared/users.service';
import { AuthService } from '../../admin/auth/auth.service';

@Component({
  selector: 'tazagroup-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  i = 1;
  user!: any;
  temp!: number
  profileForm!: any;
  passwordForm!: any;
  token = localStorage.getItem('TazagroupToken') || null;
  isLogin = false;
  donhang: any[] = [];
  donhangchitiet: any[] = [];
  idUser!: string;
  commentForm!: any
  rating: number = 0
  fiveStar: number = 0
  fourStar: number = 0
  threeStar: number = 0
  twoStar: number = 0
  oneStar: number = 0
  isOpened:boolean = true
  mode:any = 'side'
  constructor(
    private _dangkyService: DangkyService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _notifierService: NotifierService,
    private fb: FormBuilder,
    private _wishlistService: WishlistService,
    private _authService: AuthService,
    private _usersService: UsersService,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Large,
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.isOpened = false
        this.mode = 'over'
      }
      if (result.breakpoints[Breakpoints.Large]) {
        this.isOpened = true
        this.mode = 'side'
      }
    });
    this.profileForm = this.fb.group({
      profile: this.fb.group({
        Hoten: ['', Validators.required],
        Email: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        SDT: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
        Diachi: ['', Validators.required],
      }),
    });
    this.passwordForm = this.fb.group({
      oldpass: ['', Validators.required],
      newpass: ['', Validators.required],
      comfirmnewpass: ['', Validators.required],
    });
    this._dangkyService.user$.subscribe(res=>{
      if(res){
        this.user = res;
        this.idUser = res.id;
        this.donhang = res.Donhangs;
        this.profileForm.get('profile.Hoten').setValue(res.Hoten);
        this.profileForm.get('profile.SDT').setValue(res.SDT);
        this.profileForm.get('profile.Email').setValue(res.email);
        this.profileForm.get('profile.Diachi').setValue(res.Diachi);
        this._wishlistService.getWishlistDetail(res.Wishlist.id).subscribe()
      }
    })
  }
  selectDonhang(item: any) {
    this.donhangchitiet = item.Donhangchitiets;
  }

  signout() {
    this._dangkyService.signOut().subscribe((res) => {
      if (res == true) {
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/';
        this._router.navigateByUrl(redirectURL);
      }
    });
    this._wishlistService.deleteWishlist().subscribe()

  }

  ChangePassword() {
    let newpassword = this.passwordForm.get('newpass').value;
    newpassword = newpassword.split('');
    if (this.passwordForm.get('oldpass').hasError('required')) {
      this._notifierService.notify('error', `Vui lòng nhập mật khẩu của bạn`);
    }
    if (this.passwordForm.get('newpass').hasError('required')) {
      this._notifierService.notify('error', `Vui lòng nhập mật khẩu mới của bạn`);
    } else if (newpassword.length < 6) {
      this._notifierService.notify('error', `Vui lòng nhập mật khẩu hơn 6 ký tự`);
    } else if (newpassword.length > 20) {
      this._notifierService.notify('error', `Vui lòng nhập mật khẩu nhỏ hơn 20 ký tự`);
    }
    if (this.passwordForm.get('comfirmnewpass').hasError('required')) {
      this._notifierService.notify('error', `Vui lòng xác nhận password`);
    }
    if (
      this.passwordForm.get('newpass').value !=
      this.passwordForm.get('comfirmnewpass').value
    ) {
      this._notifierService.notify('error', ` Password không đúng`);
    } else {
      if (this.passwordForm.invalid) {
        return;
      }
    }

    let temp = this.user.Donhangs
    delete this.user.Donhangs
    const data = Object.assign(
      { user: this.user },
      this.passwordForm.value
    );

    this._dangkyService.changepass(data).subscribe((res) => {

      if (res == 1) {
        this._notifierService.notify('error', 'Sai Mật Khẩu Hiện Tại');
      } else {
        this.passwordForm.reset();
        this._notifierService.notify('success', 'Cập Nhật Mật Khẩu Thành Công');
        this.user.Donhangs = temp
      }
    });
  }
  UpdateProfile() {
    if (this.profileForm.get('profile.Hoten').hasError('required')) {
      this._notifierService.notify('error', `Vui lòng nhập ho và tên`);
    }
    if (this.profileForm.get('profile.SDT').hasError('required')) {
      this._notifierService.notify('error', `Vui lòng nhập SDT`);
    }
    if (this.profileForm.get('profile.SDT').hasError('pattern')) {
      this._notifierService.notify('error', `Số điện thoại không đúng định dạng`);
    }
    if (this.profileForm.get('profile.Email').hasError('required')) {
      this._notifierService.notify('error', `Vui lòng nhập Email`);
    }
    if (this.profileForm.get('profile.Email').hasError('pattern')) {
      this._notifierService.notify('error', `Email không đúng định dạng`);
    }
    if (this.profileForm.get('profile.Diachi').hasError('required')) {
      this._notifierService.notify('error', `Vui lòng nhập địa chỉ`);
    } else {
      if (this.profileForm.invalid) {
        return;
      }
    }

    this._dangkyService
      .updateNhanvien(this.idUser, this.profileForm.value)
      .subscribe((res) => {
        this._notifierService.notify('succes', `Cập nhật thành công`);
      });
  }
  Dangxuat() {
    this._authService.Dangxuat().subscribe((res) => {
      if (res == true) {
        this._router.navigate(['']);
        location.reload();
      }
    });
    this._wishlistService.deleteWishlist().subscribe();
  }
}
