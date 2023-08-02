import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { CheckoutComponent } from './checkout.component';
import { AccountNotificationsService } from '../../admin/account-notifications/account-notifications.service';
import { CamonComponent } from './camon/camon.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete'; 
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
        component: CheckoutComponent,
        children: [{path:'diachi',component:DiachiComponent}],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [AccountNotificationsService],
  declarations: [CheckoutComponent, CamonComponent],
})
export class CheckoutModule {}
