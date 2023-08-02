import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { SanphamComponent } from './sanpham.component';
import { DetailsanphamComponent } from './detailsanpham/detailsanpham.component';
import { DetaildanhmucComponent } from './detaildanhmuc/detaildanhmuc.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SwiperModule,
    EditorModule,
    NgxDropzoneModule,
    RouterModule.forChild([
      {
        path: '',
        component: SanphamComponent,
        children: [
          { path: 'danhmuc/:id', component: DetaildanhmucComponent },
          { path: 'chitiet/:id', component: DetailsanphamComponent },
          // { path: ':id/spmoi', component: DetailsanphamComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [
    SanphamComponent,
    DetailsanphamComponent,
    DetaildanhmucComponent,
  ],
})
export class SanphamModule {}
