import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { BaivietComponent } from './baiviet.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { BaivietChitietComponent } from './baiviet-chitiet/baiviet-chitiet.component';
import { BaivietDanhmucComponent } from './baiviet-danhmuc/baiviet-danhmuc.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    SwiperModule,
    EditorModule,
    NgxDropzoneModule,
    RouterModule.forChild([
      {
        path: '',
        component: BaivietComponent,
        children: [
          { path: 'baivet/:id', component: BaivietChitietComponent },
          // { path: 'themetintuc/:slug', component: ThemetintucComponent },
          // { path: 'themetintuc/:slug', component: BaivietChitietComponent },
          { path: 'danhmuc/:id', component: BaivietDanhmucComponent },
          // { path: ':id/spmoi', component: BaivietChitietComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [
    BaivietComponent,
    BaivietChitietComponent,
    BaivietDanhmucComponent,
  ],
})
export class BaivietModule {}
