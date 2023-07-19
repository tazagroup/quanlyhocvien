import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhachhangComponent } from './khachhang.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { KhachhangChitietComponent } from './khachhang-chitiet/khachhang-chitiet.component';
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
        path: '', component: KhachhangComponent,
        children: [
          { path: ':id', component: KhachhangChitietComponent }
        ]
      }])
  ],
  declarations: [KhachhangComponent, KhachhangChitietComponent],
  exports: [RouterModule],
})
export class KhachhangModule { }
