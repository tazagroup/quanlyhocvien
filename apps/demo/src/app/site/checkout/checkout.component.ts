import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UsersService } from '../../shared/users.service';
import { CartService } from '../cart/cart.service';
import { DangkyService } from '../dangky/dangky.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { CheckoutService } from './checkout.service';
import { MD5 } from 'crypto-js';
import { AccountNotificationsService } from '../../admin/account-notifications/account-notifications.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'tazagroup-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  private readonly notifier: NotifierService;
  token = localStorage.getItem('TazagroupToken') || null;
  diachi!: any;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  codeTp!: any;
  diachichitiet!: any;
  phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  carts!: any[];
  amount!: number;
  khachhangForm!: any;
  donhangForm!: any;
  TenTP!: any;
  TenQuanHuyen!: any;
  phiship!: number;
  countDown = 5;
  interval: any;
  Khachhang:any={Diachi:{id:0}};
  DonhangChitiet:any={};
  ListUser:any[]=[]
  Thanksdata:any;
  CUser:any
  editThongtin:boolean=false
  options: any = {
    componentRestrictions: { country: 'VN' }
  } 
  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private _checkoutService: CheckoutService,
    notifierService: NotifierService,
    private _dangkyService: DangkyService,
    private _route: ActivatedRoute,
    private _wishlistService: WishlistService,
    private _router: Router,
    private _usersService: UsersService,
    public _dialog: MatDialog,
    public _accountNotificationsService: AccountNotificationsService
  ) {
    this.notifier = notifierService;
  } 
  ngOnInit(): void {
    this.resetForm();
    // this._checkoutService.getDiachi().subscribe();
    // this._checkoutService.diachi$.subscribe((res) => {
    //   if (res) {
    //     this.diachi = res;
    //     this.diachi = this.diachi.results;
    //   }
    // });
    this.cartService.getCart().subscribe();
    this.cartService.carts$.subscribe((res) => {
      this.carts = res;
    });
    this.cartService.amount$.subscribe((res) => (this.amount = res));
    if(this.token!=null){
      this._usersService.getProfile().subscribe((res:any) => {  
        if (res) {
          console.log(res);
          
          this.CUser = res
          this.ListUser.push({id:res.id,Role:'user'})
          this._usersService.getUserByid(res.ref_id).subscribe((v)=>{if(v){this.ListUser.push({id:v.id,Role:'parent'})}})
          this._usersService.getAdmin().subscribe((v)=>{if(v){
            const admin = v.map(admin=>{
             return {id:admin.id,Role:'admin'}
            })
            this.ListUser = [...new Set(this.ListUser.concat(admin))];
          }})
          this.Khachhang.idKH = res.id;
          this.Khachhang.Hoten = res.Hoten;
          this.Khachhang.email = res.email;
          this.Khachhang.SDT = res.SDT;
          this.Khachhang.Diachi = res.Diachi[0]||{id:0};
          console.log(this.Khachhang.Diachi.id);
          
        }
      });
    }

  }
  resetForm() {
    this.khachhangForm = this.fb.group({
      Hoten: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      SDT: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
      Diachi: ['', Validators.required],
      Ghichu: [''],
      idKH: [''],
    });
    this.donhangForm = this.fb.group({
      idDH: [''],
      idSP: [''],
      Soluong: [''],
      Dongia: [''],
      Khuyenmai: [''],
      Ghichu: [''],
      idGioithieu:[''],
    });
  }
  handleAddressChange(address: Address) {
    console.log(this.CUser.Diachi);
    const Diachi = {address:address.formatted_address,lat:address.geometry.location.lat(),lng:address.geometry.location.lng()}
    this.CUser.Diachi.push(Diachi)
    this._usersService.updateOneUser(this.CUser).subscribe();
  }
  getCodeTp(e: any) {
    this.diachi.filter((x: any) => {
      if (x.name == e.value) {
        this.codeTp = x.code;
        if (this.amount >= 999000) {
          this.phiship = 0;
          this.amount += this.phiship;
        } else if (x.code == 79) {
          this.phiship = 30000;
          this.amount += this.phiship;
        } else {
          this.phiship = 40000;
          this.amount += this.phiship;
        }
        this._checkoutService.getDiachichitiet(x.code).subscribe();
        this._checkoutService.diachichitiet$.subscribe((res) => {
          if (res) {
            this.diachichitiet = res;
            this.diachichitiet = this.diachichitiet.results;
          }
        });
      }
    });
  }
  Total(items:any)
  {
    return items.reduce((acc:any, item:any) => acc + item.cartNum * item.Gia, 0)
  }
  DatHang(Khachhang:any,templateRef: TemplateRef<any>) {
    if (Khachhang.Hoten==null ||Khachhang.Hoten =='') {
      this.notifier.notify('error', `Vui lòng nhập Họ và tên`);
    }
    else if (Khachhang.SDT==null ||Khachhang.SDT =='') {
      this.notifier.notify('error', `Vui lòng nhập SDT`);
    }
    else if(!this.phoneRegex.test(Khachhang.SDT))
    {
      this.notifier.notify('error', `Số Điện Thoại Không Hợp Lệ`);
    }
    else if (Khachhang.Diachi==null ||Khachhang.Diachi =='') {
      this.notifier.notify('error', `Vui lòng nhập địa chỉ`);
    }
    else
    {
    if (this.carts.length > 0) {
      const today = new Date().getTime().toString()
      const md5Hash = MD5(today).toString();
      const MaDonHang = md5Hash.slice(0, 8);
      Khachhang.MaDonHang = `DH${MaDonHang}`;
      this._checkoutService
        .postdonhang(Khachhang)
        .subscribe((res) => {
          if (res) {
            this.Thanksdata = res;
            let idDH: any;
            this._checkoutService.donhang$.subscribe((donhang) => {
              idDH = donhang.id;
              this.ListUser.forEach((v) => {
                let Link;
                let Message='';
                if(v.Role=="admin")
                {
                  Message = `(ADMIN) Đơn Mới : ${donhang.Hoten} - ${donhang.MaDonHang}`
                  Link = `/admin/donhang/${donhang.id}`
                }
                else if(v.Role=="parent"){
                  Message = `(REF) Đơn Mới : ${donhang.Hoten} - ${donhang.MaDonHang}`
                  Link = `/profile/referral/${donhang.idKH}/donhang/${donhang.id}`
                }
                else {
                  Message = `Đơn Mới : ${donhang.Hoten} - ${donhang.MaDonHang}`
                  Link = `/profile/donhang/${donhang.id}`
                }
                const newNoti = {idUser:v.id,Type:"donhang.create",Message:Message,Link:Link}            
                this._accountNotificationsService.createNotify(newNoti).subscribe((data)=>
                  {
                  const dulieu = {idUser:data.idUser,Title:Message,Link:data.Link}
                  this._accountNotificationsService.PushNotify(dulieu).subscribe()
                  });
              });
            });
            this.carts.forEach((x) => {
              this.DonhangChitiet.idDH = idDH;
              this.DonhangChitiet.idSP = x.id;
              this.DonhangChitiet.Soluong = x.cartNum;
              this.DonhangChitiet.Dongia = x.GiaSale;
              this.DonhangChitiet.idGioithieu = x.idGioithieu;
              this._checkoutService
                .postdonhangchitiet(this.DonhangChitiet)
                .subscribe((res) => {
                  this.Thanksdata.chitiet=res;
                  this.cartService.removeCart(x).subscribe();
                  if (this.carts.length == 0) {

                    // const dialogRef = this._dialog.open(templateRef);
                    // this.interval = setInterval(() => {
                    //   this.countDown--;
                    //   if (this.countDown === 0) {
                    //     clearInterval(this.interval);
                    //     dialogRef.close();
                    //     this._router.navigate(['profile/donhang']);
                    //   }
                    // }, 1000);

                    this.notifier.notify('success', `Đặt hàng thành công`);
                    if(this.token!=null)
                    {
                    this._router.navigate(['profile/donhang']);
                     }
                    else
                    {        
                      const extras: NavigationExtras = {
                        state: {
                          data: this.Thanksdata
                        }
                      };
                    this._router.navigate(['camon'],extras);
                    }
                  }
                });

            });
          }
        });
    } else {
      this.notifier.notify('error', `Bạn chưa có đơn hàng`);
    }
  }
  }
}
