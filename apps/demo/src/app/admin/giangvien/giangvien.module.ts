import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiangvienComponent } from './giangvien.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { GiangvienChitietComponent } from './giangvien-chitiet/giangvien-chitiet.component';
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
        path: '', component: GiangvienComponent,
        children: [
          { path: ':id', component: GiangvienChitietComponent }
        ]
      }])
  ],
  declarations: [GiangvienComponent, GiangvienChitietComponent],
  exports: [RouterModule],
})
export class GiangvienModule { }
