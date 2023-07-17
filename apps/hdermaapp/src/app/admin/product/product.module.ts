import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

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
        component: ProductComponent,
        children: [
          {path:':slug', component:ProductDetailComponent},
          {path:'', component:ProductDetailComponent},

        ],
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [ProductComponent, ProductDetailComponent],
})
export class ProductModule {}
