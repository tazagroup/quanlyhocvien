import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { BlogDanhmucComponent } from './blog-danhmuc/blog-danhmuc.component';
import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

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
        component: BlogComponent,
      },
      { path: 'danh-muc', component: BlogDanhmucComponent },
      { path: ':slug', component: BlogDetailComponent }
    ]),
  ],
  exports: [RouterModule],
  declarations: [BlogComponent, BlogDanhmucComponent, BlogDetailComponent],


})
export class BlogModule { }
