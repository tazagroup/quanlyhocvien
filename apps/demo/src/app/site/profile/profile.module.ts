import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { ProfileComponent } from './profile.component';
import { DonhangComponent } from './donhang/donhang.component';
import { TichdiemComponent } from './tichdiem/tichdiem.component';
import { AccountComponent } from './account/account.component';
import { ReferralComponent } from './referral/referral.component';
import { ChiendichComponent } from './chiendich/chiendich.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ChiendichService } from '../../admin/cauhinh/chiendich/chiendich.service';
import { CustomerchiendichService } from './chiendich/chiendich.service';
import { DoimatkhauComponent } from './doimatkhau/doimatkhau.component';
import { DiachiComponent } from '../../shared/diachi/diachi.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SwiperModule,
    EditorModule,
    GooglePlaceModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        children: [
          {
            path: 'donhang',
            component: DonhangComponent,
            children: [
              {
                path: ':id',
                component: DonhangComponent,
              },
            ],
          },
          {
            path: 'tichdiem',
            component: TichdiemComponent,
          },
          {
            path: 'account',
            component: AccountComponent,
            children:[{
              path:'diachi',
              component:DiachiComponent
          }]
          },
          {
            path: 'referral',
            component: ReferralComponent,
          },
          {
            path: 'chiendich',
            component: ChiendichComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [
    ProfileComponent,
    TichdiemComponent,
    AccountComponent,
    ReferralComponent,
    ChiendichComponent,
    DoimatkhauComponent,
    DiachiComponent,
    DonhangComponent
  ],
  providers: [ChiendichService, CustomerchiendichService],
})
export class ProfileModule {}
