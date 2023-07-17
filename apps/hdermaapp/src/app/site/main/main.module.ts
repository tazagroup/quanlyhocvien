import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { MainComponent } from './main.component';
import { TrangchuComponent } from '../trangchu/trangchu.component';
import { VehdermaComponent } from '../vehderma/vehderma.component';
import { LamDepVaCuocSongComponent } from '../vehderma/am-hieu-sau-sac/lam-dep-va-cuoc-song.component';
import { LanDaToaSangComponent } from '../vehderma/ve-dep-cot-loi/lan-da-toa-sang.component';
import { SanPhamChinhComponent } from '../vehderma/san-pham-chinh/san-pham-chinh.component';
import { SloganComponent } from '../vehderma/slogan/slogan.component';
import { LaneigeLifeComponent } from '../vehderma/laneige-life/laneige-life.component';
import { BannerComponent } from '../vehderma/banner/banner.component';
import { SanphamComponent } from '../sanpham/sanpham.component';
import { SliderComponent } from '../sanpham/slider/slider.component';
import { LienheComponent } from '../lienhe/lienhe.component';
import { ChitietComponent } from '../chitiet/chitiet.component';
import { RadianceComponent } from '../chitiet/thong-tin-san-pham/radiance.component';
import { CartComponent } from '../cart/cart.component';
import { DangkyComponent } from '../dangky/dangky.component';
import { SanPhamComponent } from '../san-pham/san-pham.component';
import { ContactComponent } from '../../admin/contact/contact.component';
import { DangkyService } from '../dangky/dangky.service';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AccountNotificationsComponent } from '../../admin/account-notifications/account-notifications.component';
import { AccountNotificationsService } from '../../admin/account-notifications/account-notifications.service';
import { SeeallComponent } from './notifications/seeall/seeall.component';
import { CartMobileComponent } from '../cart/cart-mobile/cart-mobile.component';
import { TimkiemComponent } from '../timkiem/timkiem.component';
import { CamonComponent } from '../checkout/camon/camon.component';
import { TracuudonComponent } from '../tracuudon/tracuudon.component';
import { AuthService } from '../../admin/auth/auth.service';
import { AuthGuard } from '../../admin/auth/guards/auth.guard';
import { GuestGuard } from '../../admin/auth/guards/guest.guard';
import { MaterialModule } from '../../shared/material.module';
import { UsersInterceptor } from '../../shared/users.interceptor';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule,
    EditorModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: '',
        component: MainComponent,
        children: [
          {
            path: '',
            component: TrangchuComponent,
          },
          {
            path: 'trang-chu',
            component: TrangchuComponent,
          },
          {
            path: 've-hderma',
            component: VehdermaComponent,
          },
          {
            path: 'san-pham',
            component: SanphamComponent,
          },
          {
            path: 'gio-hang',
            component: CartMobileComponent,
          },
          {
            path: 'chi-tiet/:slug',
            component: ChitietComponent,
          },
          {
            path: 'chi-tiet/:slug/:id',
            component: ChitietComponent,
          },
          {
            path: 'lien-he',
            component: LienheComponent,
          },
          {
            path: 'cart',
            component: CartComponent,
          },
          {
            path: 'tim-kiem',
            component: TimkiemComponent,
          },
          {
            path: 'tra-cuu-don',
            component: TracuudonComponent,
          },
          {
            path: 'notifications',
            canActivate: [AuthGuard],
            component: AccountNotificationsComponent,
          },
          {
            path: 'bai-viet',
            loadChildren: () =>
              import('../blog/blog.module').then((m) => m.BlogModule),
            // canActivate: [CauhoiGuard],
          },
          {
            path: 'checkout',
            // canActivate: [GuestGuard],
            loadChildren: () =>
              import('../checkout/checkout.module').then(
                (m) => m.CheckoutModule
              ),
            // canActivate: [CauhoiGuard],
          },
          {
            path: 'camon',
            component: CamonComponent,
          },
          {
            path: 'profile',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../profile/profile.module').then((m) => m.ProfileModule),
          },
          {
            path: 'wishlist',
            canActivate: [GuestGuard],
            loadChildren: () =>
              import('../wishlist/wishlist.module').then(
                (m) => m.WishlistModule
              ),
          },
        ],
      },
    ]),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
    AccountNotificationsService,
  ],
  exports: [RouterModule],
  declarations: [
    TrangchuComponent,
    VehdermaComponent,
    LamDepVaCuocSongComponent,
    LanDaToaSangComponent,
    SanPhamChinhComponent,
    SloganComponent,
    LaneigeLifeComponent,
    BannerComponent,
    MainComponent,
    SanphamComponent,
    SliderComponent,
    LienheComponent,
    ChitietComponent,
    RadianceComponent,
    CartComponent,
    DangkyComponent,
    SanPhamComponent,
    ContactComponent,
    UserMenuComponent,
    NotificationsComponent,
    SeeallComponent,
    CartMobileComponent
  ],
})
export class MainModule {}
