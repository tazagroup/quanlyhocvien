import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'tazagroup-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
})
export class LoginAdminComponent implements OnInit {
  User: any = {};
  private readonly notifier: NotifierService;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  signInForm!: any;
  signUpForm!: any;
  isDangky = false
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    notifierService: NotifierService, // private _notifierService: NotifierService+
    private _notifierService: NotifierService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      SDT: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
      password: ['', Validators.required],
      rememberMe: [''],
    });
    this.signUpForm = this._formBuilder.group({
      Hoten: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      SDT: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
      confirmPassword: ['', Validators.required],
    });
  }

  // signIn(): void {
  //   if (this.signInForm.get('SDT').hasError('required')) {
  //     this.notifier.notify('error', `Vui lòng nhập SDT`);
  //   } else if (this.signInForm.get('SDT').hasError('pattern')) {
  //     this.notifier.notify('error', `Số điện thoại không đúng định dạng`);
  //   } else if (this.signInForm.get('password').hasError('required')) {
  //     this.notifier.notify('error', `Vui lòng nhập password`);
  //   } else {
  //     if (this.signInForm.invalid) {
  //       return;
  //     }
  //     this._authService.Dangnhap(this.signInForm.value).subscribe((data) => {
  //       if (data[0]) {
  //         const redirectURL =
  //           this._route.snapshot.queryParamMap.get('redirectURL') || '/profile';
  //         this._router.navigateByUrl(redirectURL);
  //       } else {
  //         this.notifier.notify('error', `Số điện thoại hoặc mật khẩu không đúng`);

  //       }
  //     });
  //   }
  // }
  // signUp() {
  //   if (Object.keys(this.signUpForm).length > 0) {
  //     if (this.signUpForm.get('Hoten').hasError('required')) {
  //       this.notifier.notify('error', `Vui lòng nhập Họ và Tên`);
  //       return;
  //     }
  //     if (this.signUpForm.get('SDT').hasError('required')) {
  //       this.notifier.notify('error', `Vui lòng nhập SDT`);
  //       return;
  //     }
  //     if (this.signUpForm.get('SDT').hasError('pattern')) {
  //       this.notifier.notify('error', `Số điện thoại không đúng định dạng`);
  //       return;
  //     }
  //     if (this.signUpForm.get('email').hasError('required')) {
  //       this.notifier.notify('error', `Vui lòng nhập email`);
  //       return;
  //     }
  //     if (this.signUpForm.get('email').hasError('pattern')) {
  //       this.notifier.notify('error', `Email không đúng định dạng`);
  //       return;
  //     }

  //     if (this.signUpForm.get('password').hasError('required')) {
  //       this.notifier.notify('error', `Vui lòng nhập password`);
  //     }
  //     let password = this.signUpForm.get('password').value;
  //     password = password.split('');
  //     if (password.length < 6) {
  //       this.notifier.notify('error', `Vui lòng nhập mật khẩu lớn hơn 6 ký tự`);
  //     }
  //     if (password.length > 20) {
  //       this.notifier.notify('error', `Vui lòng nhập mật khẩu nhỏ 20 ký tự`);
  //     }
  //     if (this.signUpForm.get('confirmPassword').hasError('required')) {
  //       this.notifier.notify('error', `Vui lòng xác nhận password`);
  //     }

  //     if (
  //       this.signUpForm.get('confirmPassword').value !=
  //       this.signUpForm.get('password').value
  //     ) {
  //       this.notifier.notify('error', ` Password không đúng`);
  //     } else {
  //       if (this.signUpForm.invalid) {
  //         return;
  //       }
  //       this._userService
  //         .Dangky(this.signUpForm.value)
  //         .subscribe((res: any) => {
  //           console.log(res);

  //           if (!res[0]) {
  //             this.notifier.notify('error', 'Số Điện Thoại Đã Tồn Tại');
  //           } else if (res == 2) {
  //             this.notifier.notify('error', 'Email Đã Tồn Tại');
  //           } else {
  //             this.notifier.notify('success', 'Tạo tài khoản thành công');
  //             this.signUpForm.reset();
  //           }
  //         });
  //     }
  //   }
  // }
  Dangnhap(user: any) {
    if (user.SDT == undefined || user.SDT == '') {
      this._notifierService.show({
        message: 'Vui lòng nhập số điện thoại',
        type: 'error',
      });
    } else if (user.password == undefined || user.password == '') {
      this._notifierService.show({
        message: 'Vui lòng nhập Mật Khẩu',
        type: 'error',
      });
    } else {
      this._authService.Dangnhap(user).subscribe(data => {
        console.log(data);
        if (!data[0]) {
          this._notifierService.show({
            message: data[1],
            type: 'error',
          });
        }
        else
        {
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/';          
          this._router.navigateByUrl(redirectURL);
        }
      });
    }
  }
}
