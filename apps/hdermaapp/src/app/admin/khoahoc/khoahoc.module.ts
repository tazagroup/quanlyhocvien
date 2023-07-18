import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { KhoahocComponent } from './khoahoc.component';
import { DetailkhoahocComponent } from './detailkhoahoc/detailkhoahoc.component';
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
        component: KhoahocComponent,
        children: [
          { path: 'danhmuc/:id', component: DetaildanhmucComponent },
          { path: 'chitiet/:id', component: DetailkhoahocComponent }
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [
    KhoahocComponent,
    DetailkhoahocComponent,
    DetaildanhmucComponent,
  ],
})
export class KhoahocModule {}
