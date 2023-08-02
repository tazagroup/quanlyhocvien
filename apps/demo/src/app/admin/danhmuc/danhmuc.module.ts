import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { DanhmucComponent } from './danhmuc.component';
import { DanhmucDetailComponent } from './danhmuc-detail/danhmuc-detail.component';

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
        component: DanhmucComponent,
        children:[
          {
            path: '',
            component: DanhmucDetailComponent,
          },
          {
            path: 'detail/:slug',
            component: DanhmucDetailComponent,
          }
        ]
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [DanhmucDetailComponent, DanhmucComponent],
})
export class DanhmucModule {}
