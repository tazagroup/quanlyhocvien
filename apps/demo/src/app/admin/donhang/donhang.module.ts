import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { DonhangComponent } from './donhang.component';
import { ChitietComponent } from './chitiet/chitiet.component';

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
        component: DonhangComponent,
        children: [
          {
            path:':id',
            component:ChitietComponent
          }
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [DonhangComponent, ChitietComponent],
})
export class DonhangModule {}
