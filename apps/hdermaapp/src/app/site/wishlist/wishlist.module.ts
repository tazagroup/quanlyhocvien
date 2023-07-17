import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { WishlistComponent } from './wishlist.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SwiperModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '',
        component: WishlistComponent,
        children: [
        ]
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [WishlistComponent],

  
})
export class WishlistModule { }
