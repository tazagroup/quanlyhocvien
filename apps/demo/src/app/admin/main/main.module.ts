import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HinhanhComponent } from '../hinhanh/hinhanh.component';
import { MaterialModule } from '../../shared/material.module';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '',
        component:MainComponent,
        children: [
          {
            path: 'dashboard',
            loadChildren: () =>
              import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
          },
          {
            path: 'khoa-hoc',
            loadChildren: () =>
              import('../khoahoc/khoahoc.module').then((m) => m.KhoahocModule),
          },
          {
            path: 'hoc-vien',
            loadChildren: () =>
              import('../hocvien/hocvien.module').then((m) => m.HocvienModule),
          },
          {
            path: 'giang-vien',
            loadChildren: () =>
              import('../giangvien/giangvien.module').then((m) => m.GiangvienModule),
          },
          {
            path: 'lich-hen',
            loadChildren: () =>
              import('../khachhang/khachhang.module').then((m) => m.KhachhangModule),
          },
          {
            path: 'zalo',
            loadChildren: () =>
              import('../zalo/zalo.module').then((m) => m.ZaloModule),
          },
          // {
          //   path: 'demo',
          //   loadChildren: () =>
          //     import('../demo/demo.module').then((m) => m.DemosModule),
          //   // canActivate: [CauhoiGuard],
          // },
          // {
          //   path: 'dashboard',
          //   component: DashboardComponent
          // },
          // {
          //   path: 'hinhanh',
          //   component: HinhanhComponent
          // },
          // {
          //   path: 'baiviet',
          //   loadChildren: () =>
          //     import('../baiviet/baiviet.module').then((m) => m.BaivietModule),
          //   // canActivate: [CauhoiGuard],
          // },
          // {
          //   path: 'seotool',
          //   loadChildren: () =>
          //     import('../seotool/seotool.module').then((m) => m.SeotoolModule),
          //   // canActivate: [CauhoiGuard],
          // },
          // {
          //   path: 'danhmuc',
          //   loadChildren: () =>
          //     import('../danhmuc/danhmuc.module').then((m) => m.DanhmucModule),
          // },
          // {
          //   path: 'san-pham',
          //   loadChildren: () =>
          //     import('../product/product.module').then((m) => m.ProductModule),
          // },
          // {
          //   path: 'sanpham',
          //   loadChildren: () =>
          //     import('../sanpham/sanpham.module').then((m) => m.SanphamModule),
          // },
          // {
          //   path: 'danh-muc-san-pham',
          //   loadChildren: () =>
          //     import('../danhmuc-product/danhmuc-product.module').then(
          //       (m) => m.DanhmucProductModule
          //     ),
          // },
          // {
          //   path: 'tags',
          //   loadChildren: () =>
          //     import('../tags/tags.module').then((m) => m.TagsModule),
          // },
          // {
          //   path: 'donhang',
          //   loadChildren: () =>
          //     import('../donhang/donhang.module').then((m) => m.DonhangModule),
          // },
          // {
          //   path: 'comment',
          //   loadChildren: () =>
          //     import('../comment/comment.module').then((m) => m.CommentModule),
          // },
          // {
          //   path: 'cauhinh',
          //   loadChildren: () =>
          //     import('../cauhinh/cauhinh.module').then((m) => m.CauhinhModule),
          // },
          // {
          //   path: 'nhanvien',
          //   component:UsersComponent,
          //   children:[
          //     {path:':id',component:UsersDetailComponent}
          //   ]
          // },
          // {
          //   path: 'page',
          //   component:PageComponent
          // },
        ],
      },
    ]),
  ],
  providers: [],
  exports: [RouterModule],
  declarations: 
  [
  MainComponent,
  DashboardComponent,
  HinhanhComponent,
  ],
})
export class MainModule {}
