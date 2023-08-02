import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HocvienComponent } from './hocvien.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { HocvienChitietComponent } from './hocvien-chitiet/hocvien-chitiet.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EditorModule } from '@tinymce/tinymce-angular';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '', component: HocvienComponent,
        children: [
          { path: ':id', component: HocvienChitietComponent }
        ]
      }])
  ],
  declarations: [HocvienComponent, HocvienChitietComponent],
  exports: [RouterModule],
})
export class HocvienModule { }
